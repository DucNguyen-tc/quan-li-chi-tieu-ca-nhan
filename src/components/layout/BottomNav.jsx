import MaterialIcon from '../common/MaterialIcon';
import { useApp } from '../../context/AppContext';
import { PAGES } from '../../utils/constants';

const BOTTOM_NAV_ITEMS = [
  { page: PAGES.DASHBOARD, icon: 'home', label: 'Tổng quan' },
  { page: PAGES.TRANSACTIONS, icon: 'list_alt', label: 'Giao dịch' },
  { page: PAGES.CATEGORIES, icon: 'grid_view', label: 'Danh mục' },
];


/**
 * BottomNav — menu điều hướng mobile
 */
export default function BottomNav() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface py-2 px-[var(--spacing-gutter)] border-t border-outline-variant shadow-lg rounded-t-xl transition-transform">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive = currentPage === item.page;
        return (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`flex flex-col items-center justify-center px-4 py-1 rounded-xl active:scale-90 transition-transform ${
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-2xl'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <MaterialIcon name={item.icon} filled={isActive} />
            <span className={`text-[10px] mt-[var(--spacing-xs)] ${isActive ? 'font-bold text-primary' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
