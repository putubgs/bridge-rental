import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black px-20 pb-10 pt-20 -mt-20">
      <footer className="mx-auto flex max-w-screen-2xl flex-col gap-20 text-white">
        <div className="grid grid-cols-3 divide-x divide-neutral-700 [&>div]:py-5">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-[33px] w-[109px]">
              <Image
                src="/assets/img/brand-logo-white.png"
                alt="Brand Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="space-y-1">
              <h2>TELEPHONE</h2>
              <p className="text-neutral-500">For booking or support</p>
              <ul className="space-y-1 pt-2">
                <li>+962-6-7790-890</li>
                <li>+962-7-9169-8125</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="space-y-1">
              <h2>CONTACT US</h2>
              <p className="text-neutral-500">For help and feedbacks</p>
              <ul className="space-y-1 pt-2">
                <li>customer@bridge.co.com</li>
                <li>info@bridge.co.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 border-t border-neutral-700 pt-5 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Bridge Rental Car.</p>
          <div className="flex gap-5">
            <Link href={"/"} className="hover:underline">
              Terms of Service
            </Link>
            <Link href={"/"} className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
