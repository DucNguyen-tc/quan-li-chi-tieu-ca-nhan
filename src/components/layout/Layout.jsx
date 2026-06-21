import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

/**
 * Layout — wrapper chính: Sidebar + Content + BottomNav
 */
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />

      <main className="flex-1 pt-6 pb-24 lg:pb-[var(--spacing-lg)] lg:pl-64 min-h-screen">
        <div className="max-w-7xl w-full mx-auto px-[var(--spacing-gutter)] lg:px-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-lg)]">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

