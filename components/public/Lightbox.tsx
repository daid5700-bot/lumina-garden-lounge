"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function Lightbox({ items }: { items: { id: string; image: string; alt: string; delay: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    
    setTouchStart(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") setCurrentIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items.length]);

  const handleNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <>
      <div className="gallery-grid-new">
        {items.map((item, index) => (
          <figure 
            className="gallery-card" 
            data-aos="zoom-in" 
            data-aos-delay={item.delay} 
            key={item.id}
            onClick={() => setCurrentIndex(index)}
          >
            <Image src={item.image} alt={item.alt} fill sizes="(max-width: 576px) calc(100vw - 40px), (max-width: 992px) 42vw, 21vw" />
          </figure>
        ))}
      </div>

      {currentIndex !== null && typeof document !== 'undefined' && createPortal(
        <div 
          className="lightbox-overlay" 
          onClick={() => setCurrentIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className="lightbox-close" onClick={() => setCurrentIndex(null)}>✕</button>
          
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
            ❮
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={items[currentIndex].image} alt={items[currentIndex].alt} />
          </div>

          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
            ❯
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
