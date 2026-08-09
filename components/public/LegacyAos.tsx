"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LegacyAos() {
  const pathname = usePathname();

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const publicSite = document.querySelector<HTMLElement>(".public-site");
    const observedElements = new Set<HTMLElement>();
    const reveal = (element: HTMLElement) => {
      element.classList.remove("aos-pending");
      element.classList.add("aos-animate");
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      });
    }, { rootMargin: "0px 0px -50px", threshold: 0.08 });

    const observeElements = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-aos]:not(.aos-animate)"));
      if (isReducedMotion) {
        elements.forEach((element) => reveal(element));
        return;
      }

      elements.forEach((element) => {
        if (observedElements.has(element)) return;
        observedElements.add(element);
        element.classList.add("aos-pending");
        observer.observe(element);
      });
    };

    if (!isReducedMotion) publicSite?.classList.add("aos-ready");
    observeElements();

    // Safety net: above-the-fold content must never stay hidden if the browser
    // delays IntersectionObserver during a dev-server refresh.
    const fallbackTimer = window.setTimeout(() => {
      observedElements.forEach((element) => {
        const box = element.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > -100) reveal(element);
      });
    }, 900);

    const mutationObserver = new MutationObserver(observeElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      mutationObserver.disconnect();
      observedElements.forEach((element) => element.classList.remove("aos-pending"));
      publicSite?.classList.remove("aos-ready");
    };
  }, [pathname]);

  return null;
}
