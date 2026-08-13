"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronUp, PhoneCall, X } from "lucide-react";

type QrContact = {
  title: string;
  qr: string;
  icon: string;
  width: number;
  height: number;
};

const qrContacts: QrContact[] = [
  { title: "KakaoTalk", qr: "/kakao.jpg", icon: "/icon/kakao.png", width: 750, height: 925 },
  { title: "WeChat", qr: "/wechat.jpg", icon: "/icon/wechat.png", width: 888, height: 1191 },
  { title: "WhatsApp", qr: "/whatapp.png", icon: "/icon/whatapp.png", width: 420, height: 410 }
];

export function FloatingActions({ phone, zalo }: { phone: string; zalo: string }) {
  const [showTop, setShowTop] = useState(false);
  const [activeQr, setActiveQr] = useState<QrContact | null>(null);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!activeQr) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveQr(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeQr]);
  const zaloUrl = zalo.startsWith("http") ? zalo : `https://zalo.me/${zalo.replace(/\D/g, "")}`;
  return (
    <>
      <div className="floating-actions" aria-label="Quick contact">
        <a href={zaloUrl} target="_blank" rel="noreferrer" className="float-btn contact-float zalo-btn" aria-label="Chat qua Zalo">
          <Image src="/icon/zalo.png" alt="" width={447} height={447} sizes="28px" />
        </a>
        <a href="https://t.me/+84888533534" target="_blank" rel="noreferrer" className="float-btn contact-float social-icon-float telegram-float" aria-label="Chat qua Telegram">
          <Image src="/icon/tele.png" alt="" width={447} height={447} sizes="28px" />
        </a>
        {qrContacts.map((contact) => (
          <button key={contact.title} type="button" className="float-btn contact-float social-icon-float" onClick={() => setActiveQr(contact)} aria-label={`Mở mã QR ${contact.title}`} aria-haspopup="dialog" aria-expanded={activeQr?.title === contact.title}>
            <Image src={contact.icon} alt="" width={512} height={512} sizes="28px" />
          </button>
        ))}
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="float-btn contact-float phone-btn" aria-label={`Gọi ${phone}`}>
          <PhoneCall aria-hidden="true" />
        </a>
        <button type="button" className={`float-btn up-btn ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ChevronUp aria-hidden="true" /></button>
      </div>
      {activeQr && createPortal(
        <div className="qr-dialog-backdrop" role="presentation" onMouseDown={() => setActiveQr(null)}>
          <section className="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="qr-dialog-close" onClick={() => setActiveQr(null)} aria-label="Đóng mã QR"><X aria-hidden="true" /></button>
            <h2 id="qr-dialog-title">Quét mã {activeQr.title}</h2>
            <Image src={activeQr.qr} alt={`Mã QR ${activeQr.title} của 909 Lumina`} width={activeQr.width} height={activeQr.height} sizes="(max-width: 540px) 76vw, 440px" priority />
          </section>
        </div>
        , document.body)}
    </>
  );
}
