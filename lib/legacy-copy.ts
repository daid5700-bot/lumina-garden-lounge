import type { Locale } from "@/lib/i18n";

type LegacyCopy = {
  welcome: string;
  aboutTitle: [string, string];
  menuTitle: [string, string];
  galleryTitle: [string, string];
  bookingTitle: [string, string];
  galleryPage: string;
  newsPage: string;
  bookingFormTitle: string;
  bookingSubmit: string;
  zaloLabel: string;
  hotlineLabel: string;
  readMore: string;
  related: string;
  views: string;
};

export const legacyCopy: Record<Locale, LegacyCopy> = {
  vi: {
    welcome: "CHÀO MỪNG ĐẾN VỚI",
    aboutTitle: ["GIỚI", "THIỆU"],
    menuTitle: ["THỰC", "ĐƠN"],
    galleryTitle: ["KHÔNG GIAN", "HUYỀN BÍ"],
    bookingTitle: ["LIÊN HỆ &", "ĐẶT BÀN"],
    galleryPage: "HÌNH ẢNH",
    newsPage: "TIN TỨC SỰ KIỆN",
    bookingFormTitle: "Gửi Yêu Cầu Booking",
    bookingSubmit: "XÁC NHẬN ĐẶT BÀN",
    zaloLabel: "Chat Zalo",
    hotlineLabel: "Hotline Trực Tiếp",
    readMore: "XEM THÊM",
    related: "TIN LIÊN QUAN",
    views: "Lượt xem"
  },
  en: {
    welcome: "WELCOME TO",
    aboutTitle: ["ABOUT", "US"],
    menuTitle: ["OUR", "MENU"],
    galleryTitle: ["ENCHANTED", "SPACE"],
    bookingTitle: ["CONTACT &", "RESERVATIONS"],
    galleryPage: "GALLERY",
    newsPage: "NEWS & EVENTS",
    bookingFormTitle: "Send a Booking Request",
    bookingSubmit: "CONFIRM RESERVATION",
    zaloLabel: "Chat on Zalo",
    hotlineLabel: "Direct Hotline",
    readMore: "READ MORE",
    related: "RELATED NEWS",
    views: "Views"
  },
  zh: {
    welcome: "欢迎来到",
    aboutTitle: ["关于", "我们"],
    menuTitle: ["餐饮", "菜单"],
    galleryTitle: ["梦幻", "空间"],
    bookingTitle: ["联系与", "订座"],
    galleryPage: "环境展示",
    newsPage: "新闻与活动",
    bookingFormTitle: "发送订座请求",
    bookingSubmit: "确认订座",
    zaloLabel: "Zalo 咨询",
    hotlineLabel: "热线电话",
    readMore: "阅读更多",
    related: "相关新闻",
    views: "浏览"
  },
  ko: {
    welcome: "909 LUMINA에 오신 것을 환영합니다",
    aboutTitle: ["LUMINA", "소개"],
    menuTitle: ["시그니처", "메뉴"],
    galleryTitle: ["신비로운", "공간"],
    bookingTitle: ["문의 &", "예약"],
    galleryPage: "갤러리",
    newsPage: "뉴스 & 이벤트",
    bookingFormTitle: "예약 요청 보내기",
    bookingSubmit: "예약 확인",
    zaloLabel: "Zalo 채팅",
    hotlineLabel: "핫라인",
    readMore: "더 보기",
    related: "관련 소식",
    views: "조회"
  }
};
