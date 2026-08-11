"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { PublicMenuPage } from "@/lib/content";

const IMAGES_PER_PAGE = 3;
const menuTabs = [
  { id: "LOUNGE", label: "Menu Lounge" },
  { id: "GARDEN", label: "Menu Garden" }
] as const;

export function MenuImagePager({ pages }: { pages: PublicMenuPage[] }) {
  const hasLounge = pages.some((page) => page.menuType === "LOUNGE");
  const [activeTab, setActiveTab] = useState<"LOUNGE" | "GARDEN">(hasLounge ? "LOUNGE" : "GARDEN");
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const tabPages = pages.filter((page) => page.menuType === activeTab);
  const pageCount = Math.ceil(tabPages.length / IMAGES_PER_PAGE);
  const visiblePages = isMobile ? tabPages : tabPages.slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  if (!pages.length) return null;

  return (
    <>
      <div className="menu-tabs" role="tablist" aria-label="Menu type">
        {menuTabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            id={`menu-tab-${tab.id.toLowerCase()}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="menu-tab-panel"
            className={`menu-tab${activeTab === tab.id ? " active" : ""}`}
            onClick={() => { setActiveTab(tab.id); setCurrentPage(0); }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id="menu-tab-panel" role="tabpanel" aria-labelledby={`menu-tab-${activeTab.toLowerCase()}`} className="menu-tab-panel">
        {visiblePages.length ? (
          <div className="menu-image-grid">
            {visiblePages.map((page) => (
              <Image
                key={page.id}
                src={page.image}
                alt={page.alt}
                className="menu-page-img"
                width={740}
                height={1112}
                sizes="(max-width: 768px) calc(100vw - 72px), (max-width: 992px) 42vw, 27vw"
              />
            ))}
          </div>
        ) : <p className="menu-empty-state">Menu này đang được cập nhật.</p>}
      </div>
      {!isMobile && pageCount > 1 && (
        <nav className="menu-pagination" aria-label="Menu pages">
          <button
            type="button"
            className="menu-pagination-button"
            onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            disabled={currentPage === 0}
            aria-label="Previous menu page"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              type="button"
              key={page}
              className={`menu-pagination-button${page === currentPage ? " active" : ""}`}
              onClick={() => setCurrentPage(page)}
              aria-label={`Menu page ${page + 1}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page + 1}
            </button>
          ))}
          <button
            type="button"
            className="menu-pagination-button"
            onClick={() => setCurrentPage((page) => Math.min(pageCount - 1, page + 1))}
            disabled={currentPage === pageCount - 1}
            aria-label="Next menu page"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </nav>
      )}
    </>
  );
}
