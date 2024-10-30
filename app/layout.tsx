import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navigation/navbar";
import MuiLocalizationProvider from "@/components/shared/wrapper/mui-localization-provider";
import MuiThemeProvider from "@/components/shared/wrapper/mui-theme-provider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Bridge Rental",
  description: "Car Rentals At Your Doorstep",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-auto max-w-[1560px] border">
        <MuiLocalizationProvider>
          <MuiThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </MuiThemeProvider>
        </MuiLocalizationProvider>
      </body>
    </html>
  );
}
