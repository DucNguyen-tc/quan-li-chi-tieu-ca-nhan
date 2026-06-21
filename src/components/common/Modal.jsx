import { useEffect, useRef } from 'react';
import MaterialIcon from './MaterialIcon';

/**
 * Modal — overlay popup
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null);

  // Đóng khi nhấn Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center sm:justify-end px-[var(--spacing-gutter)] sm:px-0 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0b1c30]/20 backdrop-blur-sm" />

      {/* Panel (side panel on desktop, centered on mobile) */}
      <div
        ref={panelRef}
        className="relative w-full sm:w-[448px] bg-surface h-auto max-h-[90vh] sm:h-screen sm:max-h-screen rounded-2xl sm:rounded-none sm:rounded-l-2xl shadow-xl border border-outline-variant overflow-hidden flex flex-col shrink-0 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-[var(--spacing-lg)] border-b border-outline-variant bg-surface-container-low">
          <h2 className="text-2xl font-semibold text-on-surface">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-outline-variant text-on-surface-variant transition-colors"
          >
            <MaterialIcon name="close" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

