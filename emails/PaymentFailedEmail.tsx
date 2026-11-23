import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const ink = "#1A1A1A";
const muted = "#5A6A68";
const teal = "#35AEAE";
const pale = "#F1FCF9";

export default function PaymentFailedEmail({ firstName }: { firstName: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your card payment could not be processed.</Preview>
      <Body style={{ backgroundColor: pale, margin: 0, padding: "24px 12px" }}>
        <Container
          style={{
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <Section style={{ backgroundColor: teal, padding: "18px 28px" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: "13px",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              BRIDGE RENT-A-CAR
            </Text>
          </Section>
          <Section style={{ padding: "28px" }}>
            <Img
              src="cid:bridge-email-logo"
              alt="Bridge Rent-A-Car"
              width="180"
              style={{ margin: "0 0 20px" }}
            />
            <Text style={{ color: ink, fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              Dear {firstName},
            </Text>
            <Text style={{ color: ink, fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              Your credit or debit card payment could not be processed, so this
              booking is not confirmed.
            </Text>
            <Text style={{ color: ink, fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              No charge has been made to your card. You can try another card, or
              choose pay on delivery.
            </Text>
            <Text style={{ color: ink, fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              If you need help, contact us at info@bridgerentalcar.com.
            </Text>
            <Text style={{ color: muted, fontSize: "13px", lineHeight: "20px", margin: 0 }}>
              Bridge Rent-A-Car
              <br />
              bridgerentalcar.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function paymentFailedText(firstName: string) {
  return `Dear ${firstName},

Your credit or debit card payment could not be processed, so this booking is not confirmed.

No charge has been made to your card. You can try another card, or choose pay on delivery.

If you need help, contact us at info@bridgerentalcar.com.

Bridge Rent-A-Car
bridgerentalcar.com
`;
}
