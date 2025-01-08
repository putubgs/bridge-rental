"use client";

import html2pdf from "html2pdf.js";
import AirConditionerIcon from "@/components/shared/icons/air-conditioner";
import CarDoorIcon from "@/components/shared/icons/car-door";
import CarLuggageIcon from "@/components/shared/icons/car-luggage";
import CarSeatIcon from "@/components/shared/icons/car-seat";
import { countDays } from "@/utils/utils";
import { useRentDetailsStore } from "@/store/reservation-store";
import { useCarStore } from "@/store/car-store";
import { PaymentMethod, usePayStore } from "@/store/pay-store";
import { useEffect } from "react";
import useLanguageStore from "@/store/useLanguageStore";

const InvoiceDownloadComponent = () => {
  const {
    car_id,
    selected_bundle,
    totalBundlePrice,
    selected_protection,
    totalProtectionPrice,
    selected_extras,
    selected_children_extras,
    totalExtrasPrice,
    deliveryLocation,
    deliveryDate,
    deliveryTime,
    returnLocation,
    returnDate,
    returnTime,
    childrenSeatsQuantity,
    extras,
    childrenExtras,
  } = useRentDetailsStore();

  const { paymentData } = usePayStore();
  const { carModels } = useCarStore();
  const car = carModels.find((vehicle) => vehicle.car_id === car_id);

  const totalDays = countDays(
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
  );

  const { language } = useLanguageStore();
  const isRTL = language === "ar";
  const containerStyle = {
    direction: isRTL ? "rtl" : "ltr",
    textAlign: isRTL ? "right" : "left",
  };

  // Calculate total price
  const totalPrice = totalBundlePrice + totalProtectionPrice + totalExtrasPrice;
  const discountedPrice = totalPrice * 0.95; // 5% discount for pay now

  if (!car) {
    return <p>Car not found</p>;
  }

  const generatePDF = async () => {
    const preprocessImages = async () => {
      const element = document.querySelector("#invoice");
      const imageContainers = element.querySelectorAll(".relative");

      imageContainers.forEach((container) => {
        container.dataset.originalStyle = container.style.cssText;
        container.style.position = "relative";
        container.style.overflow = "visible";
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";

        const img = container.querySelector("img");
        if (img) {
          img.dataset.originalStyle = img.style.cssText;
          img.style.position = "relative";
          img.style.width = "auto";
          img.style.height = "auto";
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.objectFit = "contain";
          img.style.transform = "none";
        }
      });

      const images = element.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }),
      );
    };

    const restoreImages = () => {
      const element = document.querySelector("#invoice");
      const imageContainers = element.querySelectorAll(".relative");

      imageContainers.forEach((container) => {
        if (container.dataset.originalStyle) {
          container.style.cssText = container.dataset.originalStyle;
        }

        const img = container.querySelector("img");
        if (img && img.dataset.originalStyle) {
          img.style.cssText = img.dataset.originalStyle;
        }
      });
    };

    try {
      await preprocessImages();
      const element = document.querySelector("#invoice");
      const originalStyle = element.style.cssText;

      element.style.width = "1440px";
      element.style.height = "2052px";
      element.style.overflow = "visible";

      const opt = {
        margin: 0,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: {
          scale: 4,
          width: 1440,
          height: 2052,
          useCORS: true,
          letterRendering: true,
          imageTimeout: 30000,
          logging: true,
          windowWidth: 1440,
          windowHeight: 2052,
          onclone: (clonedDoc) => {
            const clonedImages = clonedDoc.getElementsByTagName("img");
            Array.from(clonedImages).forEach((img) => {
              const container = img.closest(".relative");
              if (container) {
                container.style.position = "relative";
                container.style.overflow = "visible";
                container.style.display = "flex";
                container.style.justifyContent = "center";
                container.style.alignItems = "center";
                container.style.minHeight = "200px";

                img.style.position = "relative";
                img.style.width = "auto";
                img.style.height = "auto";
                img.style.maxWidth = "100%";
                img.style.maxHeight = "100%";
                img.style.objectFit = "contain";
                img.style.transform = "none";

                if (img.alt === "logo") {
                  container.style.minHeight = "200px";
                  container.style.width = "200px";
                  img.style.width = "100%";
                  img.style.height = "100%";
                  img.style.objectFit = "contain";
                }

                if (img.alt.includes("car_image")) {
                  img.style.transform = isRTL ? "translateX(120px)" :"scaleX(-1) translateX(350px)";
                  container.style.aspectRatio = "272 / 98";
                  container.style.width = "70%";
                  container.style.scale = "0.5";
                  img.style.width = "100%";
                  img.style.height = "100%";
                  img.style.objectFit = "contain";
                }
              }
            });
          },
        },
        jsPDF: {
          unit: "mm",
          format: [381, 543],
          orientation: "portrait",
          compress: false,
        },
      };

      await html2pdf().set(opt).from(element).save();
    } finally {
      restoreImages();
    }
  };

  return (
    <div>
      <button onClick={generatePDF} className="text-primary-variant-3">
        {isRTL ? "اضغط هنا" : "click here"}
      </button>

      <div style={{ display: "none" }}>
        <section className="p-5" id="invoice" style={containerStyle}>
          <div className="flex flex-col gap-5">
            <header
              className={`flex w-full items-center justify-between gap-5 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="relative w-[200px]">
                <img
                  src="/assets/img/brand-logo-black.png"
                  alt="logo"
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <h1 className="text-2xl font-bold">
                  {isRTL ? "فاتورة" : "Invoice"}
                </h1>
                <p>{isRTL ? "رقم الفاتورة" : "Invoice Number"}: INV-123456</p>
                <p>
                  {isRTL ? "تاريخ الفاتورة" : "Invoice Date"}:{" "}
                  {deliveryDate?.format("DD-MM-YYYY")}
                </p>
              </div>
            </header>

            <hr />
            {/* Customer Details */}
            <div className="mt-28 pt-3">
              <h2 className="mb-2 text-2xl font-semibold">
                {isRTL ? "تفاصيل العميل" : "CUSTOMER DETAILS"}
              </h2>
              <p className="text-xl">
                {isRTL ? "اسم العميل" : "Customer Name"}:{" "}
                {`${paymentData.firstName} ${paymentData.lastName}`}
              </p>
              <p className="text-xl">
                {isRTL ? "البريد الإلكتروني" : "Email"}: {paymentData.email}
              </p>
              <p className="text-xl">
                {isRTL ? "الهاتف" : "Phone"}: {paymentData.phoneNumber}
              </p>
            </div>

            {/* Rental Details */}
            <h2 className="mb-2 mt-5 text-2xl font-semibold">
              {isRTL ? "تفاصيل التأجير" : "RENTAL DETAILS"}
            </h2>
            <div className="flex w-full gap-3 bg-white">
              <div className="flex w-3/4 divide-x-2 border-2 bg-white">
                <div className="basis-2/3 p-5">
                  <h3 className="text-xl font-medium">
                    {isRTL ? "المركبة" : "Vehicle"}
                  </h3>
                  <div
                    className={`relative aspect-[272/98] w-[70%] scale-50`}
                  >
                    <img
                      src={car.car_image}
                      alt="car_image"
                      className="absolute h-full w-full object-contain"
                      style={{
                        transform: isRTL ? "scaleX(1)" : "scaleX(-1)",
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <div className="z-10 space-y-5 px-3">
                    <div className="flex flex-col gap-2">
                      <div className="z-10 flex w-fit items-center bg-[#BAF0E233] px-1">
                        <p className="pt-1 text-[#535353]">{car.car_type}</p>
                      </div>
                      <p className="text-[18px]">
                        {car.car_model}
                        <span className="text-neutral-400">
                          {isRTL ? " أو ما شابه" : " or similar"}
                        </span>
                      </p>
                    </div>
                    <div className={`flow-row flex w-fit gap-5 pb-2 pt-3`}>
                      <div className="relative flex h-fit w-fit items-end text-[12px]">
                        <CarDoorIcon size={23} />
                        <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                          x{car.doors}
                        </div>
                      </div>
                      <div className="relative flex h-fit w-fit items-end text-[12px]">
                        <CarSeatIcon size={23} />
                        <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                          x{car.passengers}
                        </div>
                      </div>
                      <div className="relative flex h-fit w-fit items-end text-[12px]">
                        <CarLuggageIcon size={23} />
                        <div className="absolute -right-4 -top-4 h-[23px] w-[23px] rounded-full bg-[#EFEFEF] p-1">
                          x{car.luggage}
                        </div>
                      </div>
                      <AirConditionerIcon size={23} />
                      <div
                        className={`ml-1 flex items-center gap-2 ${isRTL ? "pl-[30px]" : "pr-[30px]"}`}
                      >
                        <div className="flex h-[23px] w-[23px] items-center justify-center border border-black pt-1 text-center font-bold">
                          A
                        </div>
                        <p className="pt-1">Automatic</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-1/3 space-y-5 p-5">
                  <h3 className="text-xl font-medium">
                    {isRTL ? "التوصيل والاستلام" : "Delivery & Pick-up"}
                  </h3>
                  <div>
                    <p className="mb-1 text-xs text-neutral-400">
                      {isRTL ? "التوصيل" : "DELIVERY"}:
                    </p>
                    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
                      <ul
                        className="text-sm"
                        style={{
                          listStyle: "disc",
                          marginRight: isRTL ? "20px" : "0",
                          marginLeft: isRTL ? "0" : "20px",
                        }}
                      >
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "#6B7280" }}>•</span>
                          <span>
                            {deliveryDate?.format("dddd, MMM DD, YYYY")}
                          </span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "#6B7280" }}>•</span>
                          <span>{deliveryTime?.format("hh:mm A")}</span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "#6B7280" }}>•</span>
                          <span>{deliveryLocation}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-neutral-400">
                      {isRTL ? "الاستلام" : "PICK-UP"}:
                    </p>
                    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
                      <ul
                        className="text-sm"
                        style={{
                          listStyle: "disc",
                          marginRight: isRTL ? "20px" : "0",
                          marginLeft: isRTL ? "0" : "20px",
                        }}
                      >
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "#6B7280" }}>•</span>
                          <span>
                            {returnDate?.format("dddd, MMM DD, YYYY")}
                          </span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "#6B7280" }}>•</span>
                          <span>{returnTime?.format("hh:mm A")}</span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "#6B7280" }}>•</span>
                          <span>{returnLocation}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-1/4 flex-shrink-0 flex-col border-2 bg-white p-5 text-end text-sm">
                <h4 className="text-xl font-medium">
                  {totalBundlePrice.toFixed(2)} JOD
                </h4>
                <div className="pb-4 pt-7">
                  <p>{selected_bundle?.split("_").join(" ")}</p>
                  <p>{car.car_model}</p>
                </div>
                <p>{isRTL ? "* شامل الضريبة" : "*VAT included"}</p>
              </div>
            </div>

            {/* Protection & Extras */}
            <div className="my-4 border-2 p-5">
              <div
                className={`flex items-center justify-between gap-5 text-xl font-medium`}
              >
                <h3>{isRTL ? "الحماية والإضافات" : "Protection & Extras"}</h3>
                <p>
                  {(totalProtectionPrice + totalExtrasPrice).toFixed(2)} JOD
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between gap-5">
                  <p>
                    {selected_protection} ({totalDays} Day{totalDays > 1 && "s"}
                    )
                  </p>
                  <p>{totalProtectionPrice.toFixed(2)} JOD</p>
                </div>
                {selected_extras.map((extra) => (
                  <div
                    key={extra}
                    className="flex items-center justify-between gap-5"
                  >
                    <p>{extra}</p>
                    <p>
                      {(
                        (extras.find(({ offer_name }) => offer_name === extra)
                          ?.price ?? 0) * totalDays
                      ).toFixed(2)}{" "}
                      JOD
                    </p>
                  </div>
                ))}

                {selected_children_extras.map((extra) => {
                  const quantity = 1;
                  return (
                    <div
                      key={extra}
                      className="flex items-center justify-between gap-5"
                    >
                      <p className="capitalize">
                        {extra.split("_").join(" ")} ({quantity}x)
                      </p>
                      <p>
                        {(
                          (childrenExtras.find(
                            ({ offer_name }) => offer_name === extra,
                          )?.price ?? 0) *
                          quantity *
                          totalDays
                        ).toFixed(2)}{" "}
                        JOD
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="my-2 flex flex-col gap-2 bg-primary-variant-1 p-5">
              <div
                className={`flex w-full items-center justify-between gap-5`}
              >
                <h3>{isRTL ? "المجموع" : "Total"}</h3>
                <p>{totalPrice.toFixed(2)} JOD</p>
              </div>
              {paymentData.paymentMethod === PaymentMethod.PAYNOW && (
                <div
                  className={`flex w-full items-center justify-between gap-5`}
                >
                  <h3>
                    {isRTL ? "خصم (الدفع الآن) ٥٪" : "5% Discount (Pay Now)"}
                  </h3>
                  <p>{discountedPrice.toFixed(2)} JOD</p>
                </div>
              )}
            </div>

            <hr />

            {/* Payment Details */}
            <h2 className="mb-2 mt-5 text-2xl font-semibold">
              {isRTL ? "تفاصيل الدفع" : "PAYMENT DETAIL"}
            </h2>
            <div className="flex gap-3">
              <div className="flex w-full divide-x-2 border-2">
                <div className="flex w-full gap-14 p-4 text-xl">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium">
                      {isRTL ? "طريقة الدفع" : "Payment Method"}
                    </h3>
                    <h3 className="mt-2 text-xl">
                      {isRTL
                        ? paymentData.paymentMethod === PaymentMethod.PAYNOW
                          ? "الدفع الآن"
                          : "الدفع لاحقاً"
                        : paymentData.paymentMethod}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium">
                      {isRTL ? "المبلغ الإجمالي" : "Total Amount"}
                    </h3>
                    <h3 className="mt-2 text-xl">
                      {(
                        (totalBundlePrice +
                          totalProtectionPrice +
                          totalExtrasPrice) *
                        (paymentData.paymentMethod == PaymentMethod.PAYNOW
                          ? 0.95
                          : 1)
                      ).toFixed(2)}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium">
                      {isRTL ? "حالة الدفع" : "Payment Status"}
                    </h3>
                    <h3 className="mt-2 text-xl">
                      {paymentData.paymentMethod == PaymentMethod.PAYNOW
                        ? isRTL
                          ? "مدفوع"
                          : "PAID"
                        : isRTL
                          ? "غير مدفوع"
                          : "UNPAID"}
                    </h3>
                  </div>
                  {paymentData.paymentMethod === PaymentMethod.PAYNOW && (
                    <>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium">
                          {isRTL ? "بطاقة الائتمان" : "Credit Card"}
                        </h3>
                        <h3 className="mt-2 text-xl">
                          {"******" + paymentData.cardNumber.slice(-6)}
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium">
                          {isRTL ? "تاريخ الانتهاء" : "Expiry Code"}
                        </h3>
                        <h3 className="mt-2 text-xl">
                          {paymentData.expiryDate.format("MM/YY")}
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium">
                          {isRTL ? "الدفع المسبق" : "Prepayment"}
                        </h3>
                        <h3 className="mt-2 text-xl">
                          {(
                            (totalBundlePrice +
                              totalProtectionPrice +
                              totalExtrasPrice) *
                            0.95
                          ).toFixed(2)}{" "}
                          JOD
                        </h3>
                      </div>
                    </>
                  )}
                  {paymentData.paymentMethod === PaymentMethod.PAYLATER && (
                    <>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium">
                          {isRTL
                            ? "المبلغ المدفوع محليًا"
                            : "Amount Paid Locally"}
                        </h3>
                        <h3 className="mt-2 text-xl">
                          {(
                            totalBundlePrice +
                            totalProtectionPrice +
                            totalExtrasPrice
                          ).toFixed(2)}{" "}
                          JOD
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <p className={`mt-6 text-xl ${isRTL ? "text-right" : "text-left"}`}>
              {isRTL
                ? "للاستفسارات، اتصل بنا على +962 7XXX XXXX أو info@bridgerentacar.com"
                : "For any inquiries, contact us at +962 7XXX XXXX or info@bridgerentacar.com"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InvoiceDownloadComponent;
