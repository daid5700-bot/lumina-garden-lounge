"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type MenuPage = {
  id: string;
  image: string;
  alt: string;
};

const IMAGES_PER_PAGE = 3;

export function MenuImagePager({ pages }: { pages: MenuPage[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(pages.length / IMAGES_PER_PAGE);
  const visiblePages = pages.slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE);

  if (!pages.length) return null;

  return (
    <>
      <div className="menu-image-grid">
        {visiblePages.map((page) => (
          <Image
            key={page.id}
            src={page.image}
            alt={page.alt}
            className="menu-page-img"
            width={740}
            height={1112}
            sizes="(max-width: 768px) 84vw, (max-width: 992px) 42vw, 27vw"
          />
        ))}
      </div>
      {pageCount > 1 && (
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
