// Loại giao dịch
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// Danh mục mặc định
export const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Ăn uống', icon: 'restaurant', color: '#ef4444' },
  { id: 'cat-2', name: 'Di chuyển', icon: 'directions_car', color: '#3b82f6' },
  { id: 'cat-3', name: 'Lương', icon: 'payments', color: '#10b981' },
  { id: 'cat-4', name: 'Mua sắm', icon: 'shopping_cart', color: '#f59e0b' },
  { id: 'cat-5', name: 'Giải trí', icon: 'sports_esports', color: '#8b5cf6' },
  { id: 'cat-6', name: 'Khác', icon: 'more_horiz', color: '#6b7280' },
];

// Số item mỗi trang
export const ITEMS_PER_PAGE = 10;

// Tên key trong localStorage
export const STORAGE_KEYS = {
  TRANSACTIONS: 'clarity_transactions',
  CATEGORIES: 'clarity_categories',
  THEME: 'clarity_theme',
};

// Tên các trang điều hướng
export const PAGES = {
  DASHBOARD: 'dashboard',
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories',
};
