import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navigation/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
