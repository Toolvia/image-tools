import React, { useState, useEffect } from 'react';
import {
  ADMIN_CONFIG,
  AdConfig,
  AnalyticsConfig,
  getStoredAdConfig,
  saveStoredAdConfig,
  getStoredAnalyticsConfig,
  saveStoredAnalyticsConfig,
  resetConfigToCodeDefaults,
  DEFAULT_AD_CONFIG,
  DEFAULT_ANALYTICS_CONFIG,
} from '../config';
import { trackEvent, initGA } from '../utils/analytics';
import {
  Shield,
  Lock,
  User,
  Key,
  BarChart3,
  DollarSign,
  Save,
  RotateCcw,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  Code2,
  Check,
  X,
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('picswift_admin_auth') === 'true';
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'ads' | 'code'>('analytics');

  // Config States
  const [adConfig, setAdConfig] = useState<AdConfig>(getStoredAdConfig());
  const [analyticsConfig, setAnalyticsConfig] = useState<AnalyticsConfig>(getStoredAnalyticsConfig());
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [testGaSuccess, setTestGaSuccess] = useState(false);

  useEffect(() => {
    // Reload stored configs when opened
    setAdConfig(getStoredAdConfig());
    setAnalyticsConfig(getStoredAnalyticsConfig());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameInput.trim() === ADMIN_CONFIG.username &&
      passwordInput === ADMIN_CONFIG.password
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('picswift_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không chính xác! (Kiểm tra ADMIN_CONFIG trong file src/config.ts)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('picswift_admin_auth');
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleSaveAll = () => {
    saveStoredAdConfig(adConfig);
    saveStoredAnalyticsConfig(analyticsConfig);

    // Apply GA changes immediately
    if (analyticsConfig.enabled && analyticsConfig.gaMeasurementId) {
      initGA(analyticsConfig.gaMeasurementId);
    }

    setSaveSuccessMsg('Đã lưu cấu hình thành công! Thay đổi có hiệu lực ngay lập tức.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ cài đặt về giá trị mặc định trong file code src/config.ts?')) {
      resetConfigToCodeDefaults();
      setAdConfig(DEFAULT_AD_CONFIG);
      setAnalyticsConfig(DEFAULT_ANALYTICS_CONFIG);
      setSaveSuccessMsg('Đã khôi phục cài đặt mặc định từ code!');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  const handleSendTestGAEvent = () => {
    if (!analyticsConfig.enabled || !analyticsConfig.gaMeasurementId) {
      alert('Vui lòng bật Google Analytics và nhập mã GA Measurement ID hợp lệ trước khi gửi test!');
      return;
    }
    trackEvent('admin_test_event', {
      timestamp: new Date().toISOString(),
      source: 'admin_dashboard',
      action: 'test_connection',
    });
    setTestGaSuccess(true);
    setTimeout(() => setTestGaSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">Admin Control Center</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Hidden Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quản lý Google Analytics, Quảng cáo AdSense và cấu hình hệ thống
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            title="Đóng bảng Admin"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* --- 1. MÀN HÌNH ĐĂNG NHẬP (NẾU CHƯA XÁC THỰC) --- */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="h-14 w-14 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner">
                <Lock className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Xác Thực Quản Trị Viên
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Nhập tài khoản quản trị để truy cập và chỉnh sửa ID Analytics & Quảng cáo.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tài khoản (Username)
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Nhập tên đăng nhập (mặc định: admin)"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mật khẩu (Password)
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Nhập mật khẩu (mặc định: adminpassword123)"
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Đăng Nhập Vào Bảng Quản Trị</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  💡 Bạn có thể đổi trực tiếp tài khoản & mật khẩu trong file code <code className="text-indigo-600 dark:text-indigo-400 font-mono">src/config.ts</code>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* --- 2. DASHBOARD QUẢN TRỊ (KHI ĐÃ ĐĂNG NHẬP) --- */
          <div>
            {/* Navigation Tabs */}
            <div className="flex items-center justify-between px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                    activeTab === 'analytics'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Google Analytics (GA4)</span>
                </button>

                <button
                  onClick={() => setActiveTab('ads')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                    activeTab === 'ads'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Quảng Cáo & AdSense</span>
                </button>

                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                    activeTab === 'code'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Code2 className="h-4 w-4" />
                  <span>Code & Hướng Dẫn</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>

            {/* Thông báo lưu thành công */}
            {saveSuccessMsg && (
              <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{saveSuccessMsg}</span>
              </div>
            )}

            {/* Tab Contents */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              
              {/* TAB 1: GOOGLE ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                        Trạng Thái Google Analytics (GA4)
                      </h4>
                      <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80 mt-0.5">
                        Tự động chèn script gtag.js, theo dõi lượt xem trang (Pageviews) và sự kiện xử lý ảnh.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsConfig.enabled}
                        onChange={(e) =>
                          setAnalyticsConfig({ ...analyticsConfig, enabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                      <span className="ml-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {analyticsConfig.enabled ? 'Đang Bật' : 'Đang Tắt'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Google Analytics 4 Measurement ID:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="G-XXXXXXXXXX (ví dụ: G-AB12CD34EF)"
                        value={analyticsConfig.gaMeasurementId}
                        onChange={(e) =>
                          setAnalyticsConfig({
                            ...analyticsConfig,
                            gaMeasurementId: e.target.value.trim(),
                          })
                        }
                        className="w-full px-4 py-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Lấy mã này trong Google Analytics: <em>Quản trị (Admin) &gt; Luồng dữ liệu (Data Streams) &gt; Mã đo lường (Measurement ID)</em>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendTestGAEvent}
                      className="px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Gửi Sự Kiện Thử Nghiệm Lên GA4</span>
                    </button>

                    {testGaSuccess && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Check className="h-4 w-4" />
                        Đã kích hoạt event qua gtag! Kiểm tra mục Realtime trong GA.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: QUẢNG CÁO & ADSENSE */}
              {activeTab === 'ads' && (
                <div className="space-y-5">
                  {/* Bật / Tắt Toàn Bộ Ads */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Kích Hoạt Hiển Thị Banner Quảng Cáo (Global Ads)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Bật hoặc tắt tất cả các vị trí quảng cáo trên toàn bộ website với 1 chạm.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adConfig.enableAds}
                        onChange={(e) => setAdConfig({ ...adConfig, enableAds: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
                      <span className="ml-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {adConfig.enableAds ? 'Đang Bật Ads' : 'Đang Tắt Ads'}
                      </span>
                    </label>
                  </div>

                  {/* Chế độ Demo vs AdSense Thật */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Chế Độ Quảng Cáo Demo / Mock Placeholder
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Khi bật: Hiển thị banner thiết kế mẫu đẹp mắt. Khi tắt: Chèn mã Google AdSense thật từ Publisher ID.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adConfig.showDemoAds}
                        onChange={(e) => setAdConfig({ ...adConfig, showDemoAds: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                      <span className="ml-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {adConfig.showDemoAds ? 'Demo Banners' : 'Google AdSense Thật'}
                      </span>
                    </label>
                  </div>

                  {/* AdSense Publisher Client ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Google AdSense Client ID (Publisher ID):
                    </label>
                    <input
                      type="text"
                      placeholder="ca-pub-XXXXXXXXXXXXXXXX (ví dụ: ca-pub-1234567890123456)"
                      value={adConfig.adSenseClientId}
                      onChange={(e) =>
                        setAdConfig({ ...adConfig, adSenseClientId: e.target.value.trim() })
                      }
                      className="w-full px-4 py-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Slot IDs Grid */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
                      Cấu Hình Slot ID Từng Vị Trí Quảng Cáo:
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Header Top Banner Slot ID:
                        </label>
                        <input
                          type="text"
                          value={adConfig.headerSlot}
                          onChange={(e) => setAdConfig({ ...adConfig, headerSlot: e.target.value.trim() })}
                          className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Inline Tool Banner Slot ID:
                        </label>
                        <input
                          type="text"
                          value={adConfig.inlineSlot}
                          onChange={(e) => setAdConfig({ ...adConfig, inlineSlot: e.target.value.trim() })}
                          className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Sidebar (300x250) Slot ID:
                        </label>
                        <input
                          type="text"
                          value={adConfig.sidebarSlot}
                          onChange={(e) => setAdConfig({ ...adConfig, sidebarSlot: e.target.value.trim() })}
                          className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Download Modal Popup Slot ID:
                        </label>
                        <input
                          type="text"
                          value={adConfig.downloadSlot}
                          onChange={(e) => setAdConfig({ ...adConfig, downloadSlot: e.target.value.trim() })}
                          className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Skyscraper Trái (160x600) Slot ID:
                        </label>
                        <input
                          type="text"
                          value={adConfig.skyscraperLeftSlot}
                          onChange={(e) => setAdConfig({ ...adConfig, skyscraperLeftSlot: e.target.value.trim() })}
                          className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Skyscraper Phải (160x600) Slot ID:
                        </label>
                        <input
                          type="text"
                          value={adConfig.skyscraperRightSlot}
                          onChange={(e) => setAdConfig({ ...adConfig, skyscraperRightSlot: e.target.value.trim() })}
                          className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CODE & HƯỚNG DẪN */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                      <span>📁 Đường dẫn file code:</span>
                      <span className="text-indigo-400">src/config.ts</span>
                    </div>
                    <p className="text-slate-400">// Bạn có thể mở file src/config.ts để sửa trực tiếp trong code:</p>
                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
{`export const ADMIN_CONFIG = {
  username: '${ADMIN_CONFIG.username}',
  password: '*** (ẩn)',
};

export const DEFAULT_AD_CONFIG = {
  enableAds: ${adConfig.enableAds},
  showDemoAds: ${adConfig.showDemoAds},
  adSenseClientId: '${adConfig.adSenseClientId}',
};

export const DEFAULT_ANALYTICS_CONFIG = {
  gaMeasurementId: '${analyticsConfig.gaMeasurementId}',
  enabled: ${analyticsConfig.enabled},
};`}
                    </pre>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      Cách Truy Cập Bảng Quản Trị Bí Mật:
                    </h5>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Truy cập trực tiếp qua đường dẫn: <code className="text-indigo-600 dark:text-indigo-400 font-bold">/image-tools/admin</code> hoặc <code className="text-indigo-600 dark:text-indigo-400 font-bold">/#admin</code></li>
                      <li>Hoặc sử dụng phím tắt nhanh: <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">Ctrl + Shift + A</kbd> trên bàn phím.</li>
                      <li>Nút truy cập hoàn toàn ẩn đối với người dùng thông thường, bảo vệ an toàn cho trang web của bạn.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                title="Xóa cấu hình trên trình duyệt và lấy lại giá trị gốc từ file code"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Khôi Phục Mặc Định Code</span>
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Đóng
                </button>

                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.02]"
                >
                  <Save className="h-4 w-4" />
                  <span>Lưu Thay Đổi Ngay</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
