import React, { useState, useEffect } from 'react';
import { Smartphone, RefreshCw, Star, Info, Moon, Sun, Monitor, ShieldCheck, Award } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  deviceType: 'ios' | 'android';
  setDeviceType: (type: 'ios' | 'android') => void;
  isSeniorMode: boolean;
  setIsSeniorMode: (mode: boolean) => void;
}

export default function DeviceFrame({
  children,
  deviceType,
  setDeviceType,
  isSeniorMode,
  setIsSeniorMode
}: DeviceFrameProps) {
  const [currentTime, setCurrentTime] = useState('12:49');

  useEffect(() => {
    // Keep time updated or static relative to user local metadata
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-slate-900 py-6 px-4 text-white font-sans">
      {/* Platform Dashboard Header (Outside Phone) */}
      <div className="w-full max-w-lg mb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <span>👑 海参供需物联网服务平台</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          高级手机APP仿真控制端 · 50-60岁银发专属排版优化
        </p>
      </div>

      {/* Control Panel (Outside Phone) */}
      <div className="w-full max-w-md bg-slate-800 rounded-xl p-3 mb-5 border border-slate-700 flex flex-wrap gap-2 items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">📱 切换系统样式:</span>
          <button
            onClick={() => setDeviceType('ios')}
            className={`px-3 py-1 rounded transition-all font-medium ${
              deviceType === 'ios'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🍎 苹果 (iOS)
          </button>
          <button
            onClick={() => setDeviceType('android')}
            className={`px-3 py-1 rounded transition-all font-medium ${
              deviceType === 'android'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🤖 安卓 (Android)
          </button>
        </div>

        {/* Font scale view with indicator */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">👵 适老化大字模式:</span>
          <button
            onClick={() => setIsSeniorMode(!isSeniorMode)}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1 font-medium ${
              isSeniorMode
                ? 'bg-yellow-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {isSeniorMode ? '已开启【特大字】' : '点击开启【大字模式】'}
          </button>
        </div>
      </div>

      {/* Realistic Phone Shell Container */}
      <div className="relative mx-auto">
        {/* Outer Shadow Ring */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[48px] blur-md opacity-25"></div>

        {/* Smartphone Shell Body */}
        <div className="relative w-[385px] h-[785px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden">
          
          {/* Top Notch Area based on iOS / Android */}
          {deviceType === 'ios' ? (
            /* iOS Dynamic Island */
            <div className="absolute top-[14px] left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3 text-[10px] text-white/90">
              <div className="w-1.5 h-1.5 bg-blue-900 rounded-full border border-blue-500/50"></div>
              <div className="text-[8px] text-yellow-400 font-bold">● LIVE</div>
              <div className="w-1 h-1 bg-neutral-800 rounded-full"></div>
            </div>
          ) : (
            /* Android Single Hole-punch */
            <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-900 rounded-full"></div>
            </div>
          )}

          {/* Device Side Volume Buttons (Visual Decoration) */}
          <div className="absolute -left-1.5 top-28 w-1 h-10 bg-slate-600 rounded-r"></div>
          <div className="absolute -left-1.5 top-40 w-1 h-10 bg-slate-600 rounded-r"></div>
          <div className="absolute -right-1.5 top-32 w-1 h-14 bg-slate-600 rounded-l"></div>

          {/* Internal Mobile Content viewport */}
          <div className="w-full h-full bg-white text-slate-900 rounded-[35px] overflow-hidden flex flex-col relative">
            
            {/* Custom Status Bar within the screen */}
            <div className={`w-full px-5 pt-3 pb-1 flex justify-between items-center text-xs select-none ${
              deviceType === 'ios' ? 'h-10 pt-4 bg-blue-900 text-white' : 'h-8 bg-zinc-150 text-slate-700'
            }`}>
              {/* Time display: left on iOS, right on Android */}
              {deviceType === 'ios' ? (
                <span className="font-bold tracking-tight text-[11px]">{currentTime}</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1 bg-emerald-100 text-emerald-800 rounded font-bold">5G</span>
                  <span className="text-[10px] text-slate-500">中国电信</span>
                </div>
              )}

              {/* Status Icons: Signal strength, Wifi, Battery percentage */}
              <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                <span>📶 满格</span>
                <span>📶 LTE</span>
                <span>🔋 100%</span>
                {deviceType === 'android' && (
                  <span className="ml-1 text-[11px] font-bold text-slate-800">{currentTime}</span>
                )}
              </div>
            </div>

            {/* Inner view container */}
            <div className="flex-1 w-full overflow-y-auto bg-slate-50 flex flex-col relative select-none">
              {children}
            </div>

            {/* Physical home pill indicator at bottom for swipe */}
            <div className="w-full py-1 text-center bg-white flex justify-center items-center h-4 border-t border-slate-100 shrink-0 z-40">
              {deviceType === 'ios' ? (
                <div className="w-28 h-1 bg-slate-300 rounded-full mt-0.5"></div>
              ) : (
                <div className="flex items-center justify-around w-full px-12 text-slate-400 text-sm py-0.5">
                  <span>◀</span>
                  <span>●</span>
                  <span>■</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Help Instructions for Age 50-60 (Outside container) */}
      <div className="w-full max-w-md mt-6 bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-slate-300 text-xs space-y-2">
        <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5 border-b border-slate-700 pb-1.5">
          <Info size={14} className="text-blue-400" />
          💡 50-60岁银发用户友好设计说明：
        </h3>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
          <li><strong>一键切换大字模式</strong>：点击上方黄色按钮，全屏字体、选择框和操作按钮将成倍放大，保障老花眼看得清、点得准。</li>
          <li><strong>官方严谨蓝白风</strong>：界面摒弃任何轻浮、花哨和娱乐化的颜色。采用<b>深海蓝</b>与<b>纯白</b>，极简布局类似于手机银行和电子保单。</li>
          <li><strong>产地产区与头数直通筛选</strong>：针对习惯“斤数与头数”（一斤多少只）的特征，直观展示规格计算指南，支持一键锁定辽、鲁、粤、冀、闽重点好参。</li>
          <li><strong>一键生成微信二维码图片海报</strong>：为方便老年人发到采购微信群，点击宝贝可实时渲染出包含联系电话、照片、吨数的精美图片长图。</li>
        </ul>
      </div>
    </div>
  );
}
