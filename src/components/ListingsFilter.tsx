import React from 'react';
import { OriginArea, CategoryType } from '../types';
import { Filter, MapPin, Layers } from 'lucide-react';

interface ListingsFilterProps {
  selectedCategory: CategoryType | '全部';
  setSelectedCategory: (cat: CategoryType | '全部') => void;
  selectedOrigin: OriginArea | '全部';
  setSelectedOrigin: (area: OriginArea | '全部') => void;
  selectedSpec: string | '全部';
  setSelectedSpec: (spec: string | '全部') => void;
  isSeniorMode: boolean;
}

export default function ListingsFilter({
  selectedCategory,
  setSelectedCategory,
  selectedOrigin,
  setSelectedOrigin,
  selectedSpec,
  setSelectedSpec,
  isSeniorMode
}: ListingsFilterProps) {

  const categories: (CategoryType | '全部')[] = ['全部', '盐干/拉缸盐', '鲜活海参', '海参苗种'];
  const origins: (OriginArea | '全部')[] = ['全部', '辽宁', '山东', '福建', '河北', '其他'];

  return (
    <div className="bg-slate-50 border-b border-slate-200">
      
      {/* Production origins (Liaoning, Shandong, Fujian, Hebei, Others) */}
      <div className="p-3 border-b border-slate-200 bg-white">
        <div className="text-[12px] text-slate-500 mb-1.5 flex items-center gap-1 font-medium">
          <MapPin size={13} className="text-blue-700" />
          <span><b>主产地筛选：</b>全国核心产区直供</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {origins.map((org) => {
            const isActive = selectedOrigin === org;
            return (
              <button
                key={org}
                onClick={() => setSelectedOrigin(org)}
                className={`px-3 py-1.5 rounded-lg border text-center transition-all font-bold ${
                  isActive
                    ? 'bg-blue-50 text-blue-950 border-blue-600 font-extrabold shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                } ${isSeniorMode ? 'text-[16px] px-4 py-2' : 'text-[13px]'}`}
              >
                {org === '全部' ? '全部产地' : `${org}产区`}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
