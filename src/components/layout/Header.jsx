import MaterialIcon from '../common/MaterialIcon';
import { useApp } from '../../context/AppContext';

/**
 * Header — thanh trên cùng
 */
export default function Header() {
  const { currentPage, theme, toggleTheme } = useApp();

  // Tiêu đề trang theo current page
  const pageTitle = {
    dashboard: 'Dashboard',
    transactions: 'Lịch sử giao dịch',
    categories: 'Quản Lý Danh Mục',
  }[currentPage] || '';

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[var(--spacing-gutter)] h-16 bg-surface border-b border-outline-variant lg:pl-72 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-[var(--spacing-md)]">
        {/* Tên app trên mobile */}
        <span className="text-2xl font-bold text-primary lg:hidden">
          Clarity Finance
        </span>
        {/* Tiêu đề trang trên desktop */}
        <span className="text-xl font-bold text-on-surface hidden lg:block">
          {pageTitle}
        </span>
      </div>

      <div className="flex items-center gap-[var(--spacing-md)]">
        {/* Nút Dark mode */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
          title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
        >
          <MaterialIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} />
        </button>

        {/* Nút Export */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-200"
          title="Xuất dữ liệu"
        >
          <MaterialIcon name="file_download" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-sm font-bold ml-[var(--spacing-sm)] border border-outline-variant">
          U
        </div>
      </div>
    </header>
  );
}
