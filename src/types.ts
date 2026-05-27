/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Production Areas / Origin
export type OriginArea = '辽宁' | '山东' | '福建' | '河北' | '其他';

// Categories
export type CategoryType = '盐干/拉缸盐' | '鲜活海参' | '海参苗种';

// Specs (头数 / 规格)
export interface SpecGrade {
  label: string; // E.g., '30-40头/斤'
  range: [number, number]; // [min, max] head count per jin
  desc: string; // Explanation for elderly users: "精品大参，参龄长，品质极佳"
  suitability: string; // What it is best for: "送礼/高档主打"
}

// User role: Seller or Buyer
export type UserRole = '卖家（养殖户/加工厂）' | '买家（大批发商/餐饮连锁/零售品牌）';

export interface Listing {
  id: string;
  title: string;
  role: '卖家' | '买家';
  category: CategoryType;
  origin: OriginArea;
  specs: string; //规格 E.g. "30-40头/斤" or "苗种 150头/斤"
  quantity: number; // 数量 (in 斤, we can also display in 吨 for bulk)
  unit: '斤' | '吨';
  price: number | '面议'; // Price per 斤
  contactName: string;
  contactPhone: string;
  publishTime: string;
  isVerifiedShipper: boolean; // 货主实名认证 Badge
  isInspectedBase: boolean; // 基地实勘 Badge
  images: string[]; // Picture URLs (data urls or icons)
  videoUrl?: string; // Video URL indicator
  description: string;
  clicks: number;
}
