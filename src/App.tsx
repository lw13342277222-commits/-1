import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  PlusCircle, 
  User, 
  MapPin, 
  Phone, 
  Search, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Tag, 
  Video, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Calculator, 
  CheckCircle2, 
  BookOpen,
  Image as ImageIcon,
  Home,
  LogOut
} from 'lucide-react';

import { Listing, CategoryType, OriginArea } from './types';
import { INITIAL_LISTINGS, SPEC_GRADES } from './data/mockData';
import DeviceFrame from './components/DeviceFrame';
import ListingsFilter from './components/ListingsFilter';
import PosterModal from './components/PosterModal';

function SeaCucumberIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="sc-grad" x1="10" y1="20" x2="54" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde047" /> {/* yellow-300 */}
          <stop offset="40%" stopColor="#eab308" /> {/* yellow-500 */}
          <stop offset="80%" stopColor="#ca8a04" /> {/* yellow-600 */}
          <stop offset="100%" stopColor="#854d0e" /> {/* yellow-900 */}
        </linearGradient>
      </defs>
      
      {/* Outer subtle glow background */}
      <circle cx="32" cy="32" r="28" fill="currentColor" fillOpacity="0.08" className="text-amber-500/15" />

      {/* Main Sea Cucumber Body - Curved Luxury Organic Form */}
      <path 
        d="M14 36 C11 25, 17 18, 30 16 C43 14, 53 19, 55 27 C57 35, 49 42, 36 44 C22 46, 16 44, 14 36 Z" 
        fill="url(#sc-grad)" 
        stroke="#713f12" 
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Elegant, high-end organic papillae / thorns */}
      {/* Backdrop contour thorns crossing the top edge to create immediate recognizability */}
      <path d="M19 17 C19 12, 22 12, 22 17" fill="url(#sc-grad)" stroke="#854d0e" strokeWidth="1.2" />
      <path d="M29 15 C29 9, 32 9, 32 15" fill="url(#sc-grad)" stroke="#854d0e" strokeWidth="1.2" />
      <path d="M40 16 C40 10, 43 10, 43 16" fill="url(#sc-grad)" stroke="#854d0e" strokeWidth="1.2" />
      <path d="M49 20 C49 15, 51 15, 51 20" fill="url(#sc-grad)" stroke="#854d0e" strokeWidth="1.2" />

      {/* Main body 3D dimensional gold thorn highlights */}
      {/* Row 1 - Upper shine */}
      <path d="M18 26 L20 20 L23 26" fill="#fef08a" stroke="#a16207" strokeWidth="0.8" />
      <path d="M28 24 L30 18 L33 24" fill="#fef08a" stroke="#a16207" strokeWidth="0.8" />
      <path d="M38 24 L40 18 L43 24" fill="#fef08a" stroke="#a16207" strokeWidth="0.8" />
      <path d="M47 26 L49 21 L51 26" fill="#fef08a" stroke="#a16207" strokeWidth="0.8" />

      {/* Row 2 - Center gold spikes */}
      <path d="M22 34 L25 28 L27 34" fill="#fbbf24" stroke="#854d0e" strokeWidth="1" />
      <path d="M32 33 L35 27 L37 33" fill="#fbbf24" stroke="#854d0e" strokeWidth="1" />
      <path d="M42 32 L45 26 L47 32" fill="#fbbf24" stroke="#854d0e" strokeWidth="1" />

      {/* Row 3 - Lower deep gold spikes */}
      <path d="M16 38 L18 34 L21 38" fill="#d97706" />
      <path d="M27 40 L29 36 L31 40" fill="#d97706" />
      <path d="M37 39 L39 35 L41 39" fill="#d97706" />

      {/* Premium quality stars decoration indicating state-run guaranteed wild sea cucumber */}
      <path d="M52 10 L54 7 L56 10 L59 10 L56 12 L58 15 L54 13 L51 15 L53 12 L50 10 Z" fill="#fbbf24" />
      <circle cx="46" cy="7" r="1" fill="#f59e0b" />
      <circle cx="57" cy="18" r="1.2" fill="#f59e0b" />
    </svg>
  );
}

export default function App() {
  // Simulator configuration
  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('ios');
  const [isSeniorMode, setIsSeniorMode] = useState<boolean>(false); // Disabled by default for standard professional look

  // App states
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | '全部'>('全部');
  const [selectedOrigin, setSelectedOrigin] = useState<OriginArea | '全部'>('全部');
  const [selectedSpec, setSelectedSpec] = useState<string | '全部'>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'hall' | 'publish' | 'profile'>('hall');
  const [selectedListingDetail, setSelectedListingDetail] = useState<Listing | null>(null);
  const [showPosterForListing, setShowPosterForListing] = useState<Listing | null>(null);

  // New Listing Form state
  const [newRole, setNewRole] = useState<'卖家' | '买家'>('卖家');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('盐干/拉缸盐');
  const [newOrigin, setNewOrigin] = useState<OriginArea>('辽宁');
  const [newSpecs, setNewSpecs] = useState('30-40');
  const [newQuantity, setNewQuantity] = useState<number>(1000);
  const [newUnit, setNewUnit] = useState<'斤' | '吨'>('斤');
  const [newPrice, setNewPrice] = useState<string>('2400');
  const [newPriceIsNegotiable, setNewPriceIsNegotiable] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [requestVerify, setRequestVerify] = useState(true);
  const [requestInspected, setRequestInspected] = useState(true);

  // Real-time Calculator tool state
  const [calcJins, setCalcJins] = useState<string>('1500');
  const [calcPricePerJin, setCalcPricePerJin] = useState<string>('2600');
  const [calcResultTons, setCalcResultTons] = useState<number>(0.75);
  const [calcResultTotal, setCalcResultTotal] = useState<number>(390000);

  // Pre-filled forms helper
  const [prefilledMessage, setPrefilledMessage] = useState<string | null>(null);

  // Custom persistent states for Sandboxed previews (replaces native alert/confirm blocks)
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    // Auto-clear after 3 seconds
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  // Account authorization state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginTab, setLoginTab] = useState<'wechat' | 'phone-manual'>('wechat');
  const [loginPhone, setLoginPhone] = useState<string>('13941108899');
  const [loginCode, setLoginCode] = useState<string>('');
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Initialize data with local persistence
  useEffect(() => {
    const saved = localStorage.getItem('haishen_listings');
    if (saved) {
      try {
        setListings(JSON.parse(saved));
      } catch (e) {
        setListings(INITIAL_LISTINGS);
      }
    } else {
      setListings(INITIAL_LISTINGS);
    }
  }, []);

  const saveListings = (updated: Listing[]) => {
    setListings(updated);
    localStorage.setItem('haishen_listings', JSON.stringify(updated));
  };

  // Helper calculation
  useEffect(() => {
    const jins = parseFloat(calcJins) || 0;
    const price = parseFloat(calcPricePerJin) || 0;
    setCalcResultTons(Number((jins / 2000).toFixed(3)));
    setCalcResultTotal(jins * price);
  }, [calcJins, calcPricePerJin]);

  // Handle Publishing
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('请填写货源/需求标题');
      return;
    }
    if (!newContactName.trim()) {
      alert('请填写联系人姓名');
      return;
    }
    if (!newContactPhone.trim()) {
      alert('请填写手机号码');
      return;
    }

    const finalSpecs = newSpecs.endsWith('头/斤') 
      ? newSpecs 
      : (newSpecs.endsWith('头') ? `${newSpecs}/斤` : `${newSpecs}头/斤`);

    const newListing: Listing = {
      id: `LST-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      role: newRole,
      category: newCategory,
      origin: newOrigin,
      specs: finalSpecs,
      quantity: Number(newQuantity) || 0,
      unit: newUnit,
      price: newPriceIsNegotiable ? '面议' : (Number(newPrice) || '面议'),
      contactName: newContactName,
      contactPhone: newContactPhone,
      publishTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isVerifiedShipper: requestVerify,
      isInspectedBase: requestInspected,
      images: newImages.length > 0 ? newImages : [],
      videoUrl: newVideoUrl ? newVideoUrl : undefined,
      description: newDescription || `${newOrigin}产区优质${newCategory}，规格${finalSpecs}，大货直发亲民价，欢迎洽谈采购。`,
      clicks: 1
    };

    const updated = [newListing, ...listings];
    saveListings(updated);
    
    // Clear form
    setNewTitle('');
    setNewContactName('');
    setNewContactPhone('');
    setNewDescription('');
    setNewImages([]);
    setNewVideoUrl('');
    setPrefilledMessage('信息发布成功！正在为您生成官方防伪号并更新大厅大盘列表！');
    
    // Auto redirect to hall
    setTimeout(() => {
      setPrefilledMessage(null);
      setActiveTab('hall');
    }, 2000);
  };

  // Quick Mock Image attachment for elderly user simulated cameras
  const sampleSeaCucumberImages = [
    {
      name: '特等干海参实拍',
      url: 'https://images.unsplash.com/photo-1534080391025-a77c4e7240f8?q=80&w=300&auto=format&fit=crop',
    },
    {
      name: '深海捞捕鲜活参',
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop',
    },
    {
      name: '育苗厂实拍苗子',
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300&auto=format&fit=crop',
    }
  ];

  const handleAttachPredefinedImage = (url: string) => {
    if (newImages.includes(url)) {
      setNewImages(newImages.filter(item => item !== url));
    } else {
      setNewImages([...newImages, url]);
    }
  };

  // Filter listings based on controls
  const filteredListings = listings.filter(item => {
    const matchCat = selectedCategory === '全部' || item.category === selectedCategory;
    const matchOrg = selectedOrigin === '全部' || item.origin === selectedOrigin;
    const matchSpec = selectedSpec === '全部' || item.specs === selectedSpec;
    const matchSearch = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchOrg && matchSpec && matchSearch;
  });

  // Handle simulation dialing
  const [dialingPhone, setDialingPhone] = useState<string | null>(null);
  const handleDial = (phone: string, name: string) => {
    setDialingPhone(phone);
    setTimeout(() => {
      setDialingPhone(null);
    }, 3500);
  };

  return (
    <DeviceFrame
      deviceType={deviceType}
      setDeviceType={setDeviceType}
      isSeniorMode={isSeniorMode}
      setIsSeniorMode={setIsSeniorMode}
    >
      {/* APP Container */}
      <div className="flex flex-col h-full bg-slate-100 selection:bg-blue-200">
        
        {/* Status Toast Notification */}
        {prefilledMessage && (
          <div className="absolute top-12 left-4 right-4 bg-emerald-950 border-2 border-emerald-400 text-emerald-100 p-3 rounded-xl shadow-2xl z-[101] text-center animate-bounce flex items-center justify-center gap-2 font-bold">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
            <span className={`${isSeniorMode ? 'text-lg' : 'text-xs'}`}>{prefilledMessage}</span>
          </div>
        )}

        {/* Dialing Simulator Overlay */}
        {dialingPhone && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center text-white z-[120] p-6 text-center animate-in fade-in duration-200">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full flex items-center justify-center p-4.5 font-black mb-6 animate-pulse">
              <SeaCucumberIcon className="w-14 h-14 text-white" />
            </div>
            <p className="text-sm tracking-widest text-slate-400 font-bold uppercase mb-1">正在模拟呼叫海参直供基地...</p>
            <h3 className="text-3xl font-black text-white tracking-wider mb-2">{dialingPhone}</h3>
            <p className="text-[15px] text-slate-300 bg-blue-950 px-4 py-1.5 rounded-full border border-blue-800">
              国家级海参供需防伪网络安全通话中
            </p>
            <div className="mt-12 text-slate-500 text-xs flex items-center gap-2 justify-center">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              <span>由于处于沙盒预览，此呼叫已转为安全数字仿真专线。</span>
            </div>
          </div>
        )}

        {/* Login Validation Layer */}
        {!isLoggedIn ? (
          <div className="flex-1 flex flex-col justify-between bg-[#041126] text-slate-100 p-5 overflow-y-auto w-full">
            {/* Top Logo and Header */}
            <div className="flex flex-col items-center text-center pt-8">
              <div className="w-16 h-16 bg-blue-950/80 border-2 border-yellow-400 rounded-full flex items-center justify-center p-3.5 shadow-xl mb-4 animate-bounce">
                <SeaCucumberIcon className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-white animate-fade-in">海参直采供求 认证交易大盘</h2>
              <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-1">
                辽 · 鲁 · 闽 · 冀 官方保障交易终端
              </p>
              <div className="w-16 h-1 bg-amber-500 rounded-full mt-3"></div>
            </div>

            {/* Main Form Box */}
            <div className="my-auto py-4 space-y-4 max-w-lg mx-auto w-full">
              {/* Login Method Toggle Tabs */}
              <div className="grid grid-cols-2 gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setLoginTab('wechat');
                    setLoginPhone('13941108899');
                    setLoginCode('');
                    setCountdown(0);
                  }}
                  className={`py-2 px-1 text-[10.5px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
                    loginTab === 'wechat'
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <span>微信登录</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginTab('phone-manual');
                    setLoginPhone('');
                    setLoginCode('');
                    setCountdown(0);
                  }}
                  className={`py-2 px-1 text-[10.5px] font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
                    loginTab === 'phone-manual'
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <span>手机手动验证</span>
                </button>
              </div>

              {loginTab === 'wechat' && (
                /* WeChat Quick Direct Login (No code required) */
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl text-center space-y-5 animate-in fade-in duration-200">
                  <div className="py-2 flex flex-col items-center justify-center">
                    <h3 className="text-[14px] font-black text-white">微信直接安全快速登录</h3>
                    <p className="text-[10.5px] text-slate-400 mt-1 font-medium leading-relaxed">
                      微信快捷直联：免短信密码校验，直接进入辽、鲁、闽、冀联合海参直营大堂
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setActiveTab('hall');
                      setPrefilledMessage('微信快捷登录成功！');
                      setTimeout(() => setPrefilledMessage(null), 3000);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] text-slate-950 font-black rounded-xl text-[13px] shadow-lg shadow-emerald-500/10 transition-transform flex items-center justify-center gap-2 border border-emerald-400/20"
                  >
                    <span>微信一键直接安全登录</span>
                  </button>
                </div>
              )}

              {loginTab === 'phone-manual' && (
                /* Phone Manual Login & Verification (Full Manual flow) */
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 mb-1.5 flex items-center gap-1">
                      <span className="text-blue-400">●</span> 手动输入手机号
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={loginPhone === '13941108899' ? '' : loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="请输入您的 11 位手机号码"
                        maxLength={11}
                        className="w-full px-4 py-2.5 bg-slate-950/85 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-yellow-400 font-mono tracking-wider"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 mb-1.5 flex items-center gap-1">
                      <span className="text-blue-400">●</span> 输入验证码
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={loginCode}
                          onChange={(e) => setLoginCode(e.target.value)}
                          placeholder="4位数字验证码"
                          maxLength={4}
                          className="w-full px-4 py-2.5 bg-slate-950/85 border border-slate-800 rounded-xl text-sm font-bold text-white tracking-widest focus:outline-none focus:border-yellow-400 font-mono"
                        />
                      </div>
                      
                      <button
                        type="button"
                        disabled={countdown > 0}
                        onClick={() => {
                          if (!loginPhone || loginPhone.length < 11 || loginPhone === '13941108899') {
                            triggerToast('请手动输入正确的11位验证手机号码');
                            return;
                          }
                          setCountdown(60);
                          const code = String(Math.floor(1000 + Math.random() * 9000));
                          setLoginCode(code);
                          triggerToast(`防伪短信已向 ${loginPhone} 发送，请查看下方通知`);
                        }}
                        className={`px-3 text-xs font-black rounded-xl transition-all shrink-0 ${
                          countdown > 0 
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:brightness-105 active:scale-95'
                        }`}
                      >
                        {countdown > 0 ? `${countdown}秒后重新发` : '发送验证码'}
                      </button>
                    </div>
                  </div>

                  {/* Simulated Sandbox Text Alert for ease of use in visual tests */}
                  {(countdown > 0 || loginCode) && (
                    <div className="bg-amber-950/45 border border-amber-500/20 rounded-xl p-3 text-[10.5px] text-amber-200/90 leading-relaxed animate-pulse space-y-1">
                      <p className="font-extrabold text-amber-400 flex items-center gap-1">
                        <span>📲 收到验证短信通知：</span>
                      </p>
                      <p>【防伪海参绑定】您的验证码为 <b className="text-yellow-400 font-mono text-sm font-black tracking-wider">{loginCode || '发送中...'}</b>，请手动输入此验证码验证登录。</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (!loginPhone || loginPhone.length < 11) {
                        triggerToast('请先输入手动联络手机号');
                        return;
                      }
                      if (!loginCode || loginCode.length < 4) {
                        triggerToast('请输入收到的4位验证码');
                        return;
                      }
                      setIsLoggedIn(true);
                      setActiveTab('hall');
                      setPrefilledMessage(`手机号 ${loginPhone} 手动验证成功，登录进入大盘！`);
                      setTimeout(() => setPrefilledMessage(null), 3000);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 active:scale-[0.98] text-slate-950 font-black rounded-xl text-[13px] shadow-lg flex items-center justify-center gap-2 border border-yellow-400/25 transition-all"
                  >
                    <span>验证短信验证码并手动登录</span>
                  </button>
                </div>
              )}
            </div>

            {/* Security Banner */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 max-w-lg mx-auto w-full text-[10.5px] text-amber-200/90 leading-relaxed grid grid-cols-1 gap-1.5 border-dashed">
              <p className="font-extrabold text-amber-400 flex items-center gap-1 text-xs">
                👵🏼 安全登录保障保障规制：
              </p>
              <p>1. <b>微信便捷登录</b>：微信账号快捷直接登录。</p>
              <p>2. <b>手机手动验证</b>：您可自行键入手机号码获取核虚校验验证码登记登录。</p>
            </div>

            {/* Bottom Footer */}
            <div className="text-center text-[10px] text-slate-500 pb-2 space-y-0.5 pt-4">
              <p>数字渔业防伪科技管理委员会 · 联合安全技术支持</p>
              <p>通信服务由 官方直营海参互联保真网 认证分配</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top Header of the Mini-App */}
            <header className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white shrink-0 shadow-md">
          {/* Main Title bar & Senior Mode Indicator */}
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div>
                <h1 className={`font-black tracking-tight leading-none ${isSeniorMode ? 'text-[18px]' : 'text-[15px]'}`}>
                  海参直采供求
                </h1>
                <p className="text-[9px] text-blue-200 uppercase tracking-widest">
                  辽 鲁 闽 冀 官方保障交易大盘
                </p>
              </div>
            </div>

            {/* Senior font indicator */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-yellow-300 font-bold bg-amber-950 rounded px-1.5 py-0.5 border border-amber-800">
                {isSeniorMode ? '👵 超大老花字已开' : '标准小字'}
              </span>
            </div>
          </div>

        </header>

        {/* Main Interactive Screen Router */}
        <main className="flex-1 overflow-y-auto debug-scrollbar">
          
          {selectedListingDetail ? (
            /* ================== DETAILED VIEW ================== */
            <div className="p-4 bg-white min-h-full space-y-4">
              {/* Back Button */}
              <button
                onClick={() => setSelectedListingDetail(null)}
                className="inline-flex items-center gap-1 text-blue-950 font-bold bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl border border-slate-300 transition-all text-[15px]"
              >
                <ChevronLeft size={18} />
                <span>返回供求大厅</span>
              </button>

              {/* Title Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded font-black text-white ${
                    selectedListingDetail.role === '卖家' ? 'bg-orange-600' : 'bg-blue-700'
                  } ${isSeniorMode ? 'text-sm' : 'text-xs'}`}>
                    {selectedListingDetail.role === '卖家' ? '出货现货' : '采购寻源'}
                  </span>
                  <span className="text-slate-500 font-mono text-xs">单号: {selectedListingDetail.id}</span>
                </div>
                <h2 className={`font-black text-slate-900 leading-snug mt-1 ${isSeniorMode ? 'text-xl' : 'text-[17px]'}`}>
                  {selectedListingDetail.title}
                </h2>
              </div>

              {/* Verified Badges Frame */}
              <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl flex flex-col gap-2">
                <span className="text-[12px] text-blue-900 font-extrabold flex items-center gap-1">
                  🛡️ 本条信息官方保障等级:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedListingDetail.isVerifiedShipper ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-950 text-xs font-black rounded-lg border border-blue-200">
                      <ShieldCheck size={14} className="text-blue-950" />
                      货主实名已认证 ✅
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg border border-slate-200">
                      普通实名
                    </span>
                  )}

                  {selectedListingDetail.isInspectedBase ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-950 text-xs font-black rounded-lg border border-emerald-200">
                      <Award size={14} className="text-emerald-950" />
                      基地实勘已核验 ✅
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg border border-slate-200">
                      未申请实勘
                    </span>
                  )}
                </div>
              </div>

              {/* Spec Display box */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">规格(头/斤)</span>
                  <span className={`font-black text-blue-950 ${isSeniorMode ? 'text-lg' : 'text-[15px]'}`}>
                    {selectedListingDetail.specs}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">产地源头</span>
                  <span className={`font-black text-blue-950 ${isSeniorMode ? 'text-lg' : 'text-[15px]'}`}>
                    {selectedListingDetail.origin}产区
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">货源数量</span>
                  <span className={`font-black text-rose-700 ${isSeniorMode ? 'text-lg' : 'text-[15px]'}`}>
                    {selectedListingDetail.quantity} {selectedListingDetail.unit}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-bold">指导价格</span>
                  <span className={`font-black text-rose-700 ${isSeniorMode ? 'text-lg' : 'text-[15px]'}`}>
                    {typeof selectedListingDetail.price === 'number' 
                      ? `${selectedListingDetail.price}元/斤` 
                      : '面议'}
                  </span>
                </div>
              </div>

              {/* Interactive Audio/Video Attachment if any */}
              {selectedListingDetail.images.length > 0 || selectedListingDetail.videoUrl ? (
                <div className="space-y-2">
                  <span className="text-[12px] font-bold text-slate-600 block">📹 货品现场音影与图片：</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedListingDetail.images.map((img, idx) => (
                      <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-300">
                        <img src={img} alt="sea cucumber photo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] text-center font-bold">图片 #{idx+1}</span>
                      </div>
                    ))}
                    {selectedListingDetail.videoUrl && (
                      <div className="w-24 h-24 rounded-lg bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-center p-1 text-slate-300 shrink-0 relative">
                        <Video size={24} className="text-yellow-400" />
                        <span className="text-[10px] font-bold mt-1 max-w-full truncate">{selectedListingDetail.videoUrl}</span>
                        <span className="absolute top-1 right-1 bg-yellow-500 text-slate-900 text-[8px] px-1 font-bold rounded">微视频</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Fallback Nice visual badge for item category icon when no images were uploaded */
                <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center text-2xl">
                    {selectedListingDetail.category === '盐干/拉缸盐' ? '🪵' : selectedListingDetail.category === '鲜活海参' ? '🐟' : '🌱'}
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">货源品类：{selectedListingDetail.category}</span>
                    <span className="text-xs text-slate-700 font-bold">货主已经通过现场检验，品质一等</span>
                  </div>
                </div>
              )}

              {/* Detailed statement */}
              <div className="space-y-1 border-t border-slate-150 pt-3">
                <span className="text-[12px] text-slate-500 block font-bold">货源详情描述：</span>
                <p className={`leading-relaxed text-slate-850 bg-slate-50 p-3 rounded-2xl border border-slate-200 font-normal ${
                  isSeniorMode ? 'text-[16px]' : 'text-sm'
                }`}>
                  {selectedListingDetail.description}
                </p>
              </div>

              {/* Big Golden Contact Box for Elder users */}
              <div className="bg-amber-500 rounded-2xl p-4 text-slate-950 space-y-3 shadow-md border-2 border-amber-600">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full uppercase">
                      联系人信息
                    </span>
                    <h4 className="text-lg font-black mt-1">{selectedListingDetail.contactName}</h4>
                    <p className="text-xs opacity-90">大连/威海直采平台 认证商</p>
                  </div>
                  <Clock size={40} className="opacity-15 font-light" />
                </div>

                <div className="border-t border-amber-600/40 pt-2 flex flex-col gap-2">
                  {/* Phone Call CTA */}
                  <button
                    onClick={() => handleDial(selectedListingDetail.contactPhone, selectedListingDetail.contactName)}
                    className="w-full py-3 bg-slate-950 hover:bg-slate-900 active:bg-slate-800 text-yellow-400 font-black rounded-xl text-md flex items-center justify-center gap-2 shadow"
                  >
                    <Phone size={18} />
                    <span>立刻一键拨打电话: {selectedListingDetail.contactPhone}</span>
                  </button>

                  {/* Share Poster CTA */}
                  <button
                    onClick={() => setShowPosterForListing(selectedListingDetail)}
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-[14px] flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={16} className="text-yellow-300" />
                    <span>生成“高清微信图公文包”发群里</span>
                  </button>
                </div>
              </div>

              {/* Footer details info */}
              <div className="text-slate-400 text-[10px] text-center">
                发布日期: {selectedListingDetail.publishTime} · 已审核核验 · 总点击 {selectedListingDetail.clicks} 次
              </div>
            </div>
          ) : activeTab === 'hall' ? (
            /* ================== TAB 1: SOURCING HALL ================== */
            <div className="flex flex-col min-h-full">
              
              {/* Search Bar Block */}
              <div className="p-3 bg-blue-950 text-white space-y-2">
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="输入产地、货主、防伪号搜索..."
                    className="w-full bg-slate-900 text-white placeholder-slate-400 rounded-xl pl-10 pr-9 py-2 border-2 border-slate-700 focus:border-blue-500 font-bold focus:outline-none"
                    style={{ fontSize: isSeniorMode ? '16px' : '13px' }}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Comprehensive Filter Segment */}
              <ListingsFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedOrigin={selectedOrigin}
                setSelectedOrigin={setSelectedOrigin}
                selectedSpec={selectedSpec}
                setSelectedSpec={setSelectedSpec}
                isSeniorMode={isSeniorMode}
              />

              {/* Sourcing Listings Counts & Order */}
              <div className="px-4 py-2 bg-slate-200 text-slate-700 flex justify-between items-center text-xs font-bold border-y border-slate-300">
                <span>📊 当前筛选结果: {filteredListings.length} 条货源</span>
                <span className="text-blue-900 font-extrabold flex items-center gap-0.5">
                  🛡️ 资金安全 · 官方防伪已开启
                </span>
              </div>

              {/* Empty state list helper */}
              {filteredListings.length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-white flex-1">
                  <div className="text-4xl text-slate-300">🔍</div>
                  <h3 className="text-lg font-bold text-slate-800">没有找到匹配海参信息</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    您搜索或筛选的 <b>[{selectedOrigin !== '全部' ? selectedOrigin + '产区' : ''} {selectedSpec !== '全部' ? selectedSpec : ''}]</b> 目前暂无符合要求的供货，建议更换条件或发布一条新求购！
                  </p>
                  <button
                    onClick={() => {
                      setSelectedOrigin('全部');
                      setSelectedSpec('全部');
                      setSelectedCategory('全部');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-blue-900 text-white font-bold text-sm rounded-lg"
                  >
                    重置所有筛选键
                  </button>
                </div>
              ) : (
                /* Listings Table Style Cards for Elder reassurance */
                <div className="p-3 bg-slate-100 space-y-3">
                  {filteredListings.map((lst) => (
                    <div
                      key={lst.id}
                      onClick={() => {
                        // Increment Click counter
                        const updated = listings.map(l => l.id === lst.id ? { ...l, clicks: l.clicks + 1 } : l);
                        saveListings(updated);
                        setSelectedListingDetail(lst);
                      }}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-blue-900 transition-all cursor-pointer flex flex-col gap-2.5 active:bg-slate-50"
                    >
                      {/* Top Meta info row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className={`px-2 py-0.5 rounded font-black text-white text-[11px] ${
                            lst.role === '卖家' ? 'bg-orange-600' : 'bg-blue-700'
                          }`}>
                            {lst.role === '卖家' ? '供货' : '求购'}
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5">
                            {lst.origin}产地
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 font-bold">
                          🕒 {lst.publishTime.split(' ')[1]} 发布
                        </span>
                      </div>

                      {/* Main Title text (With Elderly Large Font toggles) */}
                      <h3 className={`font-black text-slate-900 leading-snug ${
                        isSeniorMode ? 'text-[17px]' : 'text-[15px]'
                      }`}>
                        {lst.title}
                      </h3>

                      {/* Specs core grid values */}
                      <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 rounded-xl border border-slate-200/60 text-center">
                        <div className="border-r border-slate-200">
                          <span className="text-[10px] text-slate-500 block">规格</span>
                          <span className="text-[13px] font-black text-blue-950">{lst.specs}</span>
                        </div>
                        <div className="border-r border-slate-200">
                          <span className="text-[10px] text-slate-500 block">总量</span>
                          <span className="text-[13px] font-black text-rose-700">{lst.quantity} {lst.unit}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">价格指导</span>
                          <span className="text-[13px] font-black text-rose-700">
                            {typeof lst.price === 'number' ? `¥${lst.price}/斤` : '面议'}
                          </span>
                        </div>
                      </div>

                      {/* Trust credentials Row badges (Very clean, no tech-slop) */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {lst.isVerifiedShipper && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-900 text-[10px] font-black rounded border border-blue-200">
                            <span className="bg-blue-900 text-white text-[8px] px-1 rounded-full font-black">认证</span>
                            货主实名
                          </span>
                        )}
                        {lst.isInspectedBase && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-900 text-[10px] font-black rounded border border-emerald-200">
                            <span className="bg-emerald-800 text-white text-[8px] px-1 rounded-full font-black">实勘</span>
                            基地核验
                          </span>
                        )}
                      </div>

                      {/* Card Footer contact info */}
                      <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs text-slate-600">
                        <span className="font-bold flex items-center gap-1">
                          👤 联络人: <b className="text-slate-900">{lst.contactName.split('（')[0]}</b>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'publish' ? (
            /* ================== TAB 2: PUBLISH FORM ================== */
            <div className="p-4 bg-white min-h-full">
              <div className="border-b border-slate-200 pb-3 mb-4">
                <h2 className="text-lg font-black text-blue-950 flex items-center gap-1">
                  <span>📝 发布供求与采购榜单</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  官方人工电话代审，3分钟即可推送向辽鲁闽冀全国批发商。
                </p>
              </div>

              <form onSubmit={handlePublish} className="space-y-4">
                {/* 1. Identity selection */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="text-[12px] font-bold text-slate-600 block">我是谁？(身份角色划分)：</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewRole('卖家')}
                      className={`py-2 px-1 text-center font-bold rounded-xl border text-[13px] ${
                        newRole === '卖家'
                          ? 'bg-orange-600 text-white border-orange-700 shadow-md font-extrabold'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      卖家 (加工厂/养殖户)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRole('买家')}
                      className={`py-2 px-1 text-center font-bold rounded-xl border text-[13px] ${
                        newRole === '买家'
                          ? 'bg-blue-900 text-white border-blue-950 shadow-md font-extrabold'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      买家 (批发/连锁餐饮)
                    </button>
                  </div>
                </div>

                {/* 2. Info title */}
                <div className="space-y-1">
                  <label className="text-[12px] font-bold text-slate-600 block">
                    1. 编写货源标题：
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="例如：辽宁大连35头自家拉缸盐大量有货"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold placeholder-slate-400 focus:bg-white focus:outline-none"
                    style={{ fontSize: isSeniorMode ? '16px' : '13px' }}
                  />
                </div>

                {/* 3. Category & Origin */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-600 block">二、货品细分品类：</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold focus:bg-white"
                      style={{ fontSize: isSeniorMode ? '15px' : '13px' }}
                    >
                      <option value="盐干/拉缸盐">盐干/拉缸盐</option>
                      <option value="鲜活海参">鲜活海参</option>
                      <option value="海参苗种">海参苗种</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-600 block">三、主要所属产地：</label>
                    <select
                      value={newOrigin}
                      onChange={(e) => setNewOrigin(e.target.value as OriginArea)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold focus:bg-white"
                      style={{ fontSize: isSeniorMode ? '15px' : '13px' }}
                    >
                      <option value="辽宁">辽宁产地</option>
                      <option value="山东">山东产地</option>
                      <option value="福建">福建产地</option>
                      <option value="河北">河北产地</option>
                      <option value="其他">其他地区</option>
                    </select>
                  </div>
                </div>

                {/* 4. Specs Input & Templates */}
                <div className="space-y-2 bg-blue-50/50 p-3 rounded-xl border border-blue-150">
                  <label className="text-[12px] font-bold text-blue-950 block">四、成交规格/头数：</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      placeholder="例如：30-40"
                      value={newSpecs}
                      onChange={(e) => setNewSpecs(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 pr-20 font-bold focus:ring-2 focus:ring-blue-300 outline-none"
                      style={{ fontSize: isSeniorMode ? '16px' : '14px' }}
                    />
                    <span className="absolute right-4 font-black text-slate-500 text-[14px]">头 / 斤</span>
                  </div>
                </div>

                {/* 5. Quantity & Weights */}
                <div className="grid grid-cols-2 gap-3 items-end">
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-600 block">五、发布数量：</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold text-[15px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-600 block">计量单位：</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 rounded-lg p-1 border">
                      <button
                        type="button"
                        onClick={() => setNewUnit('斤')}
                        className={`py-1 text-center font-bold text-xs rounded ${
                          newUnit === '斤'
                            ? 'bg-white text-blue-900 shadow font-black'
                            : 'text-slate-500'
                        }`}
                      >
                        斤 (常规)
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewUnit('吨')}
                        className={`py-1 text-center font-bold text-xs rounded ${
                          newUnit === '吨'
                            ? 'bg-white text-blue-900 shadow font-black'
                            : 'text-slate-500'
                        }`}
                      >
                        吨 (大宗)
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Pricing */}
                <div className="space-y-1 bg-slate-50 p-2 rounded-xl border">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[12px] font-bold text-slate-600">六、期望交易单价：</label>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-rose-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPriceIsNegotiable}
                        onChange={(e) => setNewPriceIsNegotiable(e.target.checked)}
                        className="rounded"
                      />
                      <span>勾选改为“面议”</span>
                    </label>
                  </div>
                  {!newPriceIsNegotiable && (
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="请输入元/斤的单价"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-2 font-bold text-[14px] pr-12"
                      />
                      <span className="absolute right-3 top-2 text-slate-400 font-bold text-xs">元 / 斤</span>
                    </div>
                  )}
                </div>

                {/* 7. Image uploads simulator for elders */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-[12px] font-bold text-slate-700 block">
                    📷 真实随手拍/小视频(老年人友好免传)：
                  </span>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    👵 为防老年用户不会传图，您可点击我们帮您拍摄好的实景大参图，或上传手机相片：
                  </p>
                  
                  {/* Select Predefined Sample */}
                  <div className="grid grid-cols-3 gap-1.5 py-1">
                    {sampleSeaCucumberImages.map((img) => {
                      const isSelected = newImages.includes(img.url);
                      return (
                        <button
                          type="button"
                          key={img.name}
                          onClick={() => handleAttachPredefinedImage(img.url)}
                          className={`relative h-14 rounded-lg overflow-hidden border-2 text-left p-1 text-white flex flex-col justify-end ${
                            isSelected ? 'border-amber-500 shadow-bold' : 'border-slate-300'
                          }`}
                        >
                          <img src={img.url} className="absolute inset-0 w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" alt="pre" />
                          <span className="relative text-[9px] bg-slate-950/80 px-1 rounded-sm w-full truncate font-bold text-center block">
                            {img.name} {isSelected ? '✅' : '➕'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual video simulator input code */}
                  <div className="space-y-1 mt-1.5 border-t border-slate-200 pt-2.5">
                    <span className="text-[10px] text-slate-500 block font-bold">现场视频链接 (选填)：</span>
                    <input
                      type="text"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      placeholder="例：抖音/快手短视频分享链接"
                      className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-slate-700 font-mono"
                    />
                  </div>
                </div>

                {/* 8. Contact profiles Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-600 block">货主姓名：</label>
                    <input
                      type="text"
                      required
                      placeholder="如: 老张 / 威海小张"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-600 block">联络手机号码：</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]*"
                      placeholder="真实打款拨号"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold font-mono text-sm text-blue-900"
                    />
                  </div>
                </div>

                {/* 9. Description block */}
                <div className="space-y-1">
                  <label className="text-[12px] font-bold text-slate-600 block">
                    备注/其他情况补充说明：
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="描述一下海参的盐分含量，泡发倍数，或者基地自提有哪些优惠..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold"
                  />
                </div>

                {/* 10. Badges request triggers */}
                <div className="bg-blue-50 text-blue-950 p-3 rounded-2xl border border-blue-250 space-y-2">
                  <span className="text-[11px] font-bold block mb-1">
                    🛡️ 申请官方信誉徽章 (极速推荐、获取大批发商青睐)：
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <label className="flex items-start gap-2 cursor-pointer font-bold select-none">
                      <input
                        type="checkbox"
                        checked={requestVerify}
                        onChange={(e) => setRequestVerify(e.target.checked)}
                        className="rounded mt-0.5"
                      />
                      <div>
                        <span>申请“货主实名认证”勋章</span>
                        <p className="text-[10px] text-slate-500 font-normal">
                          发布后官方将致电向您征求身份证备案，大字图标将伴随信息。
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer font-bold select-none">
                      <input
                        type="checkbox"
                        checked={requestInspected}
                        onChange={(e) => setRequestInspected(e.target.checked)}
                        className="rounded mt-0.5"
                      />
                      <div>
                        <span>申请“基地实勘”勋章</span>
                        <p className="text-[10px] text-slate-500 font-normal">
                          核验育苗大棚与吊笼资产情况，拥有该勋章点击率暴增3倍以上。
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Big Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-4 bg-blue-900 hover:bg-blue-950 text-yellow-300 font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all transform ${
                    isSeniorMode ? 'text-[19px]' : 'text-md'
                  }`}
                >
                  <Check size={22} className="text-yellow-300 stroke-[3]" />
                  <span>立即公开发布、供全国批发商核验</span>
                </button>
              </form>
            </div>
          ) : (
            /* ================== TAB 3: PERSONAL CENTER ================== */
            <div className="p-3 bg-slate-100 min-h-full space-y-3.5">
              
              {/* Official Electronic Credibility ID Card - styled like a certificate or bank book */}
              <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white rounded-2xl p-4 shadow-md border-b-4 border-amber-500 relative overflow-hidden">
                {/* Background decorative seals */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-800 rounded-full -mr-10 -mt-10 opacity-20 pointer-events-none"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 border-4 border-blue-700/20 rounded-full pointer-events-none"></div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center p-2.5 shrink-0">
                      <SeaCucumberIcon className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-[16px] font-black tracking-tight text-white">王建国</h4>
                      </div>
                      <p className="text-[10px] text-blue-200 mt-0.5">主产地：辽宁大连长海县自营海域</p>
                      <p className="text-[10px] text-blue-300 font-mono mt-1 bg-black/30 px-2 py-0.5 rounded inline-block">
                        NO: CHN-LN8899-2026
                      </p>
                    </div>
                  </div>

                  {/* Anti-counterfeiting Status Stamp */}
                  <div className="text-right flex flex-col items-end justify-center">
                    <span className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1">
                      ● 级级核定 AAA级
                    </span>
                  </div>
                </div>

                {/* Rating details */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                  <span className="text-blue-300">信誉评级</span>
                  <span className="font-black text-amber-400">★★★★★</span>
                </div>
              </div>

              {/* My Sourcing Listings Live Management Console */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <h4 className="text-[12px] font-black text-slate-900 flex items-center gap-1">
                    <FileText size={14} className="text-blue-900" />
                    <span>我发布的供求与采购管理</span>
                  </h4>
                  <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded font-black">
                    共 {listings.filter(i => i.contactPhone === '13941108899' || i.id.startsWith('LST-001')).length || 1} 条
                  </span>
                </div>

                {/* Map dynamic direct display of user's own listings with delete option */}
                <div className="space-y-2">
                  {listings.map(lst => {
                    const isOwn = lst.contactPhone === '13941108899' || lst.id === 'LST-001';
                    if (!isOwn) return null;
                    return (
                      <div key={lst.id} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-1.5 justify-between">
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[12px] font-black text-slate-800 truncate block max-w-[210px]">
                            {lst.title}
                          </span>
                          <span className="text-[10px] text-rose-700 bg-rose-50 px-1.5 rounded font-black shrink-0 font-mono">
                            {lst.specs}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>
                            总量: <b className="text-slate-800">{lst.quantity} {lst.unit}</b> | 价格: <b className="text-slate-800">{typeof lst.price === 'number' ? `¥${lst.price}/斤` : '面议'}</b>
                          </span>
                          <span className="font-mono text-slate-400">📍 {lst.origin}</span>
                        </div>

                        {/* Actions for own item */}
                        <div className="flex gap-2 justify-end pt-1 bg-white p-1.5 rounded-lg border border-dashed border-slate-200 mt-0.5">
                          <button
                            onClick={() => setShowPosterForListing(lst)}
                            className="text-[10px] bg-blue-900 text-white font-bold py-1 px-2.5 rounded hover:bg-blue-950 flex items-center gap-1 shadow-sm"
                          >
                            <Sparkles size={10} className="text-yellow-400" />
                            <span>重新生成大海报</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              triggerConfirm(
                                '确认下线供求信息',
                                '您确定要下线移除这条海参供货信息么？下线后全国大厅将无法再查询到。',
                                () => {
                                  const updated = listings.filter(l => l.id !== lst.id);
                                  saveListings(updated);
                                  triggerToast('海参供求信息下线成功！');
                                }
                              );
                            }}
                            className="text-[10px] border border-rose-300 text-rose-700 font-bold py-1 px-2 rounded hover:bg-rose-50 flex items-center gap-1"
                          >
                            <Trash2 size={10} />
                            <span>信息下线</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reference & Handbook Guides (Highly compliant look) */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 divide-y divide-slate-100">
                
                <div 
                  onClick={() => setIsSeniorMode(!isSeniorMode)}
                  className="p-3 flex justify-between items-center hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👓</span>
                    <span className="text-[13px] font-bold text-slate-800">50-60岁大字阅读习惯一键切换</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-black ${
                    isSeniorMode ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isSeniorMode ? '特大字已开' : '标准小字'}
                  </span>
                </div>

                <div 
                  onClick={() => {
                    triggerConfirm(
                      '账户安全退出',
                      '确认要安全退出当前海参登录账号吗？已发布的供供求与采购信息仍将继续保留在全国平台。',
                      () => {
                        setIsLoggedIn(false);
                        setLoginCode('');
                        setCountdown(0);
                        triggerToast('账户已安全退出，请重新验证登入。');
                      }
                    );
                  }}
                  className="p-3 flex justify-between items-center hover:bg-rose-50 cursor-pointer text-rose-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={15} className="text-rose-500" />
                    <span className="text-[13px] font-bold">账户安全退出</span>
                  </div>
                  <span className="text-[10px] text-slate-400">退回登录</span>
                </div>

              </div>

              {/* Developer info signature */}
              <div className="text-center text-[10px] text-slate-400 pt-1 space-y-1">
                <p>© 国家海参数字农业技术物联网支撑工程</p>
                <p>应用版本 v5.2.0 (生产服务器专享)</p>
              </div>

            </div>
          )}

        </main>

        {/* Global Bottom Tab Navigation bar */}
        <nav className="bg-white border-t border-slate-200 py-2 px-3 flex justify-around shrink-0 z-40 shadow-xl">
          <button
            onClick={() => {
              setSelectedListingDetail(null);
              setActiveTab('hall');
            }}
            className={`flex flex-col items-center justify-center transition-all ${
              activeTab === 'hall' && !selectedListingDetail ? 'text-blue-900 scale-105' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Home size={20} className="mb-0.5" />
            <span className={`font-bold ${isSeniorMode ? 'text-[14px] font-black' : 'text-[11px]'}`}>供求大厅</span>
          </button>

          <button
            onClick={() => {
              setSelectedListingDetail(null);
              setActiveTab('publish');
            }}
            className={`flex flex-col items-center justify-center transition-all ${
              activeTab === 'publish' ? 'text-blue-900 scale-105' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <PlusCircle size={20} className="mb-0.5" />
            <span className={`font-bold ${isSeniorMode ? 'text-[14px] font-black' : 'text-[11px]'}`}>发布供求</span>
          </button>



          <button
            onClick={() => {
              setSelectedListingDetail(null);
              setActiveTab('profile');
            }}
            className={`flex flex-col items-center justify-center transition-all ${
              activeTab === 'profile' ? 'text-blue-900 scale-105' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <User size={20} className="mb-0.5" />
            <span className={`font-bold ${isSeniorMode ? 'text-[14px] font-black' : 'text-[11px]'}`}>我的信息</span>
          </button>
        </nav>
      </>
    )}

        {/* WeChat HD Poster generation Modal overlays */}
        {showPosterForListing && (
          <PosterModal
            listing={showPosterForListing}
            onClose={() => setShowPosterForListing(null)}
            isSeniorMode={isSeniorMode}
          />
        )}

        {/* Custom Confirmation Modal */}
        {confirmDialog && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-[280px] w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in-50 zoom-in-95 duration-200 text-slate-800">
              <div className="text-center">
                <span className="text-3xl block mb-2">⚠️</span>
                <h3 className="text-sm font-black text-slate-900">{confirmDialog.title}</h3>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{confirmDialog.message}</p>
              </div>
              <div className="flex gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition-colors active:scale-95"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className="flex-1 py-2 bg-blue-900 hover:bg-blue-950 text-white text-[11px] font-black rounded-xl transition-colors active:scale-95 shadow-md shadow-blue-900/20"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Toast Notification Banner */}
        {toastMessage && (
          <div className="absolute top-4 left-4 right-4 z-[210] bg-slate-900/95 border border-slate-750 text-white rounded-2xl py-2.5 px-3.5 shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
            <span className="text-sm">🔔</span>
            <p className="text-[11px] font-bold flex-1 leading-relaxed">{toastMessage}</p>
            <button 
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}

      </div>
    </DeviceFrame>
  );
}
