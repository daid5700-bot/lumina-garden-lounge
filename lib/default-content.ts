import type { Locale } from "@/lib/i18n";

export type LocalizedText = Record<Locale, string>;

export type SiteContent = {
  id: string;
  siteName: string;
  logoImage: string | null;
  heroImage: string;
  heroVideo: string | null;
  phone: string;
  zalo: string;
  messenger: string | null;
  email: string | null;
  address: string;
  mapUrl: string | null;
  openingHours: string;
  facebook: string | null;
  instagram: string | null;
  translation: {
    seoTitle: string;
    seoDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutHeading: string;
    aboutBody: string;
    aboutBodySecondary: string;
    aboutFeatureOne: string;
    aboutFeatureTwo: string;
    aboutFeatureThree: string;
    featureOneTitle: string;
    featureOneBody: string;
    featureTwoTitle: string;
    featureTwoBody: string;
    featureThreeTitle: string;
    featureThreeBody: string;
    contactTitle: string;
    contactDescription: string;
  };
};

export const siteBase = {
  id: "main",
  siteName: "909 Lumina Garden Lounge",
  logoImage: null,
  heroImage: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?auto=format&fit=crop&w=1920&q=86",
  heroVideo: null,
  phone: "0987 654 321",
  zalo: "0123456789",
  messenger: "https://m.me/909lumina",
  email: "hello@909lumina.vn",
  address: "Quận 5, Thành phố Hồ Chí Minh, Việt Nam",
  mapUrl: null,
  openingHours: "18:00 — 02:00",
  facebook: "https://facebook.com/909lumina",
  instagram: "https://instagram.com/909lumina"
};

export const siteTranslations: Record<Locale, SiteContent["translation"]> = {
  vi: {
    seoTitle: "909 Lumina Garden Lounge | Lounge sân vườn Quận 5",
    seoDescription: "Khám phá 909 Lumina Garden Lounge — không gian giải trí sân vườn phong cách Pandora, cocktail, ẩm thực fusion và âm nhạc tại Quận 5.",
    heroEyebrow: "CHÀO MỪNG ĐẾN VỚI",
    heroTitle: "909 LUMINA",
    heroSubtitle: "Đắm chìm vào không gian giải trí phong cách Avatar siêu thực ngay giữa lòng Sài Gòn",
    aboutTitle: "GIỚI THIỆU",
    aboutHeading: "Tổ Hợp Giải Trí Đẳng Cấp Quận 5",
    aboutBody: "909 Lumina Garden Lounge mang đến trải nghiệm không gian giải trí hoàn toàn mới lạ. Lấy cảm hứng từ hành tinh Pandora huyền bí, kết hợp cùng ánh sáng Neon tương lai và âm nhạc đỉnh cao.",
    aboutBodySecondary: "Đến với 909 Lumina, bạn không chỉ thưởng thức ẩm thực, đồ uống hảo hạng mà còn đắm chìm vào nghệ thuật thị giác độc bản.",
    aboutFeatureOne: "Không gian mở, concept khu rừng phát sáng",
    aboutFeatureTwo: "Hệ thống âm thanh, ánh sáng hiện đại bậc nhất",
    aboutFeatureThree: "Menu đa dạng: Beer, Cocktail, Ẩm thực Fusion",
    featureOneTitle: "Không gian sân vườn",
    featureOneBody: "Không gian mở nhiều lớp được tạo nên từ cây xanh, chất liệu tự nhiên và ánh sáng giàu biểu cảm.",
    featureTwoTitle: "Hương vị thủ công",
    featureTwoBody: "Thực đơn đầy ngẫu hứng với hải sản tươi, món fusion và những ly cocktail đặc trưng.",
    featureThreeTitle: "Âm thanh tuyển chọn",
    featureThreeBody: "Âm nhạc chuyển nhịp từ những buổi hoàng hôn thư giãn đến đêm tiệc sôi động.",
    contactTitle: "Trải Nghiệm Không Gian Đỉnh Cao",
    contactDescription: "Để đảm bảo chỗ ngồi tốt nhất và phục vụ chu đáo, quý khách vui lòng liên hệ trước qua Zalo của chủ quán hoặc điền form yêu cầu."
  },
  en: {
    seoTitle: "909 Lumina Garden Lounge | Garden lounge in District 5",
    seoDescription: "Discover 909 Lumina Garden Lounge — a Pandora-inspired nightlife garden with cocktails, fusion cuisine and music in District 5, Ho Chi Minh City.",
    heroEyebrow: "A night garden in the heart of Saigon",
    heroTitle: "909 LUMINA",
    heroSubtitle: "Food, light and music converge inside 909 Lumina's one-of-a-kind bioluminescent garden.",
    aboutTitle: "The Lumina story",
    aboutHeading: "A garden that comes alive after sunset",
    aboutBody: "909 Lumina Garden Lounge is a Pandora-inspired entertainment experience where enchanted nature meets futuristic lighting technology.",
    aboutBodySecondary: "From crafted cocktails and fusion plates to vibrant DJ nights, every detail is designed to awaken your senses.",
    aboutFeatureOne: "Immersive bioluminescent garden",
    aboutFeatureTwo: "Signature cocktails & fusion cuisine",
    aboutFeatureThree: "Curated music & premium service",
    featureOneTitle: "Garden atmosphere",
    featureOneBody: "A layered open-air setting shaped by plants, natural textures and expressive light.",
    featureTwoTitle: "Crafted flavours",
    featureTwoBody: "A playful menu of fresh seafood, fusion plates and signature cocktails.",
    featureThreeTitle: "Curated sound",
    featureThreeBody: "Music that moves from laid-back sunset sessions to energetic late nights.",
    contactTitle: "A great night begins with the perfect table",
    contactDescription: "Reserve ahead and let our team prepare the right setting for your date, birthday or celebration."
  },
  zh: {
    seoTitle: "909 Lumina Garden Lounge | 胡志明市第五郡花园酒廊",
    seoDescription: "探索 909 Lumina Garden Lounge：以潘多拉为灵感，融合鸡尾酒、创意料理、音乐与梦幻灯光的第五郡夜生活空间。",
    heroEyebrow: "西贡中心的夜光花园",
    heroTitle: "909 LUMINA",
    heroSubtitle: "美食、灯光与音乐，在 909 Lumina 独特的荧光花园中交汇。",
    aboutTitle: "Lumina 的故事",
    aboutHeading: "一座日落后苏醒的花园",
    aboutBody: "909 Lumina Garden Lounge 以潘多拉星球为灵感，让梦幻自然与未来灯光科技在同一个夜晚相遇。",
    aboutBodySecondary: "从手工鸡尾酒、融合料理到活力 DJ 之夜，每个细节都为唤醒您的感官而设计。",
    aboutFeatureOne: "沉浸式荧光花园",
    aboutFeatureTwo: "招牌鸡尾酒与融合料理",
    aboutFeatureThree: "精选音乐与优质服务",
    featureOneTitle: "花园氛围",
    featureOneBody: "植物、自然质感与灵动灯光共同构成层次丰富的开放空间。",
    featureTwoTitle: "匠心风味",
    featureTwoBody: "新鲜海鲜、融合料理与招牌鸡尾酒，带来充满创意的菜单。",
    featureThreeTitle: "精选音乐",
    featureThreeBody: "从轻松的日落时光到充满能量的深夜，音乐随氛围自然流动。",
    contactTitle: "美好夜晚，从一张好桌开始",
    contactDescription: "提前预订，让 Lumina 团队为约会、生日或派对准备最合适的空间。"
  },
  ko: {
    seoTitle: "909 Lumina Garden Lounge | 호치민 5군 가든 라운지",
    seoDescription: "판도라에서 영감을 받은 정원, 칵테일, 퓨전 요리와 음악이 어우러진 호치민 5군의 909 Lumina Garden Lounge를 만나보세요.",
    heroEyebrow: "사이공 한가운데 펼쳐진 밤의 정원",
    heroTitle: "909 LUMINA",
    heroSubtitle: "음식과 빛, 음악이 909 Lumina만의 빛나는 정원에서 하나가 됩니다.",
    aboutTitle: "Lumina 이야기",
    aboutHeading: "해가 진 뒤 깨어나는 정원",
    aboutBody: "909 Lumina Garden Lounge는 판도라에서 영감을 받아 신비로운 자연과 미래적인 조명 기술을 결합한 엔터테인먼트 공간입니다.",
    aboutBodySecondary: "수제 칵테일부터 퓨전 메뉴, 생동감 넘치는 DJ 나이트까지 모든 디테일이 감각을 깨우도록 설계되었습니다.",
    aboutFeatureOne: "몰입형 바이오루미네슨트 가든",
    aboutFeatureTwo: "시그니처 칵테일 & 퓨전 요리",
    aboutFeatureThree: "큐레이션 음악 & 프리미엄 서비스",
    featureOneTitle: "가든 분위기",
    featureOneBody: "식물과 자연스러운 질감, 감각적인 조명이 층층이 어우러진 야외 공간입니다.",
    featureTwoTitle: "정성 어린 맛",
    featureTwoBody: "신선한 해산물, 퓨전 요리와 시그니처 칵테일로 구성된 창의적인 메뉴입니다.",
    featureThreeTitle: "큐레이션 사운드",
    featureThreeBody: "편안한 선셋 세션부터 에너지 넘치는 늦은 밤까지 분위기에 맞춰 흐릅니다.",
    contactTitle: "완벽한 밤은 좋은 자리에서 시작됩니다",
    contactDescription: "데이트, 생일 또는 파티에 가장 어울리는 자리를 준비할 수 있도록 미리 예약해 주세요."
  }
};

const lt = (vi: string, en: string, zh: string, ko: string): LocalizedText => ({ vi, en, zh, ko });

export const defaultCategories = [
  { id: "cat-seafood", slug: "seafood", sortOrder: 1, name: lt("Hải sản", "Seafood", "海鲜", "해산물") },
  { id: "cat-cocktail", slug: "cocktails", sortOrder: 2, name: lt("Cocktail", "Cocktails", "鸡尾酒", "칵테일") },
  { id: "cat-fusion", slug: "fusion", sortOrder: 3, name: lt("Món Fusion", "Fusion plates", "融合料理", "퓨전 요리") }
];

export const defaultMenuItems = [
  { id: "menu-1", categoryId: "cat-seafood", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=82", price: 399000, featured: true, sortOrder: 1, name: lt("Tôm sú nướng muối ớt", "Chilli salt grilled tiger prawns", "盐辣烤虎虾", "칠리 솔트 타이거 새우 구이"), description: lt("Tôm sú tươi, muối ớt xanh và chanh nướng.", "Fresh tiger prawns, green chilli salt and grilled lime.", "新鲜虎虾、青辣椒盐与烤青柠。", "신선한 타이거 새우, 그린 칠리 솔트, 구운 라임.") },
  { id: "menu-2", categoryId: "cat-cocktail", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=82", price: 189000, featured: true, sortOrder: 2, name: lt("Pandora Tears", "Pandora Tears", "潘多拉之泪", "판도라 티어스"), description: lt("Gin, hoa đậu biếc, yuzu và màn sương thảo mộc.", "Gin, butterfly pea, yuzu and an aromatic mist.", "金酒、蝶豆花、柚子与草本香雾。", "진, 버터플라이피, 유자와 아로마 미스트.") },
  { id: "menu-3", categoryId: "cat-fusion", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=82", price: 289000, featured: true, sortOrder: 3, name: lt("Bò nướng đá Lumina", "Lumina hot-stone beef", "Lumina 石烤牛肉", "루미나 핫스톤 비프"), description: lt("Bò mềm, sốt tiêu rừng và rau củ theo mùa.", "Tender beef, wild pepper sauce and seasonal vegetables.", "嫩牛肉、野胡椒酱与时令蔬菜。", "부드러운 소고기, 와일드 페퍼 소스, 제철 채소.") },
  { id: "menu-4", categoryId: "cat-cocktail", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=82", price: 209000, featured: false, sortOrder: 4, name: lt("Biolume Garden", "Biolume Garden", "荧光花园", "바이오룸 가든"), description: lt("Rum trắng, dứa, bạc hà và bọt chanh dây.", "White rum, pineapple, mint and passionfruit foam.", "白朗姆、菠萝、薄荷与百香果泡沫。", "화이트 럼, 파인애플, 민트, 패션프루트 폼.") }
];

export const defaultMenuPages = [1, 2, 3, 4].map((number) => ({ id: `page-${number}`, image: `/menu/menu-${number}.png`, alt: `909 Lumina menu page ${number}`, sortOrder: number }));

export const defaultGallery = [
  ["gallery-1", "https://images.unsplash.com/photo-1574096079513-d8259312b78a?auto=format&fit=crop&w=1200&q=82", lt("Lounge Area", "Lounge Area", "酒廊区", "라운지 공간")],
  ["gallery-2", "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=82", lt("Bar Counter", "Bar Counter", "中央吧台", "바 카운터")],
  ["gallery-3", "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=82", lt("Sân Khấu", "The Stage", "灯光舞台", "메인 스테이지")],
  ["gallery-4", "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=82", lt("VIP Zone", "VIP Zone", "贵宾区", "VIP 존")],
  ["gallery-5", "https://images.unsplash.com/photo-1572116469696-31de0f17cecb?auto=format&fit=crop&w=1200&q=82", lt("Cocktail thủ công", "Crafted cocktails", "手工鸡尾酒", "크래프트 칵테일")],
  ["gallery-6", "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1200&q=82", lt("Không gian tiệc", "Party space", "派对空间", "파티 공간")],
  ["gallery-7", "https://images.unsplash.com/photo-1582806297380-49635b71900a?auto=format&fit=crop&w=1200&q=82", lt("Đêm Lumina", "Lumina night", "Lumina 之夜", "루미나 나이트")],
  ["gallery-8", "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=82", lt("Dạ tiệc", "Celebration", "庆典之夜", "셀러브레이션")]
].map(([id, image, title], sortOrder) => ({ id: id as string, image: image as string, title: title as LocalizedText, alt: title as LocalizedText, sortOrder: sortOrder + 1 }));

export const defaultPosts = [
  {
    id: "post-dj-night", slug: "special-guest-dj-night", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=84", publishedAt: "2026-08-10T01:24:00.000Z", featured: true,
    title: lt("SPECIAL GUEST DJ NIGHT: QUẨY TUNG ĐÊM HÈ", "Special Guest DJ Night: Ignite the summer", "特邀 DJ 之夜：点燃盛夏", "스페셜 게스트 DJ 나이트"),
    excerpt: lt("Đêm nhạc đặc biệt với sự góp mặt của dàn DJ đình đám hứa hẹn mang lại không gian bùng nổ chưa từng có. Tận hưởng những set nhạc Vinahouse cực căng cùng hệ thống âm thanh ánh sáng triệu đô tại 909 LUMINA.", "Guest DJs, immersive sound and a dazzling light matrix come together for one explosive night.", "特邀 DJ、沉浸式音响与绚丽灯光，共同打造热力之夜。", "게스트 DJ, 몰입형 사운드와 눈부신 조명이 폭발적인 밤을 완성합니다."),
    content: lt("Một bữa tiệc âm nhạc thực thụ đang chờ đón bạn, nơi ánh sáng, âm thanh và đam mê hòa quyện để đánh thức mọi giác quan.\n\nHệ thống âm thanh mạnh mẽ kết hợp cùng ma trận laser phong cách tương lai sẽ đưa những set EDM và house xuyên suốt màn đêm. Khách đặt bàn trước sẽ nhận ưu đãi đặc biệt cho combo đồ uống.\n\nSố lượng bàn VIP có hạn. Liên hệ hotline hoặc Zalo để giữ vị trí đẹp nhất cho hội bạn.", "A true music celebration awaits, where light, sound and energy unite to awaken every sense.\n\nOur powerful sound system and futuristic laser matrix carry house and EDM sets deep into the night. Guests who reserve early receive a special drinks-combo offer.\n\nVIP tables are limited. Contact us by hotline or Zalo to secure the best view for your group.", "一场真正的音乐盛宴正等待着您，灯光、声音与激情交织，唤醒每一种感官。\n\n强劲音响与未来感激光矩阵将整晚呈现 House 与 EDM。提前订座的客人还可享受酒水套餐优惠。\n\nVIP 座位有限，请通过热线或 Zalo 联系我们。", "빛과 사운드, 에너지가 모든 감각을 깨우는 진정한 음악 축제가 기다립니다.\n\n강력한 사운드 시스템과 미래적인 레이저 매트릭스가 밤새 하우스와 EDM을 선사합니다. 사전 예약 고객에게는 특별한 드링크 콤보 혜택이 제공됩니다.\n\nVIP 테이블은 한정되어 있습니다. 핫라인 또는 Zalo로 문의해 주세요.")
  },
  {
    id: "post-cocktail", slug: "pandora-tears-buy-one-get-one", coverImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cecb?auto=format&fit=crop&w=1400&q=84", publishedAt: "2026-08-04T12:00:00.000Z", featured: false,
    title: lt("ƯU ĐÃI ĐẶC QUYỀN: MUA 1 TẶNG 1 COCKTAIL", "Cocktail privilege: Buy one, get one", "鸡尾酒礼遇：买一赠一", "칵테일 스페셜: 1+1"),
    excerpt: lt("Thưởng thức ly Pandora Tears huyền thoại và nhận ngay ưu đãi hấp dẫn dành riêng cho khách hàng đặt bàn trước. Trải nghiệm vị giác độc đáo trong không gian phi hành tinh duy nhất tại Sài Gòn.", "Discover Pandora Tears with an exclusive reward for early reservations.", "品尝潘多拉之泪，提前预订即可享受专属礼遇。", "판도라 티어스와 사전 예약 고객만의 특별 혜택을 만나보세요."),
    content: lt("Pandora Tears là ly cocktail biểu tượng của Lumina với sắc màu biến chuyển dưới ánh đèn.\n\nƯu đãi mua một tặng một áp dụng trong khung giờ sớm và theo số lượng giới hạn mỗi ngày. Vui lòng đặt bàn trước để được xác nhận.", "Pandora Tears is Lumina's signature colour-shifting cocktail.\n\nThe buy-one-get-one offer is available during early hours in limited daily quantities. Please reserve in advance for confirmation.", "潘多拉之泪是 Lumina 标志性的变色鸡尾酒。\n\n买一赠一活动适用于早场时段，每日数量有限，请提前预订确认。", "판도라 티어스는 조명 아래 색이 변하는 루미나의 시그니처 칵테일입니다.\n\n1+1 혜택은 이른 시간대에 매일 한정 수량으로 제공되며 사전 예약이 필요합니다.")
  },
  {
    id: "post-ladies", slug: "lumina-ladies-night", coverImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1400&q=84", publishedAt: "2026-07-28T12:00:00.000Z", featured: false,
    title: lt("LADIES NIGHT: DẠ TIỆC CỦA CÁC BÓNG HỒNG", "Ladies Night at Lumina", "Lumina 女士之夜", "루미나 레이디스 나이트"),
    excerpt: lt("Thứ 4 hàng tuần là đêm vinh danh phái đẹp. Tặng ngay 1 tháp Cocktail và set trang trí bàn miễn phí cho nhóm từ 4 khách nữ. Lên đồ rực rỡ và đến 909 thả dáng nhận quà ngay.", "A radiant Wednesday with cocktail towers and special décor for groups of women.", "闪耀星期三，为女士团体准备鸡尾酒塔与专属装饰。", "여성 그룹을 위한 칵테일 타워와 스페셜 데코가 있는 수요일 밤."),
    content: lt("Mỗi tối thứ Tư, Lumina dành một không gian đặc biệt để tôn vinh phái đẹp.\n\nNhóm từ bốn khách nữ đặt bàn trước sẽ nhận quà tặng theo chương trình trong tuần. Liên hệ đội ngũ để cập nhật quyền lợi mới nhất.", "Every Wednesday, Lumina creates a special setting in celebration of women.\n\nGroups of four or more women who reserve ahead receive the week's special gift. Contact our team for current benefits.", "每周三晚，Lumina 都为女性打造特别空间。\n\n四位及以上女士提前订座，即可获得当周专属礼遇。", "매주 수요일, 루미나는 여성을 위한 특별한 공간을 준비합니다.\n\n4인 이상 여성 그룹이 사전 예약하면 해당 주의 특별 선물을 받을 수 있습니다.")
  }
];
