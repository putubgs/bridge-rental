"use client";

import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    wpwlOptions?: Record<string, unknown>;
    wpwl?: { unload?: () => void };
    __applyHyperpayBrand?: (brand: "VISA" | "MASTER" | null) => void;
  }
}

interface HyperPayWidgetProps {
  checkoutId: string;
  amount: string;
  onError?: (message: string) => void;
  onBeforeSubmit?: () => boolean;
}

const WIDGET_SCRIPT_ID = "hyperpay-payment-widgets";
const COMPLETE_CARD_LENGTH = 16;

function readDetectedBrand(data: unknown): "VISA" | "MASTER" | null | undefined {
  let message: unknown = data;
  if (typeof data === "string") {
    if (!data.includes("setDetectedBrands")) return undefined;
    try {
      message = JSON.parse(data);
    } catch {
      return undefined;
    }
  }
  if (!message || typeof message !== "object") return undefined;

  const method = (message as { method?: unknown }).method;
  if (typeof method !== "string" || !method.endsWith("setDetectedBrands")) {
    return undefined;
  }

  const params = (
    message as { params?: { brands?: unknown; inputLength?: unknown } }
  ).params;
  if (typeof params?.inputLength !== "number") return null;
  if (params.inputLength !== COMPLETE_CARD_LENGTH) return null;

  const brands = Array.isArray(params.brands) ? params.brands : [];
  for (const brand of brands) {
    if (brand === "VISA" || brand === "MASTER") return brand;
  }
  return null;
}

function unloadWidget() {
  window.wpwl?.unload?.();
  document.getElementById(WIDGET_SCRIPT_ID)?.remove();
  document
    .querySelectorAll('script[src*="/v1/paymentWidgets.js"]')
    .forEach((script) => script.remove());
  delete window.wpwl;
}

const BRAND_MARKS = {
  VISA: { src: "/assets/img/visa-logo.png", label: "Visa" },
  MASTER: { src: "/assets/img/mastercard-logo.png", label: "Mastercard" },
} as const;

function mountBrandMark(root: Element) {
  const select = root.querySelector<HTMLSelectElement>(
    "select.wpwl-control-brand",
  );
  const wrapper = root.querySelector(
    ".wpwl-group-cardNumber .wpwl-wrapper, .wpwl-group-card-number .wpwl-wrapper",
  );
  root.querySelector(".hyperpay-brand-picker")?.remove();
  if (!select || !wrapper) return;

  let mark = wrapper.querySelector<HTMLImageElement>(".hyperpay-brand-mark");
  if (!mark) {
    mark = document.createElement("img");
    mark.className = "hyperpay-brand-mark";
    mark.alt = "";
    mark.hidden = true;
    wrapper.appendChild(mark);
  }

  const paint = (brand: "VISA" | "MASTER" | null) => {
    const details = brand ? BRAND_MARKS[brand] : null;
    if (!details) {
      mark.hidden = true;
      mark.removeAttribute("src");
      mark.alt = "";
      return;
    }
    mark.src = details.src;
    mark.alt = details.label;
    mark.hidden = false;
    if (!brand) return;
    select.value = brand;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  };

  window.__applyHyperpayBrand = paint;
}

function onBrandMessage(event: MessageEvent) {
  let host = "";
  try {
    host = new URL(event.origin).hostname;
  } catch {
    return;
  }
  if (host !== "oppwa.com" && !host.endsWith(".oppwa.com")) return;
  const brand = readDetectedBrand(event.data);
  if (brand === undefined) return;
  window.__applyHyperpayBrand?.(brand);
}

function getShopperResultUrl() {
  const fallback = `${window.location.origin}/reservation/review`;
  const configured = process.env.NEXT_PUBLIC_SHOPPER_RESULT_URL;
  if (!configured) return fallback;
  try {
    // The booking snapshot lives in this origin's sessionStorage, so the
    // shopper has to come back to the same origin they paid from.
    return new URL(configured).origin === window.location.origin
      ? configured
      : fallback;
  } catch {
    return fallback;
  }
}

export default function HyperPayWidget({
  checkoutId,
  amount,
  onError,
  onBeforeSubmit,
}: HyperPayWidgetProps) {
  const [isReady, setIsReady] = useState(false);
  const [shopperResultUrl, setShopperResultUrl] = useState("");
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onBeforeSubmitRef = useRef(onBeforeSubmit);
  onBeforeSubmitRef.current = onBeforeSubmit;

  const scriptSrc = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_PAYMENT_BASE_URL}/v1/paymentWidgets.js?checkoutId=${encodeURIComponent(checkoutId)}`,
    [checkoutId],
  );

  useEffect(() => {
    setShopperResultUrl(getShopperResultUrl());
  }, []);

  useEffect(() => {
    const root = document.querySelector(".hyperpay-widget");
    if (root?.querySelector("select.wpwl-control-brand")) {
      mountBrandMark(root);
    }
    window.addEventListener("message", onBrandMessage);
    return () => window.removeEventListener("message", onBrandMessage);
  });

  useEffect(() => {
    if (!shopperResultUrl) return;

    unloadWidget();
    setIsReady(false);
    window.__applyHyperpayBrand = () => {};

    window.wpwlOptions = {
      paymentTarget: "_top",
      style: "plain",
      locale: "en",
      brandDetection: true,
      showCVVHint: true,
      labels: {
        cardHolder: "Cardholder name",
        submit: `Pay ${amount} JOD`,
      },
      iframeStyles: {
        "card-number-placeholder": { color: "#9ca3af", "font-size": "16px" },
        "cvv-placeholder": { color: "#9ca3af", "font-size": "16px" },
      },
      onReady: () => {
        const root = document.querySelector(".hyperpay-widget");
        const expiry = root?.querySelector(".wpwl-group-expiry");
        const cvv = root?.querySelector(".wpwl-group-cvv");
        if (expiry && cvv && expiry.parentElement) {
          const row = document.createElement("div");
          row.className = "hyperpay-expiry-cvv";
          expiry.parentElement.insertBefore(row, expiry);
          row.appendChild(expiry);
          row.appendChild(cvv);
        }
        const expiryInput = root?.querySelector<HTMLInputElement>(
          ".wpwl-control-expiry",
        );
        if (expiryInput) expiryInput.placeholder = "Expiry date";
        if (root) mountBrandMark(root);
        setIsReady(true);
      },
      onBeforeSubmitCard: () => onBeforeSubmitRef.current?.() !== false,
      onError: (error: { name?: string; message?: string }) => {
        console.error("HyperPay widget error", error);
        if (error?.name === "InvalidCheckoutIdError") {
          onErrorRef.current?.(
            "Your payment session expired. Please press PAY NOW again.",
          );
        } else if (error?.name === "WidgetError") {
          onErrorRef.current?.(
            "The payment form failed to load. Please try again.",
          );
        }
      },
    };

    const script = document.createElement("script");
    script.id = WIDGET_SCRIPT_ID;
    script.src = scriptSrc;
    script.async = true;
    script.onerror = () =>
      onErrorRef.current?.(
        "Could not load the payment form. Please check your connection.",
      );
    document.body.appendChild(script);

    return () => {
      window.__applyHyperpayBrand = () => {};
      unloadWidget();
    };
  }, [scriptSrc, shopperResultUrl, amount]);

  return (
    <div className="hyperpay-widget">
      {!isReady && (
        <div className="flex items-center gap-3 py-6 text-sm text-neutral-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-variant-2 border-t-transparent" />
          Loading secure card form…
        </div>
      )}
      {shopperResultUrl && (
        <form
          key={checkoutId}
          action={shopperResultUrl}
          className="paymentWidgets"
          data-brands="VISA MASTER"
        />
      )}
      <style jsx global>{`
        .hyperpay-widget .wpwl-form {
          max-width: none;
          margin: 0;
          padding: 0;
          background: transparent;
          border: 0;
          box-shadow: none;
        }
        .hyperpay-widget .wpwl-group {
          margin-bottom: 8px;
          float: none;
          width: 100%;
          clear: none;
        }
        .hyperpay-widget .wpwl-label {
          display: none !important;
        }
        .hyperpay-widget .wpwl-group-brand {
          display: none !important;
        }
        .hyperpay-widget .wpwl-group-cardNumber .wpwl-wrapper,
        .hyperpay-widget .wpwl-group-card-number .wpwl-wrapper {
          position: relative;
        }
        .hyperpay-widget .hyperpay-brand-mark {
          position: absolute;
          top: 50%;
          right: 14px;
          width: 42px;
          height: 24px;
          object-fit: contain;
          transform: translateY(-50%);
          pointer-events: none;
          background: #ffffff;
        }
        .hyperpay-widget .wpwl-group-cardNumber .wpwl-control-iframe,
        .hyperpay-widget .wpwl-group-card-number .wpwl-control-iframe {
          padding-right: 64px;
        }
        .hyperpay-widget .wpwl-wrapper {
          width: 100% !important;
          float: none !important;
        }
        .hyperpay-widget .hyperpay-expiry-cvv {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          margin-bottom: 8px;
        }
        .hyperpay-widget .wpwl-group-cvv .wpwl-wrapper {
          position: relative;
        }
        .hyperpay-widget .wpwl-group-cvv .wpwl-icon {
          top: 50% !important;
          right: 8px !important;
          left: auto !important;
          margin: 0 !important;
          transform: translateY(-50%);
        }
        .hyperpay-widget .hyperpay-expiry-cvv .wpwl-group {
          margin-bottom: 0;
          width: auto;
        }
        .hyperpay-widget .hyperpay-expiry-cvv .wpwl-group-expiry {
          flex: 1 1 auto;
          min-width: 0;
        }
        .hyperpay-widget .hyperpay-expiry-cvv .wpwl-group-cvv {
          flex: 0 0 34%;
          min-width: 96px;
        }
        .hyperpay-widget .wpwl-control,
        .hyperpay-widget .wpwl-control-iframe {
          width: 100% !important;
          height: 52px;
          border: 1px solid #c4c4c4;
          border-radius: 4px;
          background: #ffffff;
          font-size: 16px;
          padding: 0 14px;
          box-sizing: border-box;
        }
        .hyperpay-widget .wpwl-control:focus,
        .hyperpay-widget .wpwl-control-iframe.wpwl-has-focus {
          border-color: #35aeae;
        }
        .hyperpay-widget .wpwl-has-error {
          border-color: #b91c1c;
        }
        .hyperpay-widget .wpwl-hint {
          font-size: 12px;
          color: #b91c1c;
        }
        .hyperpay-widget .wpwl-button-pay {
          width: 100%;
          height: 48px;
          margin-top: 8px;
          border: 0;
          border-radius: 4px;
          background: #8bd6d6;
          color: #ffffff;
          font-weight: 500;
          float: none;
        }
        .hyperpay-widget .wpwl-button-pay:hover {
          background: #35aeae;
        }
      `}</style>
    </div>
  );
}
