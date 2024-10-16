import { useLayoutEffect, useState } from "react";

export default function useScrolledNavbar() {
  const [isScrolled, setIsScrolled] = useState(window?.scrollY > 60 ?? false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
}
