export const locales = ["vi", "en", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeInfo: Record<Locale, { label: string; short: string; country: string }> = {
  vi: { label: "Tiếng Việt", short: "VI", country: "VN" },
  en: { label: "English", short: "EN", country: "GB" },
  zh: { label: "中文", short: "中文", country: "CN" },
  ko: { label: "한국어", short: "한국", country: "KR" }
};

type UiDictionary = {
  nav: { home: string; about: string; menu: string; gallery: string; news: string; contact: string };
  common: { discover: string; bookNow: string; viewAll: string; readMore: string; related: string; currency: string };
  sections: { menu: string; gallery: string; news: string; features: string };
  booking: {
    name: string;
    phone: string;
    guests: string;
    date: string;
    note: string;
    submit: string;
    success: string;
    error: string;
  };
  footer: { explore: string; contact: string; hours: string; rights: string; recommendation: string };
  pages: { menuTitle: string; galleryTitle: string; newsTitle: string; backNews: string; published: string };
};

export const ui: Record<Locale, UiDictionary> = {
  vi: {
    nav: { home: "Trang chủ", about: "Giới thiệu", menu: "Thực đơn", gallery: "Hình ảnh", news: "Tin tức", contact: "Liên hệ" },
    common: { discover: "Khám phá", bookNow: "Đặt bàn ngay", viewAll: "Xem tất cả", readMore: "Xem thêm", related: "Tin liên quan", currency: "₫" },
    sections: { menu: "Hương vị nổi bật", gallery: "Không gian huyền bí", news: "Sự kiện mới", features: "Trải nghiệm khác biệt" },
    booking: { name: "Tên của bạn", phone: "Số điện thoại", guests: "Số khách", date: "Ngày đặt bàn", note: "Ghi chú", submit: "Gửi yêu cầu", success: "Yêu cầu đã được gửi. Chúng tôi sẽ liên hệ sớm!", error: "Chưa thể gửi yêu cầu. Vui lòng gọi hotline." },
    footer: { explore: "Khám phá", contact: "Liên hệ", hours: "Giờ mở cửa", rights: "Đã đăng ký bản quyền.", recommendation: "Mở cửa mỗi đêm · Nên đặt bàn trước" },
    pages: { menuTitle: "Thực đơn 909 Lumina", galleryTitle: "Khoảnh khắc tại Lumina", newsTitle: "Tin tức & Sự kiện", backNews: "Quay lại tin tức", published: "Đăng ngày" }
  },
  en: {
    nav: { home: "Home", about: "About", menu: "Menu", gallery: "Gallery", news: "News", contact: "Contact" },
    common: { discover: "Discover", bookNow: "Book a table", viewAll: "View all", readMore: "Read more", related: "Related stories", currency: "₫" },
    sections: { menu: "Signature flavours", gallery: "An enchanted space", news: "Latest events", features: "A different experience" },
    booking: { name: "Your name", phone: "Phone number", guests: "Number of guests", date: "Reservation date", note: "Notes", submit: "Send request", success: "Your request was sent. We will contact you shortly!", error: "We could not send your request. Please call our hotline." },
    footer: { explore: "Explore", contact: "Contact", hours: "Opening hours", rights: "All rights reserved.", recommendation: "Every night · Reservations recommended" },
    pages: { menuTitle: "909 Lumina Menu", galleryTitle: "Moments at Lumina", newsTitle: "News & Events", backNews: "Back to news", published: "Published" }
  },
  zh: {
    nav: { home: "首页", about: "关于我们", menu: "菜单", gallery: "环境展示", news: "新闻", contact: "联系我们" },
    common: { discover: "探索更多", bookNow: "立即订座", viewAll: "查看全部", readMore: "阅读更多", related: "相关新闻", currency: "₫" },
    sections: { menu: "招牌风味", gallery: "梦幻空间", news: "最新活动", features: "非凡体验" },
    booking: { name: "您的姓名", phone: "电话号码", guests: "客人人数", date: "预订日期", note: "备注", submit: "提交预订", success: "预订请求已发送，我们会尽快联系您！", error: "暂时无法提交，请拨打热线。" },
    footer: { explore: "探索", contact: "联系方式", hours: "营业时间", rights: "版权所有。", recommendation: "每晚营业 · 建议提前预订" },
    pages: { menuTitle: "909 Lumina 菜单", galleryTitle: "Lumina 精彩瞬间", newsTitle: "新闻与活动", backNews: "返回新闻", published: "发布于" }
  },
  ko: {
    nav: { home: "홈", about: "소개", menu: "메뉴", gallery: "갤러리", news: "소식", contact: "연락처" },
    common: { discover: "둘러보기", bookNow: "테이블 예약", viewAll: "전체 보기", readMore: "더 보기", related: "관련 소식", currency: "₫" },
    sections: { menu: "시그니처 메뉴", gallery: "신비로운 공간", news: "최신 이벤트", features: "특별한 경험" },
    booking: { name: "이름", phone: "전화번호", guests: "인원", date: "예약 날짜", note: "요청 사항", submit: "예약 요청", success: "요청이 전송되었습니다. 곧 연락드리겠습니다!", error: "요청을 보낼 수 없습니다. 핫라인으로 연락해 주세요." },
    footer: { explore: "둘러보기", contact: "연락처", hours: "영업시간", rights: "모든 권리 보유.", recommendation: "매일 밤 운영 · 사전 예약 권장" },
    pages: { menuTitle: "909 Lumina 메뉴", galleryTitle: "Lumina의 순간", newsTitle: "뉴스 & 이벤트", backNews: "뉴스로 돌아가기", published: "게시일" }
  }
};
