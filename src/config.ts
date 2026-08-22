// Application Configuration (Admin Settings)
// Administrators can modify AdSense, Google Analytics credentials, and Admin Login directly in this file.

export interface AdminCredentials {
  username: string; // Thay đổi tài khoản Admin trực tiếp tại đây
  password: string; // Thay đổi mật khẩu Admin trực tiếp tại đây
}

export interface AdConfig {
  enableAds: boolean;
  showDemoAds: boolean;
  adSenseClientId: string; // e.g. "ca-pub-1234567890123456"
  headerSlot: string;
  inlineSlot: string;
  sidebarSlot: string;
  downloadSlot: string;
  skyscraperLeftSlot: string;
  skyscraperRightSlot: string;
}

export interface AnalyticsConfig {
  gaMeasurementId: string; // e.g. "G-XXXXXXXXXX"
  enabled: boolean;
}

// 🔐 THÔNG TIN ĐĂNG NHẬP ADMIN (Thay đổi trực tiếp tại đây trong code)
export const ADMIN_CONFIG: AdminCredentials = {
  username: 'DauDau',
  password: 'Dau11042026@@', // Bạn có thể đổi mật khẩu này theo ý muốn
};

// 📢 CẤU HÌNH QUẢNG CÁO MẶC ĐỊNH (Thay đổi trực tiếp tại đây trong code)
export const DEFAULT_AD_CONFIG: AdConfig = {
  enableAds: false,
  showDemoAds: true, // Set to false khi đã có mã Google AdSense thật
  adSenseClientId: 'ca-pub-0000000000000000', // Thay bằng mã AdSense Publisher ID của bạn
  headerSlot: '1234567890',
  inlineSlot: '2345678901',
  sidebarSlot: '3456789012',
  downloadSlot: '4567890123',
  skyscraperLeftSlot: '5678901234',
  skyscraperRightSlot: '6789012345',
};

// 📊 CẤU HÌNH GOOGLE ANALYTICS MẶC ĐỊNH (Thay đổi trực tiếp tại đây trong code)
export const DEFAULT_ANALYTICS_CONFIG: AnalyticsConfig = {
  gaMeasurementId: 'G-DEMO123456', // Thay bằng mã GA4 Measurement ID (ví dụ: G-XXXXXXXXXX)
  enabled: true,
};

// Backward compatibility
export const AD_CONFIG = DEFAULT_AD_CONFIG;
export const ANALYTICS_CONFIG = DEFAULT_ANALYTICS_CONFIG;

// Key lưu trữ localStorage
const STORAGE_KEY_ADS = 'picswift_ad_config';
const STORAGE_KEY_ANALYTICS = 'picswift_analytics_config';

/**
 * Lấy cấu hình quảng cáo hiện tại (Ưu tiên cấu hình Admin lưu trên trình duyệt, fallback về config mặc định trong code)
 */
export function getStoredAdConfig(): AdConfig {
  if (typeof window === 'undefined') return DEFAULT_AD_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ADS);
    if (saved) {
      return { ...DEFAULT_AD_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // Ignore error
  }
  return DEFAULT_AD_CONFIG;
}

/**
 * Lưu cấu hình quảng cáo vào bộ nhớ
 */
export function saveStoredAdConfig(config: AdConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ADS, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('app_config_updated'));
  } catch (err) {
    console.error('Failed to save ad config:', err);
  }
}

/**
 * Lấy cấu hình Google Analytics hiện tại
 */
export function getStoredAnalyticsConfig(): AnalyticsConfig {
  if (typeof window === 'undefined') return DEFAULT_ANALYTICS_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (saved) {
      return { ...DEFAULT_ANALYTICS_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // Ignore error
  }
  return DEFAULT_ANALYTICS_CONFIG;
}

/**
 * Lưu cấu hình Google Analytics
 */
export function saveStoredAnalyticsConfig(config: AnalyticsConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('app_config_updated'));
  } catch (err) {
    console.error('Failed to save analytics config:', err);
  }
}

/**
 * Khôi phục toàn bộ cài đặt về mặc định trong file code
 */
export function resetConfigToCodeDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_ADS);
  localStorage.removeItem(STORAGE_KEY_ANALYTICS);
  window.dispatchEvent(new CustomEvent('app_config_updated'));
}

