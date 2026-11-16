
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
  title: "Bridge Rent-A-Car",
  description: "Rent a car at your doorstep",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-auto max-w-[1920px]">
        <MuiLocalizationProvider>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </MuiLocalizationProvider>
      </body>
    </html>
  );
}
