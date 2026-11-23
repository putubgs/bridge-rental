import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { bookingIntro, amountLabel, statusLabel } from "@/lib/booking-copy";
import { formatMoney, type PreparedBooking } from "@/lib/prepare-booking";

const ink = "#1A1A1A";
const muted = "#5A6A68";
const teal = "#35AEAE";
const mint = "#BAF0E2";
const pale = "#F1FCF9";

export default function BookingEmail({
  booking,
  includeInvoice,
}: {
  booking: PreparedBooking;
  includeInvoice: boolean;
}) {
  return (
    <Html>
      <Head />
      <Preview>{bookingIntro(booking.status, booking.firstName)}</Preview>
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

          <Section style={{ padding: "28px 28px 8px" }}>
            <Img
              src="cid:bridge-email-logo"
              alt="Bridge Rent-A-Car"
              width="180"
              style={{ margin: "0 0 20px" }}
            />
            <Text style={{ color: teal, fontSize: "13px", fontWeight: 700, margin: "0 0 8px" }}>
              {statusLabel(booking.status).toUpperCase()}
            </Text>
            <Text style={{ color: ink, fontSize: "22px", fontWeight: 700, margin: "0 0 12px" }}>
              {booking.vehicleModel}
            </Text>
            <Text style={{ color: ink, fontSize: "15px", lineHeight: "24px", margin: 0 }}>
              {bookingIntro(booking.status, booking.firstName)}
            </Text>
          </Section>

          <Section style={{ padding: "8px 28px 0" }}>
            <Text style={label}>Reference</Text>
            <Text style={value}>{booking.reference}</Text>
            <Text style={label}>Delivery</Text>
            <Text style={value}>
              {booking.deliveryWhen || "—"}
              <br />
              {booking.deliveryLocation || "—"}
            </Text>
            <Text style={label}>Pick-up</Text>
            <Text style={value}>
              {booking.pickupWhen || "—"}
              <br />
              {booking.pickupLocation || "—"}
            </Text>
          </Section>

          <Section style={{ padding: "8px 28px 0" }}>
            <Text style={{ ...label, color: teal }}>Price breakdown</Text>
            {booking.lines.map((line, index) => (
              <Row key={`${line.label}-${index}`} style={{ borderBottom: `1px solid ${pale}` }}>
                <Column style={{ width: "72%", padding: "8px 8px 8px 0" }}>
                  <Text style={{ color: ink, fontSize: "14px", margin: 0 }}>{line.label}</Text>
                </Column>
                <Column align="right" style={{ padding: "8px 0" }}>
                  <Text style={{ color: ink, fontSize: "14px", margin: 0 }}>
                    {formatMoney(line.amount)}
                  </Text>
                </Column>
              </Row>
            ))}
            <Row>
              <Column style={{ padding: "10px 8px 4px 0" }}>
                <Text style={{ color: muted, fontSize: "14px", margin: 0 }}>Subtotal</Text>
              </Column>
              <Column align="right" style={{ padding: "10px 0 4px" }}>
                <Text style={{ color: muted, fontSize: "14px", margin: 0 }}>
                  {formatMoney(booking.subtotal)}
                </Text>
              </Column>
            </Row>
            {booking.discount > 0 && (
              <Row>
                <Column style={{ padding: "4px 8px 4px 0" }}>
                  <Text style={{ color: teal, fontSize: "14px", margin: 0 }}>
                    Pay now discount (5%)
                  </Text>
                </Column>
                <Column align="right" style={{ padding: "4px 0" }}>
                  <Text style={{ color: teal, fontSize: "14px", margin: 0 }}>
                    − {formatMoney(booking.discount)}
                  </Text>
                </Column>
              </Row>
            )}
            <Row
              style={{
                backgroundColor: pale,
                borderRadius: "8px",
              }}
            >
              <Column style={{ padding: "12px 8px 12px 12px" }}>
                <Text style={{ color: ink, fontSize: "15px", fontWeight: 700, margin: 0 }}>
                  {amountLabel(booking.status)}
                </Text>
              </Column>
              <Column align="right" style={{ padding: "12px 12px 12px 0" }}>
                <Text style={{ color: ink, fontSize: "15px", fontWeight: 700, margin: 0 }}>
                  {formatMoney(booking.amountDue)}
                </Text>
              </Column>
            </Row>
            {booking.chargedAmount !== null && booking.status === "review" && (
              <Text style={{ color: muted, fontSize: "13px", margin: "8px 0 0" }}>
                The bank reported {formatMoney(booking.chargedAmount)}.
              </Text>
            )}
            <Text style={{ color: muted, fontSize: "12px", margin: "8px 0 0" }}>
              VAT is included in these prices.
            </Text>
          </Section>

          <Section style={{ padding: "16px 28px 8px" }}>
            <Text style={label}>Payment</Text>
            <Text style={value}>
              {statusLabel(booking.status)}
              {booking.cardLast4 ? ` · card **** ${booking.cardLast4}` : ""}
              {booking.cardExpiry ? ` · expires ${booking.cardExpiry}` : ""}
            </Text>
            {includeInvoice && (
              <Text style={{ color: ink, fontSize: "14px", lineHeight: "22px", margin: "4px 0 0" }}>
                The invoice PDF is attached to this email.
              </Text>
            )}
          </Section>

          <Hr style={{ borderColor: mint, margin: "8px 28px" }} />
          <Section style={{ padding: "4px 28px 28px" }}>
            <Text style={{ color: muted, fontSize: "13px", lineHeight: "20px", margin: 0 }}>
              Bridge Rent-A-Car
              <br />
              info@bridgerentalcar.com
              <br />
              bridgerentalcar.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const label = {
  color: muted,
  fontSize: "11px",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  margin: "12px 0 2px",
};

const value = {
  color: ink,
  fontSize: "15px",
  lineHeight: "22px",
  margin: 0,
};
