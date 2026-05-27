<template>
  <!-- Main APP Viewport Wrapper -->
  <view class="app-container" :class="{ 'senior-mode': isSeniorMode }">
    
    <!-- Status Toast Notification Banner -->
    <view v-if="prefilledMessage" class="prefield-toast">
      <text class="toast-text">{{ prefilledMessage }}</text>
    </view>
    
    <!-- Dialing Simulator Overlay -->
    <view v-if="dialingPhone" class="dial-overlay">
      <view class="dial-pulse-circle">
        <text style="font-size: 40px;">👑</text>
      </view>
      <text class="dial-subtitle">正在模拟呼叫海参直供基地...</text>
      <text class="dial-phone">{{ dialingPhone }}</text>
      <text class="dial-notified">
        国家级海参供需网络安全通话中
      </text>
      <view class="dial-footnoted animate-ping">
        <view class="dot"></view>
        <text>仿真数字专线已建立，打款请走认证流程</text>
      </view>
    </view>
    
    <!-- Account Login Panel -->
    <view v-if="!isLoggedIn" class="login bg-dark">
      <!-- Logo block -->
      <view class="logo-area">
        <view class="logo-circle">
          <text class="logo-gold-symbol">参</text>
        </view>
        <text class="app-main-title">海参直采供求 认证交易大盘</text>
        <text class="app-sub-title">辽 · 鲁 · 闽 · 冀 官方保障交易终端</text>
        <view class="accent-bar"></view>
      </view>
      
      <!-- Login options tabs -->
      <view class="login-tabs">
        <button 
          type="default" 
          class="tab-btn" 
          :class="{ active: loginTab === 'wechat' }" 
          @click="switchLoginTab('wechat')"
        >
          <text>微信直接验证</text>
        </button>
        <button 
          type="default" 
          class="tab-btn btn-manual" 
          :class="{ active: loginTab === 'phone-manual' }" 
          @click="switchLoginTab('phone-manual')"
        >
          <text>手机号码手动验证</text>
        </button>
      </view>
      
      <!-- Box Content 1: WeChat Direct Auth -->
      <view v-if="loginTab === 'wechat'" class="login-card">
        <view class="card-prompt">
          <text class="primary-prompt">微信直接安全快速登录</text>
          <text class="secondary-prompt">
            微信快捷直联：免手动录入校验，直接进入辽、鲁、闽、冀联合海参大堂
          </text>
        </view>
        
        <button class="submit-action-btn bg-emerald" @click="handleWechatLogin">
          <text>微信一键直接安全登录</text>
        </button>
      </view>
      
      <!-- Box Content 2: Phone manual Sms verification flow -->
      <view v-if="loginTab === 'phone-manual'" class="login-card">
        <view class="form-item">
          <text class="form-label">手动输入手机号</text>
          <input 
            type="number" 
            v-model="loginPhone" 
            placeholder="请输入您的 11 位手机号码" 
            maxlength="11"
            class="input-box" 
          />
        </view>
        
        <view class="form-item mt-3">
          <text class="form-label">输入验证码</text>
          <view class="sms-row">
            <input 
              type="number" 
              v-model="loginCode" 
              placeholder="4位数字验证码" 
              maxlength="4" 
              class="input-box flex-3" 
            />
            <button 
              type="default" 
              class="sms-btn" 
              :disabled="countdown > 0" 
              @click="sendSmsCode"
            >
              <text>{{ countdown > 0 ? countdown + '秒后可重发' : '获取验证码' }}</text>
            </button>
          </view>
        </view>
        
        <!-- Virtualized Message Box within previews -->
        <view v-if="countdown > 0 || loginCode" class="virtual-sms-box">
          <text class="virtual-title">📲 收到验证短信通知：</text>
          <text class="virtual-body">
            【安全验证】您的验证码为 {{ loginCode || '发送中...' }}，请手动输入此码。
          </text>
        </view>
        
        <button class="submit-action-btn bg-gold" @click="handleManualLogin">
          <text>验证验证码并手动登录</text>
        </button>
      </view>
      
      <!-- Lower Tips Rules -->
      <view class="rules-box">
        <text class="rules-header">👵🏼 安全登录保障规制：</text>
        <text class="rules-item">1. 微信便捷登录：微信账号快捷直接登录。</text>
        <text class="rules-item">2. 手机手动验证：您可自行键入手机号码获取核虚校验验证码登记登录。</text>
      </view>
      
      <!-- Banner signatures -->
      <view class="footer-signatures">
        <text>数字渔业防伪科技管理委员会 · 联合安全技术支持</text>
        <text>通信服务由 官方直营海参互联保真网 认证分配</text>
      </view>
    </view>
    
    <!-- Active App Body Screens -->
    <view v-else class="main-body-container">
      
      <!-- Header -->
      <view class="navy-header">
        <view class="header-inner">
          <view class="header-titles">
            <text class="header-maint">海参直采供求</text>
            <text class="header-subt">辽 鲁 闽 冀 官方保障交易大盘</text>
          </view>
          
          <view class="header-actions">
            <!-- Senior Mode toggle switch -->
            <button class="senior-toggle-btn" @click="toggleSeniorMode">
              <text>{{ isSeniorMode ? '👵 超大字已开' : '标准小字' }}</text>
            </button>
          </view>
        </view>
      </view>
      
      <!-- Dynamic Main Routing Panels container -->
      <scroll-view scroll-y class="main-scroll-panel">
        
        <!-- DETAIL SUB VIEW SCREEN -->
        <view v-if="selectedListingDetail" class="detail-container">
          <button class="back-btn" @click="selectedListingDetail = null">
            <text>◀ 返回供求大厅</text>
          </button>
          
          <view class="detail-header-block mt-3">
            <view class="detail-tag-row">
              <text class="badge-role" :class="selectedListingDetail.role === '卖家' ? 'bg-orange' : 'bg-blue'">
                {{ selectedListingDetail.role === '卖家' ? '出货现货' : '采购寻源' }}
              </text>
              <text class="detail-serial">单号: {{ selectedListingDetail.id }}</text>
            </view>
            <text class="detail-heading">{{ selectedListingDetail.title }}</text>
          </view>
          
          <!-- Core Quality Badges -->
          <view class="cred-banner-block mt-2">
            <text class="cred-heading-title">🛡️ 本条信息官方保障等级:</text>
            <view class="badge-pills">
              <text v-if="selectedListingDetail.isVerifiedShipper" class="pill-badge style-blue">
                货主实名已认证 ✅
              </text>
              <text v-else class="pill-badge style-gray">普通实名</text>
              
              <text v-if="selectedListingDetail.isInspectedBase" class="pill-badge style-emerald">
                基地实勘已核验 ✅
              </text>
              <text v-else class="pill-badge style-gray">未申请实勘</text>
            </view>
          </view>
          
          <!-- Key details items -->
          <view class="grid-card-specs mt-2">
            <view class="grid-cell">
              <text class="cell-l">规格(头/斤)</text>
              <text class="cell-v">{{ selectedListingDetail.specs }}</text>
            </view>
            <view class="grid-cell">
              <text class="cell-l">产地源头</text>
              <text class="cell-v">{{ selectedListingDetail.origin }}产区</text>
            </view>
            <view class="grid-cell">
              <text class="cell-l">货源数量</text>
              <text class="cell-v text-rose">{{ selectedListingDetail.quantity }} {{ selectedListingDetail.unit }}</text>
            </view>
            <view class="grid-cell">
              <text class="cell-l">指导价格</text>
              <text class="cell-v text-rose">
                {{ typeof selectedListingDetail.price === 'number' ? selectedListingDetail.price + '元/斤' : '面议' }}
              </text>
            </view>
          </view>
          
          <!-- Photo and video indicators -->
          <view v-if="selectedListingDetail.images && selectedListingDetail.images.length > 0" class="field-info mt-3">
            <text class="field-title">📹 货品现场音影与图片：</text>
            <view class="media-flex">
              <image 
                v-for="(img, idx) in selectedListingDetail.images" 
                :key="idx" 
                :src="img" 
                mode="aspectFill" 
                class="media-preview"
              />
            </view>
          </view>
          <view v-else class="fallback-field-info mt-3">
            <view class="avatar-holder">
              <text style="font-size: 28px;">🐟</text>
            </view>
            <view class="avatar-desc">
              <text class="av-t">货源品类：{{ selectedListingDetail.category }}</text>
              <text class="av-s">货主已经通过现场检验，品质一等</text>
            </view>
          </view>
          
          <!-- Description segment -->
          <view class="field-info mt-3">
            <text class="field-title">货源详情描述：</text>
            <view class="description-text-box">
              <text class="desc-text">{{ selectedListingDetail.description }}</text>
            </view>
          </view>
          
          <!-- Gold Direct Action Card -->
          <view class="cta-direct-box mt-3">
            <view class="cta-header">
              <view class="cta-meta">
                <text class="cta-stamp">联系人信息</text>
                <text class="cta-name">{{ selectedListingDetail.contactName }}</text>
                <text class="cta-rank">大连/威海直采平台 认证商</text>
              </view>
              <text class="cta-graphic">👤</text>
            </view>
            
            <view class="cta-buttons-block mt-2">
              <button class="call-cta-btn" @click="handleCallPhone(selectedListingDetail.contactPhone)">
                <text>📞 立刻一键拨打电话: {{ selectedListingDetail.contactPhone }}</text>
              </button>
              
              <button class="share-poster-cta" @click="handleOpenPoster(selectedListingDetail)">
                <text>🌟 生成“高清微信图公文包”发群里</text>
              </button>
            </view>
          </view>
          
          <view class="detail-bottom-remark mt-2">
            <text>发布日期: {{ selectedListingDetail.publishTime }} · 已审核核验 · 总点击 {{ selectedListingDetail.clicks }} 次</text>
          </view>
        </view>
        
        <!-- Tab panel 1: Sourcing Hall -->
        <view v-else-if="activeTab === 'hall'" class="hall-container">
          <!-- Search box -->
          <view class="search-wrap">
            <view class="search-bar">
              <text class="search-icon">🔍</text>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="输入产地、货主搜索..." 
                class="search-input" 
              />
              <text v-if="searchQuery" class="search-clear-btn" @click="searchQuery = ''">✕</text>
            </view>
          </view>
          
          <!-- Filters (Single select categories and production origins) -->
          <view class="filter-card">
            <!-- Origins scroll -->
            <view class="filter-row">
              <text class="filter-row-labels">主产地筛选：</text>
              <scroll-view scroll-x class="filter-tag-scroll">
                <view class="tag-row-content">
                  <view 
                    v-for="org in origins" 
                    :key="org" 
                    class="filter-tag" 
                    :class="{ active: selectedOrigin === org }"
                    @click="selectedOrigin = org"
                  >
                    <text>{{ org === '全部' ? '全部产地' : org + '产区' }}</text>
                  </view>
                </view>
              </scroll-view>
            </view>
            
            <!-- Category scroll -->
            <view class="filter-row mt-2">
              <text class="filter-row-labels">货源大类：</text>
              <scroll-view scroll-x class="filter-tag-scroll">
                <view class="tag-row-content">
                  <view 
                    v-for="cat in categories" 
                    :key="cat" 
                    class="filter-tag" 
                    :class="{ active: selectedCategory === cat }"
                    @click="selectedCategory = cat"
                  >
                    <text>{{ cat }}</text>
                  </view>
                </view>
              </scroll-view>
            </view>
          </view>
          
          <!-- Sourcing counters info banner -->
          <view class="results-stats">
            <text class="stats-text">当前筛选结果: {{ filteredListings.length }} 条货源</text>
            <text class="stats-shield">🛡️ 资金安全等级开启</text>
          </view>
          
          <!-- List elements -->
          <view v-if="filteredListings.length === 0" class="empty-layout">
            <text class="empty-icon">🔍</text>
            <text class="empty-title">没有找到匹配海参信息</text>
            <text class="empty-subtitle">
              建议更换筛选条件或全新发布一条需求货源
            </text>
            <button class="empty-reset-btn" @click="resetFilters">
              <text>重置筛选</text>
            </button>
          </view>
          
          <view v-else class="listings-scroller">
            <view 
              v-for="lst in filteredListings" 
              :key="lst.id" 
              class="listing-card"
              @click="handleOpenDetail(lst)"
            >
              <!-- Info header tags row -->
              <view class="list-meta-line">
                <view class="meta-badge-box">
                  <text class="role-badge" :class="lst.role === '卖家' ? 'bg-orange' : 'bg-blue'">
                    {{ lst.role === '卖家' ? '供货' : '求购' }}
                  </text>
                  <text class="origin-tag">{{ lst.origin }}产地</text>
                </view>
                <text class="time-stamp">🕒 {{ lst.publishTime.split(' ')[1] }} 发布</text>
              </view>
              
              <!-- Content title -->
              <text class="list-card-title">{{ lst.title }}</text>
              
              <!-- Core table specs stats grid -->
              <view class="list-grid-box">
                <view class="list-gcell">
                  <text class="gcell-l">规格</text>
                  <text class="gcell-v text-blue">{{ lst.specs }}</text>
                </view>
                <view class="list-gcell">
                  <text class="gcell-l">总量</text>
                  <text class="gcell-v text-rose">{{ lst.quantity }} {{ lst.unit }}</text>
                </view>
                <view class="list-gcell border-none">
                  <text class="gcell-l">价格指导</text>
                  <text class="gcell-v text-rose">
                    {{ typeof lst.price === 'number' ? '¥' + lst.price + '/斤' : '面议' }}
                  </text>
                </view>
              </view>
              
              <!-- Badges row -->
              <view class="badges-row">
                <text v-if="lst.isVerifiedShipper" class="trust-subbadge style-b">
                  货主已认证
                </text>
                <text v-if="lst.isInspectedBase" class="trust-subbadge style-e">
                  基地已实勘
                </text>
              </view>
              
              <!-- Footer row -->
              <view class="list-footer">
                <text class="foot-label">👥 联络人: {{ lst.contactName.split('（')[0] }}</text>
                <text class="click-counter">点阅: {{ lst.clicks }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- Tab panel 2: Publish Form -->
        <view v-else-if="activeTab === 'publish'" class="publish-container">
          <view class="form-card">
            <view class="form-header-line">
              <text class="card-caption">信息申报表：请如实填写您的海参供销细节</text>
            </view>
            
            <form @submit.prevent="handleSubmitPublish">
              <!-- Select Seller / Buyer Role -->
              <view class="form-row-item">
                <text class="frm-label">您的身份角色：</text>
                <radio-group class="flex-row-wrap" @change="onRoleChange">
                  <label class="radio-label">
                    <radio value="卖家" :checked="newRole === '卖家'" />
                    <text>出货卖家（养殖户/育苗厂）</text>
                  </label>
                  <label class="radio-label mt-1">
                    <radio value="买家" :checked="newRole === '买家'" />
                    <text>求购买家（批发商/加工商/大型餐饮）</text>
                  </label>
                </radio-group>
              </view>
              
              <!-- Title text -->
              <view class="form-row-item mt-3">
                <text class="frm-label">供求/货品标题：(例如：福建霞浦吊笼活参大量现货)</text>
                <input 
                  type="text" 
                  v-model="newTitle" 
                  placeholder="让老板们一目了然看清货物" 
                  class="input-control" 
                />
              </view>
              
              <!-- Category dropdown -->
              <view class="form-row-item mt-3">
                <text class="frm-label">货品类型分类：</text>
                <picker @change="onCategoryPickerChange" :range="categoriesFixedList" :value="categoryIndex">
                  <view class="picker-display-box">
                    <text class="picker-text">{{ newCategory }} (点击更换分类)</text>
                  </view>
                </picker>
              </view>
              
              <!-- Origin Area -->
              <view class="form-row-item mt-3">
                <text class="frm-label">主产区出处：</text>
                <picker @change="onOriginPickerChange" :range="originsListFixed" :value="originIndex">
                  <view class="picker-display-box">
                    <text class="picker-text">{{ newOrigin }}产区 (点击更换产区)</text>
                  </view>
                </picker>
              </view>
              
              <!-- Specs Head count -->
              <view class="form-row-item mt-3">
                <text class="frm-label">规格大小 (头数/斤)：</text>
                <input 
                  type="text" 
                  v-model="newSpecs" 
                  placeholder="如：30-40, 或是 120-150头 (苗种)" 
                  class="input-control" 
                />
              </view>
              
              <!-- Quantities and unit -->
              <view class="form-row-item mt-3">
                <text class="frm-label">发布货量：</text>
                <view class="qty-flex">
                  <input 
                    type="number" 
                    v-model="newQuantity" 
                    placeholder="请输入数字总量" 
                    class="input-control flex-1" 
                  />
                  <picker @change="onUnitPickerChange" :range="unitsList" :value="unitIndex" class="picker-shrink">
                    <view class="unit-selector">
                      <text>{{ newUnit }} ▾</text>
                    </view>
                  </picker>
                </view>
              </view>
              
              <!-- Price per jin -->
              <view class="form-row-item mt-3">
                <text class="frm-label">指导采购交易价格：</text>
                <view v-if="!newPriceIsNegotiable" class="price-input-flex">
                  <input 
                    type="number" 
                    v-model="newPrice" 
                    placeholder="单价 (元/斤)" 
                    class="input-control flex-1" 
                  />
                  <text class="util-text">元 / 斤</text>
                </view>
                
                <view class="negotiable-checkbox mt-1">
                  <label class="checkbox-label">
                    <checkbox :checked="newPriceIsNegotiable" @tap="togglePriceNegotiable" />
                    <text class="util-text ml-1">价格面议（更适合大批量供货商）</text>
                  </label>
                </view>
              </view>
              
              <!-- Contacts Name & info -->
              <view class="form-row-item mt-3">
                <text class="frm-label">您的联络姓名： (王老板、刘经理 等)</text>
                <input 
                  type="text" 
                  v-model="newContactName" 
                  placeholder="真实联络人称呼" 
                  class="input-control" 
                />
              </view>
              
              <view class="form-row-item mt-3">
                <text class="frm-label">联络手机号码：</text>
                <input 
                  type="number" 
                  v-model="newContactPhone" 
                  placeholder="真实接通拨号，切勿填错" 
                  maxlength="11" 
                  class="input-control font-mono" 
                />
              </view>
              
              <!-- Description notes -->
              <view class="form-row-item mt-3">
                <text class="frm-label">货源备注/泡发率说明：</text>
                <textarea 
                  v-model="newDescription" 
                  placeholder="描述一下海参的特点，产海区域自提优势，以及泡发率多少倍..." 
                  class="textarea-control"
                />
              </view>
              
              <!-- Checkbpx Badges options -->
              <view class="credentials-trigger-box mt-3">
                <text class="triggers-heading">🛡️ 申请官方信誉勋章 (获取更佳推荐位):</text>
                
                <view class="trigger-switch-list mt-2">
                  <label class="option-check-row">
                    <checkbox :checked="requestVerify" @tap="requestVerify = !requestVerify" />
                    <view class="opt-desc">
                      <text class="opt-main">申请“货主实名认证”勋章</text>
                      <text class="opt-sub">我们将致电审核您的身份证备案，核准后将向全屏展示实名微章。</text>
                    </view>
                  </label>
                  
                  <label class="option-check-row mt-2">
                    <checkbox :checked="requestInspected" @tap="requestInspected = !requestInspected" />
                    <view class="opt-desc">
                      <text class="opt-main">申请“基地实勘核实”勋章</text>
                      <text class="opt-sub">由官方认证团队核验育苗大棚和吊笼等资源情况，增强信任契约。</text>
                    </view>
                  </label>
                </view>
              </view>
              
              <!-- Submit CTA -->
              <button class="submit-form-btn mt-4" form-type="submit">
                <text>✓ 立即公开上盘，供全国采购商核验</text>
              </button>
            </form>
          </view>
        </view>
        
        <!-- Tab panel 3: Profile/Calculator Personal Center -->
        <view v-else-if="activeTab === 'profile'" class="profile-container">
          
          <!-- AAA Cred ID view -->
          <view class="cred-identity-card">
            <view class="cred-card-header">
              <view class="cred-person">
                <view class="person-circle">
                  <text style="font-size: 20px;">参</text>
                </view>
                <view class="person-details">
                  <text class="person-name">王建国</text>
                  <text class="person-origin">自营业务：辽宁大连长海县自营底播海区</text>
                </view>
              </view>
              <view class="stamp-rating">
                <text class="rating-badge">● 级级核定 AAA级</text>
                <text class="rating-stars">★★★★★</text>
              </view>
            </view>
            <view class="cred-footer">
              <text class="cred-id-no">NO: CHN-LN8899-2026</text>
              <text class="cred-trust-mark">诚实守法守信企业</text>
            </view>
          </view>
          
          <!-- Real-Time Sea Cucumber Calculator Widget (Highly valued for old folks) -->
          <view class="calculator-card mt-3">
            <view class="calc-header">
              <text class="calc-badge">实用算账工具</text>
              <text class="calc-title">🔢 智能装载与总账吨数计算器</text>
            </view>
            <view class="calc-form mt-2">
              <view class="calc-row">
                <text class="calc-frm-lbl">输入装货斤数：</text>
                <input type="number" v-model="calcJins" class="calc-input" />
                <text class="calc-unit">斤</text>
              </view>
              
              <view class="calc-row mt-2">
                <text class="calc-frm-lbl">输入交易单价：</text>
                <input type="number" v-model="calcPricePerJin" class="calc-input text-blue" />
                <text class="calc-unit">元/斤</text>
              </view>
              
              <!-- Calculated indicators -->
              <view class="calc-result-indicators mt-3">
                <view class="indicator-item">
                  <text class="calc-l-tag">折合吨数：</text>
                  <text class="calc-v-highlight text-emerald">{{ calcResultTons }} 吨</text>
                </view>
                <view class="indicator-item border-none">
                  <text class="calc-l-tag">预计总交易款：</text>
                  <text class="calc-v-highlight text-rose">¥ {{ calcResultTotal }} 元</text>
                </view>
              </view>
              <text class="calc-disclaimer">计算公式：1吨 = 2000斤，所得数额仅提供防损指导，建议交易双方实磅核准。</text>
            </view>
          </view>
          
          <!-- Self Published listings list manager with delete methods -->
          <view class="management-card mt-3">
            <view class="mgr-header">
              <text class="mgr-title">我发布的供求与采购管理</text>
              <text class="mgr-qty">共 {{ ownListingsCount }} 条</text>
            </view>
            
            <view class="mgr-listings-list mt-2">
              <view 
                v-for="lst in ownListings" 
                :key="lst.id" 
                class="mgr-item-card"
              >
                <view class="mgr-item-headline">
                  <text class="mgr-item-title">{{ lst.title }}</text>
                  <text class="mgr-item-spec">{{ lst.specs }}</text>
                </view>
                <view class="mgr-item-stats mt-1">
                  <text class="stats-text">总量: {{ lst.quantity }} {{ lst.unit }} | 单价: {{ typeof lst.price === 'number' ? lst.price + '元' : '面议' }}</text>
                  <text class="stats-origin">📍 {{ lst.origin }}</text>
                </view>
                
                <!-- Action steps -->
                <view class="mgr-item-actions mt-2">
                  <button class="action-btn-blue shadow-sm" @click="handleOpenPoster(lst)">
                    <text>重新生成在大海报</text>
                  </button>
                  <button class="action-btn-rose" @click="handleRemoveListing(lst.id)">
                    <text>信息下线移除</text>
                  </button>
                </view>
              </view>
            </view>
          </view>
          
          <!-- Account controls lists -->
          <view class="controls-card mt-3">
            <view class="control-row-clickable" @tap="toggleSeniorMode">
              <view class="clickable-left">
                <text class="row-icon">👓</text>
                <text class="row-text">50-60岁大字阅读习惯一键切换</text>
              </view>
              <text class="senior-indicator" :class="{ on: isSeniorMode }">
                {{ isSeniorMode ? '特大字已开' : '标准小字' }}
              </text>
            </view>
            
            <view class="control-row-clickable custom-border-top text-rose" @tap="handleLogout">
              <view class="clickable-left">
                <text class="row-icon">🚪</text>
                <text class="row-text font-bold">帐户安全退出登录</text>
              </view>
              <text class="row-remark">退回登录</text>
            </view>
          </view>
          
          <view class="center-remark mt-3">
            <text>© 国家海参数字农业技术物联网支撑工程</text>
            <text>应用版本 v5.2.0 (生产服务器专享)</text>
          </view>
        </view>
      </scroll-view>
      
      <!-- Interactive Global Safe Navigation tab navigation bar -->
      <view class="global-navigation-tab-bar">
        <!-- Tab 1 -->
        <view 
          class="tab-item" 
          :class="{ active: activeTab === 'hall' && !selectedListingDetail }" 
          @click="switchMainMenuTab('hall')"
        >
          <text class="tab-icon">🏠</text>
          <text class="tab-label">供求大厅</text>
        </view>
        
        <!-- Tab 2 -->
        <view 
          class="tab-item" 
          :class="{ active: activeTab === 'publish' }" 
          @click="switchMainMenuTab('publish')"
        >
          <text class="tab-icon">➕</text>
          <text class="tab-label">发布供求</text>
        </view>
        
        <!-- Tab 3 -->
        <view 
          class="tab-item" 
          :class="{ active: activeTab === 'profile' }" 
          @click="switchMainMenuTab('profile')"
        >
          <text class="tab-icon">👤</text>
          <text class="tab-label">我的信息</text>
        </view>
      </view>
    </view>
    
    <!-- HIGH QUALITY WECHAT IMAGE POSTER MODAL -->
    <view v-if="showPosterForListing" class="poster-overlay-modal">
      <view class="modal-card">
        <!-- Header -->
        <view class="modal-card-header">
          <text class="modal-title">微信群发专享 · 高质海参图片海报</text>
          <text class="modal-close-icon" @click="showPosterForListing = null">✕</text>
        </view>
        
        <!-- Virtual drawn scroll poster layout -->
        <view class="poster-render-frame">
          <!-- Top Navy Blue Banner -->
          <view class="poster-navy-header">
            <text class="poster-main-head">海参直采 · 官方交易快讯</text>
            <text class="poster-sub-head">LIAONING SHANDONG FUJIAN HEBEI SEACUCUMBER</text>
          </view>
          
          <view class="poster-body-layout">
            <!-- Double grid column pills -->
            <view class="dcol-pills mt-2">
              <view class="dpill-item">
                <text class="dpill-l">产地出处</text>
                <text class="dpill-v text-blue">{{ showPosterForListing.origin }}地区</text>
              </view>
              <view class="dpill-item pl-2 border-left">
                <text class="dpill-l">分级规格</text>
                <text class="dpill-v text-cyan">{{ showPosterForListing.specs }}</text>
              </view>
            </view>
            
            <!-- Details content block -->
            <view class="poster-content-card mt-3">
              <view class="pc-row">
                <text class="pc-label">交易品类：</text>
                <text class="pc-value font-bold">{{ showPosterForListing.category }}</text>
              </view>
              <view class="pc-row mt-2">
                <text class="pc-label">货品储量：</text>
                <text class="pc-value text-rose font-black">{{ showPosterForListing.quantity }} {{ showPosterForListing.unit }}</text>
              </view>
              <view class="pc-row mt-2">
                <text class="pc-label">指导单价：</text>
                <text class="pc-value text-blue font-black">
                  {{ typeof showPosterForListing.price === 'number' ? '¥ ' + showPosterForListing.price + '元 / 斤' : '面议' }}
                </text>
              </view>
              
              <!-- Description wraps -->
              <view class="pc-desc-block mt-3">
                <text class="pc-desc-label">货源概况：</text>
                <text class="pc-desc-content">{{ showPosterForListing.description }}</text>
              </view>
            </view>
            
            <!-- Tags display -->
            <view class="poster-badge-flex mt-3">
              <text v-if="showPosterForListing.isVerifiedShipper" class="trust-badge-pill style-blue">
                ☑ 货主已实名认证
              </text>
              <text v-if="showPosterForListing.isInspectedBase" class="trust-badge-pill style-green">
                ★ 基地已实勘核验
              </text>
            </view>
            
            <!-- Bottom QR dark section -->
            <view class="poster-qr-dark-strip mt-3">
              <view class="qr-label-area text-grey">
                <view class="sticker-badge bg-orange">官方指定保真</view>
                <text class="qr-id">货号: {{ showPosterForListing.id }}</text>
                <text class="qr-prompt font-bold">微信扫码或长按</text>
                <text class="qr-subprompt">识别二维码查看源头底细</text>
              </view>
              
              <view class="qr-canvas-holder">
                <!-- Mock QR Vector visual -->
                <view class="mini-qr-box">
                  <view class="corner-dot top-left"></view>
                  <view class="corner-dot top-right"></view>
                  <view class="corner-dot bottom-left"></view>
                  <text class="qr-center-char">参</text>
                </view>
              </view>
            </view>
            
            <!-- Telephone and User Direct Dotted Box in Poster -->
            <view class="contact-dashed-card mt-3">
              <text class="ct-info">
                📞 联络人: {{ showPosterForListing.contactName.slice(0, 8) }} | 电话: {{ showPosterForListing.contactPhone }}
              </text>
            </view>
          </view>
          
          <view class="poster-rendered-remark">
            <text>🔔 提醒：海参交易资金量大，请通过实勘认证或对公账户交易。</text>
          </view>
        </view>
        
        <!-- Hidden Canvas for actual rendering in Uni-app if downloaded -->
        <canvas canvas-id="posterCanvas" class="hidden-canvas" style="width: 500px; height: 715px; position: absolute; left: -9999px;"></canvas>
        
        <!-- CTA button groups -->
        <view class="modal-cta-buttons mt-3">
          <button class="cta-save-img-btn" @click="exportPosterImage">
            <text>💾 保存并下载高清微信长图海报</text>
          </button>
          
          <button class="cta-copy-btn mt-2" @click="copyPosterClipboardText(showPosterForListing)">
            <text>📋 一键复制配图供销推广文案</text>
          </button>
        </view>
        
        <view class="tips-box mt-3">
          <text class="tips-text">💡 微信共享提示：我们的老年用户习惯将信息直接发朋友圈或海参微信交流大群。保存图片海报后，搭配我们自动提取的推广文案，能够极佳增进信任，一呼百应！</text>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
// Mock initial lists to mimic our core Listings dataset (removing Terms: 保真防伪 as requested!)
const INITIAL_MOCK_LISTS = [
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
    images: ['https://images.unsplash.com/photo-1534080391025-a77c4e7240f8?q=80&w=300&auto=format&fit=crop'],
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
  }
];

export default {
  data() {
    return {
      // Configuration
      isSeniorMode: false,
      
      // Data State
      listings: [],
      selectedCategory: '全部',
      selectedOrigin: '全部',
      selectedSpec: '全部',
      searchQuery: '',
      
      // Page State Router
      activeTab: 'hall', // 'hall' | 'publish' | 'profile'
      selectedListingDetail: null,
      showPosterForListing: null,
      
      // New post Form Data
      newRole: '卖家',
      newTitle: '',
      newCategory: '盐干/拉缸盐',
      newOrigin: '辽宁',
      newSpecs: '30-40',
      newQuantity: 1000,
      newUnit: '斤',
      newPrice: '2400',
      newPriceIsNegotiable: false,
      newContactName: '王建国',
      newContactPhone: '13941108899',
      newDescription: '',
      requestVerify: true,
      requestInspected: true,
      
      // Form Picker choices
      categoriesFixedList: ['盐干/拉缸盐', '鲜活海参', '海参苗种'],
      originsListFixed: ['辽宁', '山东', '福建', '河北', '其他'],
      categoryIndex: 0,
      originIndex: 0,
      
      // Multi-unit sizes selection
      unitsList: ['斤', '吨'],
      unitIndex: 0,
      
      // Live Calculator properties
      calcJins: '1500',
      calcPricePerJin: '2600',
      calcResultTons: 0.75,
      calcResultTotal: 390000,
      
      // Sandbox interactive controls
      prefilledMessage: null,
      dialingPhone: null,
      isLoggedIn: false,
      
      // Manual/WeChat SMS login details
      loginTab: 'wechat', // 'wechat' | 'phone-manual'
      loginPhone: '',
      loginCode: '',
      countdown: 0,
      countdownTimer: null,
      
      // Constant data categories for search/filtering scrolls
      categories: ['全部', '盐干/拉缸盐', '鲜活海参', '海参苗种'],
      origins: ['全部', '辽宁', '山东', '福建', '河北', '其他']
    };
  },
  
  computed: {
    // Dynamic Filter listings matching search queries & single select sliders
    filteredListings() {
      return this.listings.filter(item => {
        const matchCat = this.selectedCategory === '全部' || item.category === this.selectedCategory;
        const matchOrg = this.selectedOrigin === '全部' || item.origin === this.selectedOrigin;
        const matchSearch = !this.searchQuery.trim() || 
          item.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 ||
          item.origin.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 || 
          item.contactName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 || 
          item.specs.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
        return matchCat && matchOrg && matchSearch;
      });
    },
    
    // User's own postings under matching mobile identifier
    ownListings() {
      return this.listings.filter(item => item.contactPhone === '13941108899' || item.id === 'LST-001');
    },
    
    ownListingsCount() {
      return this.ownListings.length;
    }
  },
  
  watch: {
    // Watch calculator variables to do real-time auto-tabulations
    calcJins() {
      this.calculateResults();
    },
    calcPricePerJin() {
      this.calculateResults();
    }
  },
  
  mounted() {
    // Load local storage listings if they exist
    const saved = uni.getStorageSync('haishen_listings');
    if (saved) {
      try {
        this.listings = JSON.parse(saved);
      } catch (err) {
        this.listings = INITIAL_MOCK_LISTS;
      }
    } else {
      this.listings = INITIAL_MOCK_LISTS;
    }
    this.calculateResults();
  },
  
  methods: {
    // Active togglers & loaders
    toggleSeniorMode() {
      this.isSeniorMode = !this.isSeniorMode;
      uni.showToast({
        title: this.isSeniorMode ? '特老字模式开启' : '标准小字模式开启',
        icon: 'none'
      });
    },
    
    resetFilters() {
      this.selectedOrigin = '全部';
      this.selectedCategory = '全部';
      this.searchQuery = '';
    },
    
    // Navigation routing
    switchMainMenuTab(tabName) {
      this.selectedListingDetail = null;
      this.activeTab = tabName;
    },
    
    // Detail loader
    handleOpenDetail(item) {
      this.selectedListingDetail = item;
      // Increment clicks counts under matching listing
      item.clicks += 1;
      this.saveToStorage();
    },
    
    // Login managers
    switchLoginTab(tab) {
      this.loginTab = tab;
      this.loginCode = '';
      this.loginPhone = '';
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdown = 0;
      }
    },
    
    handleWechatLogin() {
      this.isLoggedIn = true;
      this.activeTab = 'hall';
      this.triggerToast('微信一键快捷登入成功！');
    },
    
    sendSmsCode() {
      if (!this.loginPhone || this.loginPhone.length < 11) {
        uni.showToast({ title: '请输入手动输入手机号', icon: 'none' });
        return;
      }
      this.countdown = 60;
      this.loginCode = String(Math.floor(1000 + Math.random() * 9000));
      
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--;
        } else {
          clearInterval(this.countdownTimer);
          this.countdown = 0;
        }
      }, 1000);
      
      this.triggerToast(`验证短信已发向本机手机: ${this.loginPhone}`);
    },
    
    handleManualLogin() {
      if (!this.loginPhone || this.loginPhone.length < 11) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' });
        return;
      }
      if (!this.loginCode) {
        uni.showToast({ title: '请输入验证码', icon: 'none' });
        return;
      }
      
      this.isLoggedIn = true;
      this.activeTab = 'hall';
      this.triggerToast(`手机账号 ${this.loginPhone} 登录成功！`);
    },
    
    handleLogout() {
      uni.showModal({
        title: '账户安全退出',
        content: '您确定要退出当前验证登录账号吗？已发信息仍将对外保留。',
        success: (res) => {
          if (res.confirm) {
            this.isLoggedIn = false;
            this.loginPhone = '';
            this.loginCode = '';
            this.switchMainMenuTab('hall');
            uni.showToast({ title: '已退回登入门票', icon: 'none' });
          }
        }
      });
    },
    
    // Dialing and Poster
    handleCallPhone(phone) {
      this.dialingPhone = phone;
      // Start real calling simulations
      setTimeout(() => {
        this.dialingPhone = null;
        uni.makePhoneCall({
          phoneNumber: phone,
          fail: () => {
            uni.showToast({ title: '沙盒环境：已模拟呼出', icon: 'none' });
          }
        });
      }, 3500);
    },
    
    handleOpenPoster(item) {
      this.showPosterForListing = item;
    },
    
    // Auto calculator weights to metric tons
    calculateResults() {
      const jins = parseFloat(this.calcJins) || 0;
      const price = parseFloat(this.calcPricePerJin) || 0;
      this.calcResultTons = Number((jins / 2000).toFixed(3));
      this.calcResultTotal = jins * price;
    },
    
    // Picker Form values bindings
    onRoleChange(e) {
      this.newRole = e.detail.value;
    },
    onCategoryPickerChange(e) {
      this.categoryIndex = e.detail.value;
      this.newCategory = this.categoriesFixedList[this.categoryIndex];
    },
    onOriginPickerChange(e) {
      this.originIndex = e.detail.value;
      this.newOrigin = this.originsListFixed[this.originIndex];
    },
    onUnitPickerChange(e) {
      this.unitIndex = e.detail.value;
      this.newUnit = this.unitsList[this.unitIndex];
    },
    togglePriceNegotiable() {
      this.newPriceIsNegotiable = !this.newPriceIsNegotiable;
    },
    
    // Forms submitting handlers
    handleSubmitPublish() {
      if (!this.newTitle.trim()) {
        uni.showToast({ title: '请输入完整标题', icon: 'none' });
        return;
      }
      if (!this.newContactName.trim()) {
        uni.showToast({ title: '请填写联系人名字', icon: 'none' });
        return;
      }
      if (!this.newContactPhone || this.newContactPhone.length < 11) {
        uni.showToast({ title: '请填写正确的联络电话', icon: 'none' });
        return;
      }
      
      const finalSpecStr = this.newSpecs.indexOf('头') > -1 ? this.newSpecs : `${this.newSpecs}头/斤`;
      
      const newListing = {
        id: `LST-${Date.now().toString().slice(-4)}`,
        title: this.newTitle,
        role: this.newRole,
        category: this.newCategory,
        origin: this.newOrigin,
        specs: finalSpecStr,
        quantity: Number(this.newQuantity) || 100,
        unit: this.newUnit,
        price: this.newPriceIsNegotiable ? '面议' : (Number(this.newPrice) || '面议'),
        contactName: this.newContactName,
        contactPhone: this.newContactPhone,
        publishTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
        isVerifiedShipper: this.requestVerify,
        isInspectedBase: this.requestInspected,
        images: [],
        description: this.newDescription || `${this.newOrigin}产地直发，${this.newCategory}品质一等，价格亲民，量大从优。`
      };
      
      this.listings = [newListing, ...this.listings];
      this.saveToStorage();
      
      // Clear forms
      this.newTitle = '';
      this.newDescription = '';
      this.triggerToast('供求信息公开发布成功，已录入交易大屏！');
      
      setTimeout(() => {
        this.switchMainMenuTab('hall');
      }, 1500);
    },
    
    // Self removal
    handleRemoveListing(id) {
      uni.showModal({
        title: '确认下线信息',
        content: '您确认下线该条货源信息吗？下线后全国交易大屏中将无法搜索查到。',
        success: (res) => {
          if (res.confirm) {
            this.listings = this.listings.filter(item => item.id !== id);
            this.saveToStorage();
            uni.showToast({ title: '已成功安全移除下牌', icon: 'success' });
          }
        }
      });
    },
    
    // Export poster methods using uni-app native Canvas drawer context APIs
    exportPosterImage() {
      uni.showLoading({ title: '海报制图中...' });
      const ctx = uni.createCanvasContext('posterCanvas', this);
      
      const item = this.showPosterForListing;
      const w = 500;
      const h = 715;
      
      // 1. Draw base white slate
      ctx.setFillStyle('#f8fafc');
      ctx.fillRect(0, 0, w, h);
      
      // 2. Navy border
      ctx.setStrokeStyle('#1e3a8a');
      ctx.setLineWidth(6);
      ctx.strokeRect(3, 3, w - 6, h - 6);
      
      // Draw top Header block
      ctx.setFillStyle('#1e3a8a');
      ctx.fillRect(6, 6, w - 12, 110);
      
      ctx.setFillStyle('#ffffff');
      ctx.setFontSize(22);
      ctx.fillText('海参直采 · 官方交易快讯', 30, 56);
      
      ctx.setFillStyle('#93c5fd');
      ctx.setFontSize(10);
      ctx.fillText('LIAONING SHANDONG FUJIAN HEBEI SEACUCUMBER DIRECT SUPPLIER', 30, 84);
      
      // 3. Draw specs
      ctx.setFillStyle('#eff6ff');
      ctx.fillRect(15, 132, 220, 55);
      ctx.setStrokeStyle('#bfdbfe');
      ctx.setLineWidth(1);
      ctx.strokeRect(15, 132, 220, 55);
      
      ctx.setFillStyle('#64748b');
      ctx.setFontSize(11);
      ctx.fillText('出处产地', 30, 154);
      ctx.setFillStyle('#1e3a8a');
      ctx.setFontSize(15);
      ctx.fillText(`${item.origin}产区`, 30, 174);
      
      ctx.setFillStyle('#ecfdf5');
      ctx.fillRect(265, 132, 220, 55);
      ctx.setStrokeStyle('#a7f3d0');
      ctx.strokeRect(265, 132, 220, 55);
      
      ctx.setFillStyle('#64748b');
      ctx.setFontSize(11);
      ctx.fillText('大小规格', 280, 154);
      ctx.setFillStyle('#065f46');
      ctx.setFontSize(15);
      ctx.fillText(item.specs, 280, 174);
      
      // 4. Details list card
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(15, 202, 470, 225);
      ctx.setStrokeStyle('#e2e8f0');
      ctx.strokeRect(15, 202, 470, 225);
      
      ctx.setFillStyle('#64748b');
      ctx.setFontSize(12);
      ctx.fillText('交易品类：', 30, 235);
      ctx.setFillStyle('#0f172a');
      ctx.setFontSize(13);
      ctx.fillText(item.category, 120, 235);
      
      ctx.setFillStyle('#64748b');
      ctx.setFontSize(12);
      ctx.fillText('货品储量：', 30, 275);
      ctx.setFillStyle('#e11d48');
      ctx.setFontSize(16);
      ctx.fillText(`${item.quantity} ${item.unit}`, 120, 275);
      
      ctx.setFillStyle('#64748b');
      ctx.setFontSize(12);
      ctx.fillText('指导单价：', 30, 315);
      ctx.setFillStyle('#1e3a8a');
      ctx.setFontSize(16);
      ctx.fillText(typeof item.price === 'number' ? `¥ ${item.price} 元/斤` : '面议', 120, 315);
      
      ctx.setFillStyle('#64748b');
      ctx.setFontSize(12);
      ctx.fillText('货源概况：', 30, 355);
      ctx.setFillStyle('#475569');
      ctx.setFontSize(12);
      
      // Standard canvas multi-line wrap draws
      const words = item.description;
      let line = '';
      let lineY = 375;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n];
        let metrics = ctx.measureText(testLine);
        if (metrics.width > 420 && n > 0) {
          ctx.fillText(line, 30, lineY);
          line = words[n];
          lineY += 18;
          if (lineY > 415) break; 
        } else {
          line = testLine;
        }
      }
      if (lineY <= 415) {
        ctx.fillText(line, 30, lineY);
      }
      
      // 5. Credentials pill bottom
      ctx.setFillStyle('#eff6ff');
      ctx.fillRect(15, 442, 130, 22);
      ctx.setFillStyle('#1e3a8a');
      ctx.setFontSize(10);
      ctx.fillText('✓ 货主实名认证', 25, 457);
      
      ctx.setFillStyle('#ecfdf5');
      ctx.fillRect(160, 442, 130, 22);
      ctx.setFillStyle('#065f46');
      ctx.fillText('★ 养殖基地实勘', 170, 457);
      
      // 6. QR section
      ctx.setFillStyle('#0f172a');
      ctx.fillRect(15, 478, 470, 110);
      
      ctx.setFillStyle('#f59e0b');
      ctx.fillRect(30, 492, 70, 18);
      ctx.setFillStyle('#0f172a');
      ctx.setFontSize(9);
      ctx.fillText('官方指定保真', 33, 504);
      
      ctx.setFillStyle('#94a3b8');
      ctx.setFontSize(11);
      ctx.fillText(`货号: ${item.id}`, 30, 526);
      
      ctx.setFillStyle('#ffffff');
      ctx.setFontSize(12);
      ctx.fillText('微信扫码或长按二维码', 30, 548);
      ctx.setFillStyle('#94a3b8');
      ctx.setFontSize(10);
      ctx.fillText('识别图中二维码查看源头底细', 30, 566);
      
      // Mini illustrative QR spot
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(390, 492, 80, 80);
      ctx.setFillStyle('#0f172a');
      ctx.fillRect(398, 500, 18, 18);
      ctx.fillRect(444, 500, 18, 18);
      ctx.fillRect(398, 546, 18, 18);
      ctx.fillRect(424, 524, 15, 15);
      
      // 7. Call information dotted panel
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(15, 604, 470, 44);
      ctx.setStrokeStyle('#ef4444');
      ctx.setLineWidth(1.5);
      ctx.strokeRect(15, 604, 470, 44);
      
      ctx.setFillStyle('#b91c1c');
      ctx.setFontSize(13);
      ctx.fillText(`📞 联络人: ${item.contactName.slice(0,7)}  | 电话: ${item.contactPhone}`, 50, 631);
      
      // 8. Footer legal details
      ctx.setFillStyle('#cbd5e1');
      ctx.fillRect(15, 662, 470, 34);
      ctx.setFillStyle('#475569');
      ctx.setFontSize(10);
      ctx.fillText('提醒：海参大额交易有风险，请务必前往基地实勘对账！', 40, 683);
      
      // Render draw
      ctx.draw(false, () => {
        uni.hideLoading();
        // Export file temp path
        uni.canvasToTempFilePath({
          canvasId: 'posterCanvas',
          success: (res) => {
            // Save to native Album
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.showToast({ title: '高清海报图已存入相册！', icon: 'success' });
              },
              fail: () => {
                // If permission fails, let them preview/long press
                uni.showModal({
                  title: '保存失败',
                  content: '请长按保存下方生成的快讯大图。',
                  showCancel: false
                });
              }
            });
          },
          this
        });
      });
    },
    
    // Copy promotions clipboard text
    copyPosterClipboardText(listing) {
      const approxCountText = listing.specs.split('头')[0] ? `（一斤约 ${listing.specs.split('头')[0]}只）` : '';
      const textBlock = `【海参供需网供求快讯】
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

      // Native uni-app clipboard
      uni.setClipboardData({
        data: textBlock,
        success: () => {
          uni.showToast({ title: '推广群发文案已复制！', icon: 'success' });
        }
      });
    },
    
    // Utilities Toast
    triggerToast(msg) {
      this.prefilledMessage = msg;
      setTimeout(() => {
        this.prefilledMessage = null;
      }, 3000);
    },
    
    // Saving store
    saveToStorage() {
      uni.setStorageSync('haishen_listings', JSON.stringify(this.listings));
    }
  }
};
</script>

<style scoped>
/* Core elderly friendly high contrast layout styles */
.app-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f1f5f9;
  color: #1e293b;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Senior size scaling mode definitions */
.senior-mode .app-main-title { font-size: 24px !important; }
.senior-mode .tab-btn text { font-size: 16px !important; }
.senior-mode .primary-prompt { font-size: 18px !important; }
.senior-mode .secondary-prompt { font-size: 14px !important; }
.senior-mode .form-label { font-size: 15px !important; }
.senior-mode .rules-header { font-size: 14px !important; }
.senior-mode .rules-item { font-size: 13px !important; }
.senior-mode .header-maint { font-size: 21px !important; }
.senior-mode .senior-toggle-btn text { font-size: 13px !important; }
.senior-mode .detail-heading { font-size: 22px !important; }
.senior-mode .cell-l { font-size: 13px !important; }
.senior-mode .cell-v { font-size: 18px !important; }
.senior-mode .desc-text { font-size: 17px !important; }
.senior-mode .call-cta-btn text { font-size: 18px !important; }
.senior-mode .share-poster-cta text { font-size: 16px !important; }
.senior-mode .search-input { font-size: 16px !important; }
.senior-mode .filter-row-labels { font-size: 14px !important; }
.senior-mode .filter-tag text { font-size: 15px !important; }
.senior-mode .list-card-title { font-size: 18px !important; }
.senior-mode .gcell-l { font-size: 12px !important; }
.senior-mode .gcell-v { font-size: 16px !important; }
.senior-mode .tab-label { font-size: 13px !important; }

/* Status Toast */
.prefield-toast {
  position: fixed;
  top: 30rpx;
  left: 30rpx;
  right: 30rpx;
  background-color: #064e3b;
  border: 2px solid #34d399;
  padding: 20rpx;
  border-radius: 20rpx;
  z-index: 999;
  text-align: center;
}
.toast-text {
  color: #ecfdf5;
  font-size: 26rpx;
  font-weight: bold;
}

/* Dialer simulation overlays */
.dial-overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 15, 30, 0.96);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: 40rpx;
}
.dial-pulse-circle {
  width: 160rpx;
  height: 160rpx;
  background-color: #1e3a8a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 40rpx rgba(30, 58, 138, 0.6);
  margin-bottom: 40rpx;
  animation: pulse 1.8s infinite;
}
.dial-subtitle {
  color: #94a3b8;
  font-size: 24rpx;
  font-weight: bold;
  letter-spacing: 2rpx;
}
.dial-phone {
  color: #ffffff;
  font-size: 54rpx;
  font-weight: 900;
  margin-top: 10rpx;
  letter-spacing: 4rpx;
}
.dial-notified {
  background-color: #172554;
  color: #93c5fd;
  border: 1px solid #1e40af;
  padding: 10rpx 30rpx;
  border-radius: 40rpx;
  font-size: 26rpx;
  margin-top: 20rpx;
  font-weight: bold;
}

/* Logins layouts */
.bg-dark {
  background-color: #041126;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40rpx;
  box-sizing: border-box;
}
.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50rpx;
}
.logo-circle {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: #172554;
  border: 2px solid #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25rpx;
}
.logo-gold-symbol {
  color: #fbbf24;
  font-size: 50rpx;
  font-weight: 900;
}
.app-main-title {
  color: #ffffff;
  font-size: 38rpx;
  font-weight: 900;
  letter-spacing: 2rpx;
}
.app-sub-title {
  color: #93c5fd;
  font-size: 20rpx;
  letter-spacing: 4rpx;
  margin-top: 8rpx;
}
.accent-bar {
  width: 80rpx;
  height: 6rpx;
  background-color: #fbbf24;
  border-radius: 10rpx;
  margin-top: 20rpx;
}
.login-tabs {
  display: flex;
  background-color: #020617;
  border: 1rpx solid #1e293b;
  border-radius: 24rpx;
  padding: 8rpx;
  margin-top: 40rpx;
}
.tab-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 16rpx 0;
  color: #94a3b8;
  font-size: 24rpx;
  font-weight: bold;
  border-radius: 16rpx;
  text-align: center;
  line-height: 1.5;
}
.tab-btn::after {
  border: none;
}
.tab-btn.active {
  background-color: #059669;
  color: #ffffff;
}
.btn-manual.active {
  background-color: #d97706;
}
.login-card {
  background-color: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 32rpx;
  padding: 40rpx;
  margin-top: 30rpx;
}
.card-prompt {
  text-align: center;
  padding-bottom: 20rpx;
}
.primary-prompt {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
}
.secondary-prompt {
  color: #94a3b8;
  font-size: 22rpx;
  display: block;
  margin-top: 10rpx;
  line-height: 1.6;
}
.form-item {
  display: flex;
  flex-direction: column;
}
.form-label {
  color: #94a3b8;
  font-size: 22rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
}
.input-box {
  background-color: #090d16;
  border: 1rpx solid #1e293b;
  padding: 22rpx 30rpx;
  border-radius: 20rpx;
  color: #ffffff;
  font-weight: bold;
  font-size: 28rpx;
}
.sms-row {
  display: flex;
  gap: 15rpx;
}
.flex-3 {
  flex: 3;
}
.sms-btn {
  flex: 2;
  background: linear-gradient(to right, #3b82f6, #4f46e5);
  color: #ffffff;
  font-size: 22rpx;
  font-weight: bold;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sms-btn::after { border: none; }
.sms-btn[disabled] {
  background: #334155;
  color: #64748b;
}
.virtual-sms-box {
  background-color: rgba(120, 113, 108, 0.15);
  border: 1rpx solid rgba(217, 119, 6, 0.2);
  border-radius: 20rpx;
  padding: 20rpx;
  margin: 25rpx 0;
}
.virtual-title {
  color: #fbbf24;
  font-size: 22rpx;
  font-weight: bold;
}
.virtual-body {
  color: #e7e5e4;
  font-size: 22rpx;
  display: block;
  margin-top: 6rpx;
}
.submit-action-btn {
  width: 100%;
  padding: 24rpx 0;
  border-radius: 24rpx;
  color: #020617;
  font-size: 28rpx;
  font-weight: 900;
  margin-top: 30rpx;
}
.submit-action-btn::after { border: none; }
.bg-emerald {
  background: linear-gradient(to right, #10b981, #14b8a6);
}
.bg-gold {
  background: linear-gradient(to right, #f59e0b, #eab308);
}
.rules-box {
  background-color: rgba(245, 158, 11, 0.08);
  border: 1px dashed rgba(245, 158, 11, 0.25);
  border-radius: 24rpx;
  padding: 30rpx;
  margin-top: auto;
}
.rules-header {
  color: #f59e0b;
  font-size: 24rpx;
  font-weight: 950;
  display: block;
}
.rules-item {
  color: #fde047;
  font-size: 21rpx;
  display: block;
  margin-top: 10rpx;
  line-height: 1.5;
}
.footer-signatures {
  text-align: center;
  margin-top: 30rpx;
}
.footer-signatures text {
  display: block;
  color: #475569;
  font-size: 20rpx;
  margin-top: 4rpx;
}

/* Custom Header inside Main Body screen */
.main-body-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.navy-header {
  background: linear-gradient(to right, #1e3b8a, #172554, #1e3b8a);
  padding: 20rpx 30rpx;
}
.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-maint {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 900;
}
.header-subt {
  color: #93c5fd;
  font-size: 18rpx;
  font-weight: bold;
  display: block;
  letter-spacing: 2rpx;
}
.senior-toggle-btn {
  background-color: #7c2d12;
  border: 1px solid #ea580c;
  padding: 10rpx 20rpx;
  border-radius: 12rpx;
  line-height: 1.2;
}
.senior-toggle-btn::after { border: none; }
.senior-toggle-btn text {
  color: #fdba74;
  font-size: 22rpx;
  font-weight: bold;
}

.main-scroll-panel {
  flex: 1;
  background-color: #f1f5f9;
}

/* Navigation bottoms */
.global-navigation-tab-bar {
  background-color: #ffffff;
  border-top: 1rpx solid #e2e8f0;
  display: flex;
  padding: 15rpx 0;
  box-shadow: 0 -5rpx 20rpx rgba(0,0,0,0.06);
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tab-icon {
  font-size: 38rpx;
}
.tab-label {
  color: #64748b;
  font-size: 20rpx;
  font-weight: bold;
  margin-top: 4rpx;
}
.tab-item.active .tab-label {
  color: #1e3a8a;
  font-weight: 950;
}

/* Sourcing Hall layout screen */
.search-wrap {
  background-color: #172554;
  padding: 20rpx 30rpx;
}
.search-bar {
  background-color: #0f172a;
  border: 2px solid #334155;
  border-radius: 20rpx;
  padding: 16rpx 25rpx;
  display: flex;
  align-items: center;
}
.search-icon {
  font-size: 26rpx;
  color: #94a3b8;
  margin-right: 15rpx;
}
.search-input {
  flex: 1;
  color: #ffffff;
  font-size: 26rpx;
  font-weight: bold;
}
.search-clear-btn {
  color: #64748b;
  font-size: 28rpx;
  padding-left: 15rpx;
  font-weight: bold;
}
.filter-card {
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #e2e8f0;
}
.filter-row {
  display: flex;
  align-items: center;
}
.filter-row-labels {
  color: #64748b;
  font-size: 22rpx;
  font-weight: bold;
  white-space: nowrap;
}
.filter-tag-scroll {
  flex: 1;
  white-space: nowrap;
}
.tag-row-content {
  display: flex;
  gap: 15rpx;
}
.filter-tag {
  background-color: #f1f5f9;
  border: 1px solid transparent;
  padding: 10rpx 24rpx;
  border-radius: 12rpx;
  display: inline-block;
}
.filter-tag text {
  color: #334155;
  font-size: 22rpx;
  font-weight: bold;
}
.filter-tag.active {
  background-color: #eff6ff;
  border-color: #2563eb;
}
.filter-tag.active text {
  color: #1e3a8a;
  font-weight: 900;
}
.results-stats {
  padding: 16rpx 30rpx;
  background-color: #cbd5e1;
  border-bottom: 1rpx solid #94a3b8;
  display: flex;
  justify-content: space-between;
}
.stats-text {
  color: #334155;
  font-size: 22rpx;
  font-weight: bold;
}
.stats-shield {
  color: #1e3a8a;
  font-size: 22rpx;
  font-weight: 900;
}

/* Listings style card items */
.listings-scroller {
  padding: 25rpx;
}
.listing-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  border: 1rpx solid #cbd5e1;
  padding: 30rpx;
  margin-bottom: 25rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.03);
}
.list-meta-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.meta-badge-box {
  display: flex;
  gap: 10rpx;
}
.role-badge {
  color: #ffffff;
  font-weight: 900;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}
.bg-orange {
  background-color: #ea580c;
}
.bg-blue {
  background-color: #1d4ed8;
}
.origin-tag {
  background-color: #f1f5f9;
  color: #475569;
  font-size: 20rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}
.time-stamp {
  color: #94a3b8;
  font-size: 20rpx;
  font-weight: bold;
}
.list-card-title {
  color: #0f172a;
  font-size: 28rpx;
  font-weight: 900;
  margin-top: 15rpx;
  display: block;
  line-height: 1.4;
}
.list-grid-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16rpx;
  display: flex;
  padding: 15rpx 0;
  margin-top: 20rpx;
}
.list-gcell {
  flex: 1;
  text-align: center;
  border-right: 1rpx solid #cbd5e1;
}
.border-none {
  border-right: none;
}
.gcell-l {
  color: #64748b;
  font-size: 18rpx;
  display: block;
}
.gcell-v {
  font-size: 24rpx;
  font-weight: 900;
  margin-top: 4rpx;
  display: block;
}
.text-blue {
  color: #1e3a8a;
}
.text-rose {
  color: #e11d48;
}
.badges-row {
  display: flex;
  gap: 12rpx;
  margin-top: 15rpx;
}
.trust-subbadge {
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}
.trust-subbadge.style-b {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1rpx solid #bfdbfe;
}
.trust-subbadge.style-e {
  background-color: #ecfdf5;
  color: #059669;
  border: 1rpx solid #a7f3d0;
}
.list-footer {
  border-top: 1rpx solid #f1f5f9;
  padding-top: 15rpx;
  margin-top: 15rpx;
  display: flex;
  justify-content: space-between;
}
.foot-label {
  color: #475569;
  font-size: 22rpx;
  font-weight: bold;
}
.click-counter {
  color: #94a3b8;
  font-size: 20rpx;
}

/* Detail UI Screen */
.detail-container {
  background-color: #ffffff;
  padding: 30rpx;
  min-height: 100%;
}
.back-btn {
  background-color: #eed1bf;
  background-color: #f1f5f9;
  border: 1rpx solid #cbd5e1;
  padding: 15rpx 25rpx;
  border-radius: 16rpx;
  font-weight: 900;
  color: #0f172a;
  font-size: 26rpx;
  display: inline-block;
  line-height: 1.2;
}
.back-btn::after { border: none; }
.detail-tag-row {
  display: flex;
  align-items: center;
  gap: 15rpx;
}
.badge-role {
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 900;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}
.detail-serial {
  color: #64748b;
  font-size: 22rpx;
  font-family: monospace;
}
.detail-heading {
  color: #0f172a;
  font-size: 34rpx;
  font-weight: 900;
  margin-top: 15rpx;
  display: block;
}
.cred-banner-block {
  background-color: #eff6ff;
  border: 1rpx solid #bfdbfe;
  padding: 20rpx;
  border-radius: 20rpx;
}
.cred-heading-title {
  color: #1e3a8a;
  font-size: 24rpx;
  font-weight: 900;
}
.badge-pills {
  display: flex;
  gap: 15rpx;
  margin-top: 12rpx;
}
.pill-badge {
  font-size: 20rpx;
  font-weight: 900;
  padding: 6rpx 16rpx;
  border-radius: 10rpx;
}
.pill-badge.style-blue {
  background-color: #dbeafe;
  color: #1e3a8a;
  border: 1px solid #bdf0ff;
}
.pill-badge.style-emerald {
  background-color: #d1fae5;
  color: #065f46;
}
.pill-badge.style-gray {
  background-color: #e2e8f0;
  color: #64748b;
}
.grid-card-specs {
  background-color: #f8fafc;
  border: 1rpx solid #cbd5e1;
  border-radius: 24rpx;
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx;
}
.grid-cell {
  flex: 1;
  min-width: 40%;
  padding: 15rpx;
  box-sizing: border-box;
}
.cell-l {
  color: #64748b;
  font-size: 20rpx;
  display: block;
}
.cell-v {
  color: #0f172a;
  font-size: 30rpx;
  font-weight: 900;
  display: block;
  margin-top: 4rpx;
}
.field-info {
  display: flex;
  flex-direction: column;
}
.field-title {
  color: #475569;
  font-size: 24rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
}
.media-flex {
  display: flex;
  gap: 15rpx;
}
.media-preview {
  width: 150rpx;
  height: 150rpx;
  border-radius: 12rpx;
  border: 1rpx solid #cbd5e1;
}
.fallback-field-info {
  background-color: #f1f5f9;
  padding: 24rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}
.avatar-holder {
  width: 80rpx;
  height: 80rpx;
  background-color: #dbeafe;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.av-t {
  color: #475569;
  font-size: 22rpx;
  display: block;
}
.av-s {
  color: #1e293b;
  font-size: 22rpx;
  font-weight: bold;
}
.description-text-box {
  background-color: #f8fafc;
  border: 1rpx solid #e2e8f0;
  padding: 24rpx;
  border-radius: 20rpx;
}
.desc-text {
  color: #334155;
  font-size: 26rpx;
  line-height: 1.6;
}
.cta-direct-box {
  background-color: #f59e0b;
  border: 2px solid #ea580c;
  border-radius: 32rpx;
  padding: 30rpx;
}
.cta-header {
  display: flex;
  justify-content: space-between;
}
.cta-stamp {
  background-color: #451a03;
  color: #fef08a;
  font-size: 18rpx;
  border-radius: 20rpx;
  padding: 4rpx 16rpx;
  display: inline-block;
  font-weight: bold;
}
.cta-name {
  color: #0f172a;
  font-size: 38rpx;
  font-weight: 950;
  display: block;
  margin-top: 8rpx;
}
.cta-rank {
  color: #451a03;
  font-size: 22rpx;
  display: block;
}
.cta-graphic {
  font-size: 50rpx;
  opacity: 0.25;
}
.cta-buttons-block {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}
.call-cta-btn {
  background-color: #020617;
  border: none;
  border-radius: 20rpx;
  padding: 22rpx 0;
  line-height: 1.5;
}
.call-cta-btn::after { border: none; }
.call-cta-btn text {
  color: #fde047;
  font-size: 28rpx;
  font-weight: 950;
}
.share-poster-cta {
  background-color: #1e3a8a;
  border: none;
  border-radius: 20rpx;
  padding: 20rpx 0;
  line-height: 1.5;
}
.share-poster-cta::after { border: none; }
.share-poster-cta text {
  color: #ffffff;
  font-size: 24rpx;
  font-weight: bold;
}
.detail-bottom-remark {
  text-align: center;
  color: #94a3b8;
  font-size: 18rpx;
  margin-top: 20rpx;
}

/* Empty View */
.empty-layout {
  text-align: center;
  padding: 80rpx 0;
}
.empty-icon {
  font-size: 80rpx;
}
.empty-title {
  color: #020617;
  font-size: 30rpx;
  font-weight: bold;
  display: block;
  margin-top: 20rpx;
}
.empty-subtitle {
  color: #64748b;
  font-size: 22rpx;
  display: block;
  margin-top: 8rpx;
  max-width: 400rpx;
  margin-left: auto;
  margin-right: auto;
}
.empty-reset-btn {
  margin-top: 30rpx;
  background-color: #1e3a8a;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: bold;
  display: inline-block;
  padding: 10rpx 40rpx;
  border-radius: 12rpx;
}
.empty-reset-btn::after { border: none; }

/* Publish Form Styles */
.publish-container {
  padding: 25rpx;
}
.form-card {
  background-color: #ffffff;
  border-radius: 32rpx;
  border: 1px solid #cbd5e1;
  padding: 30rpx;
}
.form-header-line {
  border-bottom: 2rpx dashed #cbd5e1;
  padding-bottom: 15rpx;
  margin-bottom: 20rpx;
}
.card-caption {
  color: #64748b;
  font-size: 22rpx;
  font-weight: bold;
}
.form-row-item {
  display: flex;
  flex-direction: column;
}
.frm-label {
  color: #334155;
  font-size: 22rpx;
  font-weight: 900;
  margin-bottom: 10rpx;
}
.flex-row-wrap {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.radio-label {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  font-weight: bold;
  color: #1e293b;
}
.checkbox-label {
  display: flex;
  align-items: center;
}
.input-control {
  background-color: #f1f5f9;
  border: 1rpx solid #cbd5e1;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #1e293b;
}
.textarea-control {
  background-color: #f1f5f9;
  border: 1rpx solid #cbd5e1;
  border-radius: 16rpx;
  padding: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #1e293b;
  width: 100%;
  height: 120rpx;
  box-sizing: border-box;
}
.picker-display-box {
  background-color: #f1f5f9;
  border: 1rpx solid #cbd5e1;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
}
.picker-text {
  color: #1e3a8a;
  font-size: 24rpx;
  font-weight: 900;
}
.qty-flex {
  display: flex;
  gap: 15rpx;
}
.flex-1 {
  flex: 1;
}
.picker-shrink {
  flex-shrink: 0;
}
.unit-selector {
  background-color: #e2e8f0;
  border: 1px solid #cbd5e1;
  border-radius: 16rpx;
  padding: 20rpx 30rpx;
  font-weight: 900;
  font-size: 24rpx;
}
.price-input-flex {
  display: flex;
  align-items: center;
  gap: 15rpx;
}
.util-text {
  font-size: 22rpx;
  font-weight: bold;
  color: #475569;
}
.negotiable-checkbox {
  margin-top: 10rpx;
}
.credentials-trigger-box {
  background-color: #eff6ff;
  border: 1rpx solid #bfdbfe;
  border-radius: 20rpx;
  padding: 20rpx;
}
.triggers-heading {
  color: #0369a1;
  font-size: 22rpx;
  font-weight: 900;
  display: block;
}
.trigger-switch-list {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}
.option-check-row {
  display: flex;
  align-items: start;
  gap: 15rpx;
}
.opt-desc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.opt-main {
  color: #0f172a;
  font-size: 22rpx;
  font-weight: 900;
}
.opt-sub {
  color: #64748b;
  font-size: 18rpx;
}
.submit-form-btn {
  width: 100%;
  background-color: #1e3a8a;
  padding: 24rpx 0;
  border-radius: 20rpx;
  line-height: 1.5;
}
.submit-form-btn text {
  color: #fbbf24;
  font-size: 28rpx;
  font-weight: 950;
}

/* Profile / Personal screen */
.profile-container {
  padding: 25rpx;
}
.cred-identity-card {
  background: linear-gradient(to right, #0b1329, #172554, #0f172a);
  border-bottom: 8rpx solid #f59e0b;
  border-radius: 24rpx;
  padding: 30rpx;
  color: #ffffff;
}
.cred-card-header {
  display: flex;
  justify-content: space-between;
}
.cred-person {
  display: flex;
  gap: 15rpx;
}
.person-circle {
  width: 70rpx;
  height: 70rpx;
  background-color: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.person-details {
  display: flex;
  flex-direction: column;
}
.person-name {
  font-size: 30rpx;
  font-weight: 900;
}
.person-origin {
  font-size: 18rpx;
  color: #93c5fd;
  margin-top: 4rpx;
}
.stamp-rating {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.rating-badge {
  color: #34d399;
  font-size: 20rpx;
  font-weight: bold;
}
.rating-stars {
  color: #fbbf24;
  font-size: 24rpx;
  margin-top: 4rpx;
}
.cred-footer {
  border-top: 1rpx dashed rgba(255,255,255,0.1);
  padding-top: 15rpx;
  margin-top: 20rpx;
  display: flex;
  justify-content: space-between;
}
.cred-id-no {
  color: #94a3b8;
  font-size: 20rpx;
  font-family: monospace;
}
.cred-trust-mark {
  color: #fde047;
  font-size: 20rpx;
  font-weight: bold;
}

/* Calculator Card widget */
.calculator-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  border: 1px solid #cbd5e1;
  padding: 30rpx;
}
.calc-header {
  border-bottom: 1rpx solid #f1f5f9;
  padding-bottom: 15rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.calc-badge {
  background-color: #0b1329;
  color: #fbbf24;
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}
.calc-title {
  color: #1e293b;
  font-size: 22rpx;
  font-weight: bold;
}
.calc-row {
  display: flex;
  align-items: center;
}
.calc-frm-lbl {
  color: #475569;
  font-size: 22rpx;
  font-weight: bold;
  width: 180rpx;
}
.calc-input {
  flex: 1;
  border-bottom: 2rpx solid #3b82f6;
  padding: 10rpx 0;
  font-size: 26rpx;
  font-weight: bold;
  color: #0f172a;
}
.calc-unit {
  color: #64748b;
  font-size: 22rpx;
  font-weight: bold;
  padding-left: 15rpx;
}
.calc-result-indicators {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20rpx;
  display: flex;
  padding: 20rpx 0;
}
.indicator-item {
  flex: 1;
  text-align: center;
  border-right: 1rpx solid #e2e8f0;
}
.calc-l-tag {
  color: #64748b;
  font-size: 18rpx;
  display: block;
}
.calc-v-highlight {
  font-size: 28rpx;
  font-weight: 950;
  display: block;
  margin-top: 4rpx;
}
.text-emerald {
  color: #059669;
}
.calc-disclaimer {
  color: #94a3b8;
  font-size: 16rpx;
  margin-top: 15rpx;
  display: block;
}

/* Management box listing items */
.management-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  border: 1px solid #cbd5e1;
  padding: 30rpx;
}
.mgr-header {
  border-bottom: 1rpx solid #f1f5f9;
  padding-bottom: 15rpx;
  display: flex;
  justify-content: space-between;
}
.mgr-title {
  color: #0f172a;
  font-size: 22rpx;
  font-weight: bold;
}
.mgr-qty {
  background-color: #eff6ff;
  color: #1e3a8a;
  font-size: 20rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}
.mgr-item-card {
  background-color: #f8fafc;
  border-radius: 16rpx;
  border: 1rpx solid #cbd5e1;
  padding: 24rpx;
}
.mgr-item-headline {
  display: flex;
  justify-content: space-between;
}
.mgr-item-title {
  color: #1e293b;
  font-size: 24rpx;
  font-weight: bold;
}
.mgr-item-spec {
  color: #b91c1c;
  font-size: 20rpx;
  font-weight: bold;
}
.mgr-item-stats {
  display: flex;
  justify-content: space-between;
}
.stats-origin {
  color: #64748b;
  font-size: 22rpx;
  font-weight: bold;
}
.mgr-item-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15rpx;
}
.action-btn-blue {
  background-color: #1e3a8a;
  padding: 8rpx 20rpx;
  border-radius: 8rpx;
  line-height: 1.2;
}
.action-btn-blue::after { border: none; }
.action-btn-blue text {
  color: #ffffff;
  font-size: 20rpx;
  font-weight: bold;
}
.action-btn-rose {
  background-color: none;
  border: 1px solid #fca5a5;
  padding: 8rpx 20rpx;
  border-radius: 8rpx;
  line-height: 1.2;
}
.action-btn-rose::after { border: none; }
.action-btn-rose text {
  color: #b91c1c;
  font-size: 20rpx;
  font-weight: bold;
}
.controls-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  border: 1px solid #cbd5e1;
}
.control-row-clickable {
  padding: 25rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clickable-left {
  display: flex;
  align-items: center;
  gap: 15rpx;
}
.row-icon {
  font-size: 28rpx;
}
.row-text {
  color: #1e293b;
  font-size: 24rpx;
  font-weight: bold;
}
.custom-border-top {
  border-top: 1rpx solid #f1f5f9;
}
.senior-indicator {
  background-color: #cbd5e1;
  color: #475569;
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 16rpx;
  border-radius: 12rpx;
}
.senior-indicator.on {
  background-color: #fbbf24;
  color: #020617;
}
.row-remark {
  color: #94a3b8;
  font-size: 20rpx;
}
.center-remark {
  text-align: center;
}
.center-remark text {
  display: block;
  color: #94a3b8;
  font-size: 18rpx;
  margin-top: 6rpx;
}

/* High Quality WeChat Sharing modal block wrapper */
.poster-overlay-modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 800;
}
.modal-card {
  background-color: #0f172a;
  border-top: 4rpx solid #1e3a8a;
  border-radius: 36rpx 36rpx 0 0;
  padding: 30rpx;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.modal-card-header {
  border-bottom: 1rpx solid #1e293b;
  padding-bottom: 15rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
}
.modal-title {
  color: #93c5fd;
  font-size: 24rpx;
  font-weight: bold;
}
.modal-close-icon {
  color: #94a3b8;
  font-size: 28rpx;
  font-weight: bold;
}
.poster-render-frame {
  background-color: #f8fafc;
  border: 4rpx solid #1e3a8a;
  border-radius: 24rpx;
  overflow: hidden;
  max-width: 440rpx;
  margin-left: auto;
  margin-right: auto;
}
.poster-navy-header {
  background-color: #1e3a8a;
  padding: 24rpx;
  text-align: center;
}
.poster-main-head {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 900;
  display: block;
}
.poster-sub-head {
  color: #93c5fd;
  font-size: 14rpx;
  display: block;
  margin-top: 4rpx;
}
.poster-body-layout {
  padding: 24rpx;
}
.dcol-pills {
  display: flex;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 16rpx;
}
.dpill-item {
  flex: 1;
  padding: 12rpx;
  text-align: center;
}
.border-left {
  border-left: 1px solid #bfdbfe;
}
.dpill-l {
  color: #475569;
  font-size: 18rpx;
  display: block;
}
.dpill-v {
  font-weight: 900;
  font-size: 24rpx;
  display: block;
  margin-top: 4rpx;
}
.text-cyan {
  color: #0891b2;
}
.poster-content-card {
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 16rpx;
  padding: 15rpx;
}
.pc-row {
  display: flex;
  justify-content: space-between;
}
.pc-label {
  color: #64748b;
  font-size: 22rpx;
}
.pc-value {
  color: #0f172a;
  font-size: 24rpx;
}
.pc-desc-block {
  border-top: 1px dashed #e2e8f0;
  padding-top: 15rpx;
}
.pc-desc-label {
  color: #64748b;
  font-size: 20rpx;
  display: block;
}
.pc-desc-content {
  color: #1e293b;
  font-size: 22rpx;
  display: block;
  margin-top: 8rpx;
  line-height: 1.5;
}
.poster-badge-flex {
  display: flex;
  gap: 15rpx;
  justify-content: center;
}
.trust-badge-pill {
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 40rpx;
}
.trust-badge-pill.style-blue {
  background-color: #eff6ff;
  color: #1e3a8a;
  border: 1px solid #bfdbfe;
}
.trust-badge-pill.style-green {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.poster-qr-dark-strip {
  background-color: #020617;
  border-radius: 16rpx;
  padding: 20rpx;
  display: flex;
}
.qr-label-area {
  flex: 1;
}
.sticker-badge {
  color: #020617;
  font-size: 16rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  display: inline-block;
}
.qr-id {
  color: #64748b;
  font-size: 20rpx;
  font-family: monospace;
  display: block;
  margin-top: 8rpx;
}
.qr-prompt {
  color: #ffffff;
  font-size: 20rpx;
  display: block;
}
.qr-subprompt {
  color: #64748b;
  font-size: 16rpx;
  display: block;
}
.qr-canvas-holder {
  width: 100rpx;
  height: 100rpx;
  background-color: #ffffff;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mini-qr-box {
  width: 80rpx;
  height: 80rpx;
  border: 1px solid #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.corner-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #000;
  position: absolute;
}
.top-left { left: 4rpx; top: 4rpx; }
.top-right { right: 4rpx; top: 4rpx; }
.bottom-left { left: 4rpx; bottom: 4rpx; }
.qr-center-char {
  font-size: 16rpx;
  font-weight: 900;
  color: #1e3a8a;
}
.contact-dashed-card {
  background-color: #ffffff;
  border: 2rpx dashed #ef4444;
  border-radius: 8rpx;
  padding: 10rpx;
  text-align: center;
}
.ct-info {
  color: #b91c1c;
  font-size: 20rpx;
  font-weight: bold;
}
.poster-rendered-remark {
  background-color: #cbd5e1;
  text-align: center;
  padding: 8rpx;
}
.poster-rendered-remark text {
  color: #334155;
  font-size: 16rpx;
  font-weight: bold;
}
.modal-cta-buttons {
  display: flex;
  flex-direction: column;
}
.cta-save-img-btn {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  padding: 22rpx 0;
  border-radius: 20rpx;
  line-height: 1.5;
}
.cta-save-img-btn::after { border: none; }
.cta-save-img-btn text {
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 950;
}
.cta-copy-btn {
  background-color: #1e293b;
  border: 1px solid #fbbf24;
  padding: 20rpx 0;
  border-radius: 20rpx;
  line-height: 1.5;
}
.cta-copy-btn::after { border: none; }
.cta-copy-btn text {
  color: #fbbf24;
  font-size: 24rpx;
  font-weight: bold;
}
.tips-box {
  background-color: #020617;
  padding: 15rpx;
  border-radius: 8rpx;
}
.tips-text {
  color: #94a3b8;
  font-size: 18rpx;
  line-height: 1.4;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
