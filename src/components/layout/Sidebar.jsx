import MaterialIcon from '../common/MaterialIcon';
import { useApp } from '../../context/AppContext';
import { PAGES } from '../../utils/constants';

const NAV_ITEMS = [
  { page: PAGES.DASHBOARD, icon: 'dashboard', label: 'Tổng quan' },
  { page: PAGES.TRANSACTIONS, icon: 'receipt_long', label: 'Lịch sử giao dịch' },
  { page: PAGES.CATEGORIES, icon: 'category', label: 'Quản lý danh mục' },
];

/**
 * Sidebar — menu điều hướng desktop
 */
export default function Sidebar() {
  const { currentPage, setCurrentPage, theme, toggleTheme } = useApp();

  return (
    <nav className="hidden lg:flex flex-col fixed left-0 top-0 h-full border-r border-outline-variant pt-8 pb-[var(--spacing-lg)] px-[var(--spacing-md)] w-64 bg-surface-container-low z-40 transition-all duration-300">
      {/* Logo & Branding */}
      <div className="mb-[var(--spacing-xl)] px-[var(--spacing-sm)] flex flex-col items-start">
        <h1 className="text-2xl font-bold text-primary tracking-tight">
          Clarity Finance
        </h1>
        <p className="text-xs font-medium text-on-surface-variant mt-1">
          Quản lý chi tiêu
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-[var(--spacing-sm)] flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`flex items-center gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-sm)] rounded-xl transition-all active:translate-x-1 duration-150 text-sm ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-medium'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <MaterialIcon name={item.icon} filled={isActive} className={isActive ? 'text-primary' : ''} />
              <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dark Mode Toggle at the bottom */}
      <div className="pt-[var(--spacing-md)] border-t border-outline-variant mt-auto">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-[var(--spacing-md)] px-[var(--spacing-md)] py-[var(--spacing-sm)] rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-98 duration-150 text-sm w-full text-left"
          title={theme === 'dark' ? 'Chuyển sang Chế độ sáng' : 'Chuyển sang Chế độ tối'}
        >
          <MaterialIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} />
          <span>{theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}</span>
        </button>
      </div>
    </nav>
  );
}

