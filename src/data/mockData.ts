import { Listing, SpecGrade } from '../types';

export const SPEC_GRADES: SpecGrade[] = [
  {
    label: '20-30头/斤',
    range: [20, 30],
    desc: '【极稀有】超特大规格 参龄5年以上',
    suitability: '高端滋补礼盒 / 专业药膳'
  },
  {
    label: '30-40头/斤',
    range: [30, 40],
    desc: '【精品】特大规格 肉厚刺挺 泡发率极佳',
    suitability: '高端送礼 / 星级酒店主打'
  },
  {
    label: '40-50头/斤',
    range: [40, 50],
    desc: '【推荐】大规格 畅销之王 营养饱满',
    suitability: '宴请送礼 / 优质养生选择'
  },
  {
    label: '50-70头/斤',
    range: [50, 70],
    desc: '【家常】中规格 经济实惠 滋补常用',
    suitability: '日常家用 / 家庭滋补装'
  },
  {
    label: '70-100头/斤',
    range: [70, 100],
    desc: '【实惠】小规格 质优价低 日常养生',
    suitability: '性价比之王 / 快消餐饮'
  },
  {
    label: '100头以上/斤',
    range: [100, 999],
    desc: '【微型/幼苗】用于煲粥或参苗养殖',
    suitability: '日常烹饪原料 / 幼苗繁育'
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'LST-001',
    title: '辽宁大连长海县自家海域纯淡干海参 35头 现货直发',
    role: '卖家',
    category: '盐干/拉缸盐',
    origin: '辽宁',
    specs: '30-40头/斤',
    quantity: 2600,
    unit: '斤',
    price: 3200,
    contactName: '王建国（长海张网养殖场）',
    contactPhone: '13941108899',
    publishTime: '2026-05-26 10:15',
    isVerifiedShipper: true,
    isInspectedBase: true,
    images: [], // We will render nice fallbacks based on category
    description: '纯野生深海捕捞，长海县底播淡干。刺排挺拔，肉质肥厚饱满，无添加糖盐。泡发率12-15倍以上，可现场验货，量大从优。支持全国货到付款！',
    clicks: 148
  },
  {
    id: 'LST-002',
    title: '急寻辽宁或山东1.5两-2两规格鲜活海参 5000斤 长期采购',
    role: '买家',
    category: '鲜活海参',
    origin: '辽宁',
    specs: '30-40头/斤',
    quantity: 5000,
    unit: '斤',
    price: '面议',
    contactName: '大连高新海味大批发商行（刘经理）',
    contactPhone: '13304117766',
    publishTime: '2026-05-26 11:30',
    isVerifiedShipper: true,
    isInspectedBase: false,
    images: [],
    description: '我司因中秋备货，现大量采购鲜活海参，要求大小均匀，参龄3年以上。如果是大连或威海货源，可自行派车前往捕捞基地提货。价格看货面议，打款爽快，期待长期合作。',
    clicks: 204
  },
  {
    id: 'LST-003',
    title: '山东威海环翠区拉缸盐海参 45头 货源足 品质硬',
    role: '卖家',
    category: '盐干/拉缸盐',
    origin: '山东',
    specs: '40-50头/斤',
    quantity: 12000,
    unit: '斤',
    price: 1350,
    contactName: '威海荣达海洋食品（张明总经理）',
    contactPhone: '18663112233',
    publishTime: '2026-05-26 09:40',
    isVerifiedShipper: true,
    isInspectedBase: true,
    images: [],
    description: '威海核心海产区拉缸盐海参，肉质Q弹，个头整齐，已经全部拉缸盐固化处理。参刺完整，表皮无破损。专供各大酒店连锁及二批商。手续齐全，放心购买。',
    clicks: 89
  },
  {
    id: 'LST-004',
    title: '福建霞浦优质春季出海鲜活冬参 活体空运 批发出售',
    role: '卖家',
    category: '鲜活海参',
    origin: '福建',
    specs: '30-40头/斤',
    quantity: 8500,
    unit: '斤',
    price: 185,
    contactName: '霞浦南方海参养殖合作社（林东华）',
    contactPhone: '13859312211',
    publishTime: '2026-05-26 08:20',
    isVerifiedShipper: true,
    isInspectedBase: true,
    images: [],
    description: '福建霞浦吊笼大丰收，春季肥美海参刚上市。个头大（一斤3-4只），肉质厚实弹牙。现挖即发，急冻打冷链运送全国，保证成活率，坏参包赔！',
    clicks: 167
  },
  {
    id: 'LST-005',
    title: '河北秦皇岛秋季海参苗种 规格120-150头 一流成活率',
    role: '卖家',
    category: '海参苗种',
    origin: '河北',
    specs: '100头以上/斤',
    quantity: 35000,
    unit: '斤',
    price: 68,
    contactName: '秦皇岛昌黎育苗基地（徐福江）',
    contactPhone: '13703358899',
    publishTime: '2026-05-25 15:50',
    isVerifiedShipper: true,
    isInspectedBase: true,
    images: [],
    description: '北戴河海区天然原种繁育，苗种体壮。经过耐低温与耐高温双重筛选，病害极少。适合山东、辽宁海域和福建吊笼养殖。提供技术指导，包全国运输。',
    clicks: 312
  },
  {
    id: 'LST-006',
    title: '急收大批量福建吊笼海鲜活参 专车急发 现结',
    role: '买家',
    category: '鲜活海参',
    origin: '福建',
    specs: '50-70头/斤',
    quantity: 20000,
    unit: '斤',
    price: '面议',
    contactName: '广州黄沙水产大市场豪哥海鲜部',
    contactPhone: '13902224455',
    publishTime: '2026-05-25 10:00',
    isVerifiedShipper: true,
    isInspectedBase: false,
    images: [],
    description: '长期收购福建鲜活大参，拉回广东市场做批发。每天消耗量大，价格跟市走。养殖户有货请尽快联系，现结不拖欠！实地称重当场打款！',
    clicks: 450
  }
];
