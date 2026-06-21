import MaterialIcon from './MaterialIcon';

/**
 * Pagination — phân trang
 */
export default function Pagination({ currentPage, totalPages, onPageChange, totalItems }) {
  if (totalPages <= 1) return null;

  // Tạo mảng số trang hiển thị
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-outline-variant pt-6 mt-4">
      {totalItems !== undefined && (
        <div className="hidden sm:block text-sm text-on-surface-variant">
          Hiển thị trang {currentPage} / {totalPages} ({totalItems} giao dịch)
        </div>
      )}

      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MaterialIcon name="chevron_left" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="text-on-surface-variant px-2">...</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'border border-transparent text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MaterialIcon name="chevron_right" />
        </button>
      </div>
    </div>
  );
}
