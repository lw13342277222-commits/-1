import React, { useRef, useState } from 'react';
import { Listing } from '../types';
import { X, Check, Copy, Download, Share2, ShieldAlert, Award, PhoneCall } from 'lucide-react';

interface PosterModalProps {
  listing: Listing;
  onClose: () => void;
  isSeniorMode: boolean;
}

export default function PosterModal({ listing, onClose, isSeniorMode }: PosterModalProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

    const specCountPart = listing.specs.split('头')[0];
    const approxCountText = (specCountPart && specCountPart !== listing.specs) ? `（一斤约 ${specCountPart}只）` : '';

  // Format share text
  const shareCopyText = `【海参供需网供求快讯】
───────────────────
品类类型：${listing.category}
产地源头：${listing.origin} 核心海域
规格大小：${listing.specs}${approxCountText}
货品总量：${listing.quantity} ${listing.unit}
交易单价：${typeof listing.price === 'number' ? `¥ ${listing.price} 元 / 斤` : '面议'}
信息详情：${listing.description}
核心认证：${listing.isVerifiedShipper ? '☑【货主实名认证】' : ''} ${listing.isInspectedBase ? '☑【海参基地实勘认证】' : ''}
联系人员：${listing.contactName}
联系电话：${listing.contactPhone}
（来自海参供需官方小程序，靠质诚信交易！）`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareCopyText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const simulateSaveTextFallback = () => {
    const element = document.createElement("a");
    const file = new Blob([shareCopyText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `海参供需网海报_${listing.origin}_${listing.specs}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const simulateSaveImage = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2d context');

      // Design dimensions
      const width = 500;
      const height = 715;
      
      // Support high DPI screens
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2);

      // 1. Fill base background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Draw overall deep blue border (3px)
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, width - 6, height - 6);

      // 2. Head Banner
      const bannerGradient = ctx.createLinearGradient(0, 0, width, 0);
      bannerGradient.addColorStop(0, '#1e3a8a');
      bannerGradient.addColorStop(0.5, '#172554');
      bannerGradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = bannerGradient;
      ctx.fillRect(6, 6, width - 12, 110);

      // Graphic circle flare inside banner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.arc(width - 40, 35, 70, 0, Math.PI * 2);
      ctx.fill();

      // Rounded Top Badge custom draw helper
      const drawRoundedRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
        c.beginPath();
        c.moveTo(x + r, y);
        c.arcTo(x + w, y, x + w, y + h, r);
        c.arcTo(x + w, y + h, x, y + h, r);
        c.arcTo(x, y + h, x, y, r);
        c.arcTo(x, y, x + w, y, r);
        c.closePath();
      };

      // Header banner text has been completely removed as requested

      // 3. Info Pill Panels (Origin & Specs)
      ctx.textAlign = 'left';
      const badgeY = 132;
      const boxW = (width - 34) / 2;

      // Origin box
      ctx.fillStyle = '#eff6ff';
      drawRoundedRect(ctx, 12, badgeY, boxW, 55, 8);
      ctx.fill();
      ctx.strokeStyle = '#bfdbfe';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('产地出处', 12 + boxW / 2 - ctx.measureText('产地出处').width / 2, badgeY + 22);
      ctx.fillStyle = '#1e3a8a';
      ctx.font = 'bold 15px system-ui, sans-serif';
      const originText = `${listing.origin}地区`;
      ctx.fillText(originText, 12 + boxW / 2 - ctx.measureText(originText).width / 2, badgeY + 44);

      // Specs box
      ctx.fillStyle = '#ecfdf5';
      drawRoundedRect(ctx, 12 + boxW + 10, badgeY, boxW, 55, 8);
      ctx.fill();
      ctx.strokeStyle = '#a7f3d0';
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('分级规格', 12 + boxW + 10 + boxW / 2 - ctx.measureText('分级规格').width / 2, badgeY + 22);
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 15px system-ui, sans-serif';
      ctx.fillText(listing.specs, 12 + boxW + 10 + boxW / 2 - ctx.measureText(listing.specs).width / 2, badgeY + 44);

      // 4. Content Details Box
      const detailsY = 202;
      const detailsH = 225; // increased slightly to 225 to eliminate squeezing
      ctx.fillStyle = '#ffffff';
      drawRoundedRect(ctx, 12, detailsY, width - 24, detailsH, 12);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Lines of text helper
      const drawDetailLine = (label: string, valStr: string, activeCol: string, isAccentNum: boolean, yPos: number) => {
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(label, 24, yPos);

        ctx.fillStyle = activeCol;
        ctx.font = isAccentNum ? 'bold 16px system-ui, sans-serif' : 'bold 13px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(valStr, width - 24, yPos);
        ctx.textAlign = 'left';

        // divider line
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, yPos + 12);
        ctx.lineTo(width - 20, yPos + 12);
        ctx.stroke();
      };

      drawDetailLine('交易品类：', listing.category, '#0f172a', false, detailsY + 28);
      drawDetailLine('货品储量：', `${listing.quantity} ${listing.unit}`, '#e11d48', true, detailsY + 68);
      drawDetailLine('指导单价：', typeof listing.price === 'number' ? `¥ ${listing.price}/斤` : '面议', '#1e3a8a', true, detailsY + 108);

      // Sourcing notes / Sourcing details wraps
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('货源概况：', 24, detailsY + 148);

      ctx.fillStyle = '#475569';
      ctx.font = 'normal 12px system-ui, sans-serif';
      const descText = listing.description;
      const wrapLimitWidth = width - 48; // 452
      const stepLineHeight = 18;
      
      // Robust wrap text function with handle of newlines and max 3 lines limitation
      const wrapAndDrawText = (
        text: string,
        startX: number,
        startY: number,
        maxWidth: number,
        lineHeight: number,
        maxLinesCount: number
      ) => {
        const paragraphs = text.split('\n');
        let currentY = startY;
        let linesDrawn = 0;

        for (const para of paragraphs) {
          if (linesDrawn >= maxLinesCount) break;
          
          let line = '';
          const chars = Array.from(para);

          for (let i = 0; i < chars.length; i++) {
            if (linesDrawn >= maxLinesCount) break;
            
            const testLine = line + chars[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              if (linesDrawn === maxLinesCount - 1 && i < chars.length - 1) {
                ctx.fillText(line.substring(0, line.length - 1) + '...', startX, currentY);
              } else {
                ctx.fillText(line, startX, currentY);
              }
              line = chars[i];
              currentY += lineHeight;
              linesDrawn++;
            } else {
              line = testLine;
            }
          }

          if (line !== '' && linesDrawn < maxLinesCount) {
            ctx.fillText(line, startX, currentY);
            currentY += lineHeight;
            linesDrawn++;
          }
        }
      };

      wrapAndDrawText(descText, 24, detailsY + 168, wrapLimitWidth, stepLineHeight, 3);

      // 5. Verification pill row y=442 (shifted slightly due to core details taller frame)
      let runWidthX = 12;
      const pillY = 442;
      
      if (listing.isVerifiedShipper) {
        ctx.fillStyle = '#eff6ff';
        drawRoundedRect(ctx, runWidthX, pillY, 110, 22, 11);
        ctx.fill();
        ctx.strokeStyle = '#bfdbfe';
        ctx.stroke();

        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 10px system-ui, sans-serif';
        ctx.fillText('✓ 货主实名认证', runWidthX + 14, pillY + 15);
        runWidthX += 122;
      }

      if (listing.isInspectedBase) {
        ctx.fillStyle = '#ecfdf5';
        drawRoundedRect(ctx, runWidthX, pillY, 110, 22, 11);
        ctx.fill();
        ctx.strokeStyle = '#a7f3d0';
        ctx.stroke();

        ctx.fillStyle = '#065f46';
        ctx.font = 'bold 10px system-ui, sans-serif';
        ctx.fillText('★ 养殖基地实勘', runWidthX + 14, pillY + 15);
      }

      // 6. Real-time Official QR Code Card bottom strip
      const stripY = 478;
      ctx.fillStyle = '#0f172a';
      drawRoundedRect(ctx, 12, stripY, width - 24, 110, 12);
      ctx.fill();

      // Top shield stamp inside dark board
      ctx.fillStyle = '#f59e0b';
      drawRoundedRect(ctx, 24, stripY + 14, 76, 18, 4);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.fillText('官方指定防伪', 30, stripY + 26);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`货号: ${listing.id}`, 24, stripY + 48);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('微信扫码或长按', 24, stripY + 68);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'normal 10px system-ui, sans-serif';
      ctx.fillText('识别二维码查看源头底细', 24, stripY + 84);

      // SVG QR Graphic to high DPI Canvas translation
      const qrx = width - 105;
      const qry = stripY + 15;
      const qrw = 80;
      ctx.fillStyle = '#ffffff';
      drawRoundedRect(ctx, qrx, qry, qrw, qrw, 8);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      // Corners
      ctx.fillRect(qrx + 8, qry + 8, 20, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrx + 11, qry + 11, 14, 14);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(qrx + 13, qry + 13, 10, 10);

      ctx.fillRect(qrx + qrw - 28, qry + 8, 20, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrx + qrw - 25, qry + 11, 14, 14);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(qrx + qrw - 23, qry + 13, 10, 10);

      ctx.fillRect(qrx + 8, qry + qrw - 28, 20, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrx + 11, qry + qrw - 25, 14, 14);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(qrx + 13, qry + qrw - 23, 10, 10);

      // Styled QR noise cells
      const drawQRNoiseSquare = (bx: number, by: number, bw: number, bh: number) => {
        ctx.fillRect(qrx + 6 + bx, qry + 6 + by, bw, bh);
      };
      
      drawQRNoiseSquare(30, 8, 8, 4);
      drawQRNoiseSquare(42, 8, 4, 12);
      drawQRNoiseSquare(30, 20, 10, 4);
      drawQRNoiseSquare(45, 18, 4, 4);

      drawQRNoiseSquare(4, 32, 4, 4);
      drawQRNoiseSquare(14, 34, 10, 4);
      drawQRNoiseSquare(10, 42, 4, 4);

      drawQRNoiseSquare(50, 32, 4, 10);
      drawQRNoiseSquare(58, 40, 12, 4);
      drawQRNoiseSquare(66, 32, 4, 4);

      drawQRNoiseSquare(30, 50, 6, 4);
      drawQRNoiseSquare(40, 58, 4, 12);
      drawQRNoiseSquare(30, 64, 6, 6);
      drawQRNoiseSquare(58, 58, 8, 8);

      // Center sea cucumber logo spot
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrx + 33, qry + 33, 14, 14);
      ctx.fillStyle = '#1e3a8a';
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.fillText('参', qrx + 35.5, qry + 43);

      // 7. Contact Red Dashed Box - DYNAMIC TYPESETTING WITH NO CHAR SEGMENT COLLISION
      const contactPanelY = 604;
      ctx.fillStyle = '#ffffff';
      drawRoundedRect(ctx, 12, contactPanelY, width - 24, 44, 8);
      ctx.fill();
      ctx.strokeStyle = '#ef4444'; 
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      const nameCut = listing.contactName.length > 7 ? listing.contactName.slice(0, 7) + '...' : listing.contactName;
      
      const segs = [
        { text: '📞 联络人: ', color: '#1e293b', font: 'bold 12px system-ui, sans-serif' },
        { text: nameCut, color: '#b91c1c', font: 'bold 13px system-ui, sans-serif' },
        { text: '  |  电话: ', color: '#1e293b', font: 'bold 12px system-ui, sans-serif' },
        { text: listing.contactPhone, color: '#991b1b', font: 'bold 14px system-ui, sans-serif' }
      ];

      // Measure total inline text segments width to dynamic centering
      let totalInlineWidth = 0;
      const widths = segs.map(s => {
        ctx.font = s.font;
        const w = ctx.measureText(s.text).width;
        totalInlineWidth += w;
        return w;
      });

      // Starting X position for dynamic alignment center
      let currentX = width / 2 - totalInlineWidth / 2;

      // Draw all segments side by side with zero overlapping
      segs.forEach((s, idx) => {
        ctx.font = s.font;
        ctx.fillStyle = s.color;
        ctx.fillText(s.text, currentX, contactPanelY + 26);
        currentX += widths[idx];
      });

      // 8. Bottom legal line
      const footyY = 662;
      ctx.fillStyle = '#f1f5f9';
      drawRoundedRect(ctx, 12, footyY, width - 24, 34, 6);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔔 提醒：海参交易资金量大，请通过实勘认证或对公账户交易。', width / 2, footyY + 21);

      // Convert and force clean real PNG download
      const dataUri = canvas.toDataURL('image/png');
      const hiddenAnchor = document.createElement('a');
      hiddenAnchor.href = dataUri;
      hiddenAnchor.download = `海参供需大公文海报_${listing.origin}_${listing.specs}.png`;
      document.body.appendChild(hiddenAnchor);
      hiddenAnchor.click();
      document.body.removeChild(hiddenAnchor);

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error('Image rendering failed, using fallback txt: ', e);
      simulateSaveTextFallback();
    }
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-end z-[100] p-4 text-slate-900">
      
      {/* Container holding poster + controls */}
      <div className="bg-slate-900 rounded-t-3xl max-h-[92%] overflow-y-auto w-full p-4 flex flex-col border-t-2 border-slate-700">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-slate-100">
          <div className="flex items-center gap-1.5">
            <Share2 className="text-blue-400" size={18} />
            <h4 className="font-bold text-[14px]">微信群聊专享 · 高清分享图海报</h4>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Printable/Screenshot Poster Element */}
        <div 
          ref={posterRef}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-900 mx-auto w-full max-w-sm mb-4 relative flex flex-col text-slate-900"
          style={{ letterSpacing: '0.02em' }}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-6 py-7 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-800 rounded-full -mr-12 -mt-12 opacity-30"></div>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-3.5 bg-slate-50 flex-1">
            
            {/* Core Transaction Badge row */}
            <div className="flex gap-2">
              <span className="flex-1 bg-blue-50/50 border border-blue-200 rounded-lg p-2 text-center">
                <span className="text-[11px] text-slate-500 block font-medium">产地出处</span>
                <span className="text-[15px] font-extrabold text-blue-900">{listing.origin}地区</span>
              </span>
              <span className="flex-1 bg-cyan-50/50 border border-cyan-200 rounded-lg p-2 text-center">
                <span className="text-[11px] text-slate-500 block font-medium">分级规格</span>
                <span className="text-[15px] font-extrabold text-cyan-900">{listing.specs}</span>
              </span>
            </div>

            {/* Main Details block */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
              <div className="border-b border-slate-100 pb-1.5 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-500">交易品类：</span>
                <span className="text-[13px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{listing.category}</span>
              </div>
              
              <div className="border-b border-slate-100 pb-1.5 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-500">货品储量：</span>
                <span className="text-[15px] font-black text-rose-600">{listing.quantity} {listing.unit}</span>
              </div>

              <div className="border-b border-slate-100 pb-1.5 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-500">指导单价：</span>
                <span className="text-[16px] font-black text-blue-900">
                  {typeof listing.price === 'number' ? `¥ ${listing.price}/斤` : '面议'}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">货源概况：</span>
                <p className="text-[12px] leading-relaxed text-slate-700 bg-slate-50 p-2 rounded border border-dashed border-slate-200">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Official Credentials Stamps */}
            <div className="flex gap-2 justify-center py-1">
              {listing.isVerifiedShipper && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-950 text-[10px] font-bold rounded-full border border-blue-300">
                  <Check size={11} className="text-blue-800" />
                  货主实名认证
                </span>
              )}
              {listing.isInspectedBase && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-950 text-[10px] font-bold rounded-full border border-emerald-300">
                  <Award size={11} className="text-emerald-800" />
                  养殖基地实勘
                </span>
              )}
            </div>

            {/* QR Code and Contact Footer */}
            <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex-1 space-y-1">
                <span className="text-[9px] bg-amber-500 text-neutral-950 px-1 py-0.2 rounded font-bold uppercase inline-block">
                  官方指定防伪
                </span>
                <p className="text-[11px] text-slate-400">货号: {listing.id}</p>
                <p className="text-[11px] text-slate-200 font-bold">微信扫码或长按</p>
                <p className="text-[9px] text-slate-400">识别二维码查看源头底细</p>
              </div>

              {/* QR Code Graphic (Drawn in SVG for perfect client-side preview rendering) */}
              <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-950">
                  <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                  {/* Corner markers */}
                  <rect x="10" y="10" width="25" height="25" fill="currentColor" />
                  <rect x="14" y="14" width="17" height="17" fill="#ffffff" />
                  <rect x="17" y="17" width="11" height="11" fill="currentColor" />
                  
                  <rect x="65" y="10" width="25" height="25" fill="currentColor" />
                  <rect x="69" y="14" width="17" height="17" fill="#ffffff" />
                  <rect x="72" y="17" width="11" height="11" fill="currentColor" />

                  <rect x="10" y="65" width="25" height="25" fill="currentColor" />
                  <rect x="14" y="69" width="17" height="17" fill="#ffffff" />
                  <rect x="17" y="72" width="11" height="11" fill="currentColor" />

                  {/* Centered logo spot */}
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                  <circle cx="50" cy="50" r="6" fill="#ffffff" />

                  {/* Random pixels */}
                  <rect x="42" y="15" width="5" height="5" fill="currentColor" />
                  <rect x="52" y="10" width="8" height="5" fill="currentColor" />
                  <rect x="42" y="25" width="5" height="8" fill="currentColor" />
                  <rect x="50" y="32" width="5" height="5" fill="currentColor" />
                  
                  <rect x="10" y="42" width="5" height="5" fill="currentColor" />
                  <rect x="25" y="45" width="10" height="4" fill="currentColor" />
                  <rect x="20" y="52" width="5" height="5" fill="currentColor" />

                  <rect x="65" y="42" width="5" height="12" fill="currentColor" />
                  <rect x="75" y="50" width="15" height="5" fill="currentColor" />
                  <rect x="85" y="42" width="5" height="5" fill="currentColor" />

                  <rect x="42" y="65" width="8" height="5" fill="currentColor" />
                  <rect x="52" y="75" width="5" height="15" fill="currentColor" />
                  <rect x="42" y="82" width="8" height="8" fill="currentColor" />
                  
                  <rect x="75" y="75" width="10" height="10" fill="currentColor" />
                </svg>
                {/* Micro sea cucumber logo inside vector QR */}
                <span className="absolute text-[8px] font-black text-blue-900 pointer-events-none">
                  参
                </span>
              </div>
            </div>

            {/* Direct Dial Header inside Poster */}
            <div className="bg-white rounded-lg p-2 border-2 border-dashed border-rose-500 text-center flex items-center justify-center gap-1">
              <PhoneCall size={12} className="text-rose-500" />
              <span className="text-[12px] font-bold text-slate-800">
                联络人: <b className="text-rose-700">{listing.contactName.slice(0, 7)}</b>
                &nbsp;|&nbsp;
                电话: <b className="text-rose-800 font-black">{listing.contactPhone}</b>
              </span>
            </div>

          </div>

          {/* Footer bar */}
          <div className="bg-slate-100 p-2 text-center text-[10px] text-slate-500 font-bold border-t border-slate-200">
            🔔 提醒：海参交易资金量大，请通过实勘认证或对公账户交易。
          </div>
        </div>

        {/* Action Controls for Elderly Persons */}
        <div className="space-y-3 mt-1">
          {/* Action 1: Save Poster (simulated) */}
          <button
            onClick={simulateSaveImage}
            className={`w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-black shadow-lg flex items-center justify-center gap-2 transition-all ${
              isSeniorMode ? 'text-[18px]' : 'text-[15px]'
            }`}
          >
            <Download size={20} />
            {savedSuccess ? '✅ 长图海报已成功锁存！' : '💾 选择并“一键保存”海报图'}
          </button>

          {/* Action 2: Copy WeChat Text */}
          <button
            onClick={copyToClipboard}
            className={`w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border border-yellow-400 bg-opacity-40 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isSeniorMode ? 'text-[17px]' : 'text-[14px]'
            }`}
          >
            {copiedText ? (
              <>
                <Check size={18} className="text-emerald-400" />
                <span className="text-emerald-400">已成功复写！可直接投递微信群</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>📋 复制配图专享微信群盘口文案</span>
              </>
            )}
          </button>
        </div>

        {/* Tips explaining WeChat behaviour for older gens */}
        <p className="text-[11px] text-slate-400 leading-relaxed text-center mt-3 bg-slate-950 p-2 rounded-lg">
          💡 👵 <b>微信共享提示：</b> 我们的老年用户习惯将信息<b>直接发朋友圈或海参微信交流大群</b>。
          保存图片海报后，搭配我们<b>自动提取的精简文字</b>发群，效果最突出！较之单纯小程序链接，大客户更爱直接看大图与直拨电话！
        </p>

      </div>
    </div>
  );
}
