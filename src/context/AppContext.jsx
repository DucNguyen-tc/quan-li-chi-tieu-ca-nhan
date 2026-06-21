import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTransactions } from '../hooks/useTransactions';
import { useCategories } from '../hooks/useCategories';
import { DEFAULT_CATEGORIES, STORAGE_KEYS, PAGES } from '../utils/constants';

const AppContext = createContext(null);

/**
 * AppProvider — bọc toàn bộ app, cung cấp state toàn cục
 */
export function AppProvider({ children }) {
  // State chính (lưu localStorage)
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEYS.TRANSACTIONS, []);
  const [categories, setCategories] = useLocalStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
  const [currentPage, setCurrentPage] = useLocalStorage('clarity_page', PAGES.DASHBOARD);
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'light');

  // Toggle theme dark/light
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Effect để cập nhật class trên thẻ html
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Custom hooks xử lý logic nghiệp vụ
  const txActions = useTransactions(transactions, setTransactions);
  const catActions = useCategories(categories, setCategories, transactions);

  const value = {
    // Data
    transactions,
    categories,
    currentPage,
    theme,

    // Navigation & Theme
    setCurrentPage,
    toggleTheme,

    // Transaction actions & computed
    ...txActions,

    // Category actions
    ...catActions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook tiện ích để truy cập AppContext
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp phải được dùng bên trong AppProvider');
  }
  return context;
}
