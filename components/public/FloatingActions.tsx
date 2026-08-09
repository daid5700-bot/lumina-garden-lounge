"use client";

import { useEffect, useState } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";

export function FloatingActions({ messenger, zalo }: { messenger?: string | null; zalo: string }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const zaloUrl = zalo.startsWith("http") ? zalo : `https://zalo.me/${zalo}`;
  return (
    <div className="floating-actions" aria-label="Quick contact">
      <a href={zaloUrl} target="_blank" rel="noreferrer" className="float-btn zalo-btn" title="Chat Zalo"><strong>Zalo</strong></a>
      <a href={messenger || "#"} target={messenger ? "_blank" : undefined} rel={messenger ? "noreferrer" : undefined} className="float-btn chat-btn" aria-label="Facebook Messenger"><MessageCircle aria-hidden="true" /></a>
      <button type="button" className={`float-btn up-btn ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ChevronUp aria-hidden="true" /></button>
    </div>
  );
}
