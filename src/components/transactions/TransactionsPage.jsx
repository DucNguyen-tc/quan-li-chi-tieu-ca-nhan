import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import MaterialIcon from '../common/MaterialIcon';
import { formatSignedCurrency, formatDateShort } from '../../utils/formatters';
import Pagination from '../common/Pagination';
import ConfirmDialog from '../common/ConfirmDialog';
import TransactionCalendar from './TransactionCalendar';
import { ITEMS_PER_PAGE } from '../../utils/constants';

/**
 * TransactionsPage — trang quản lý giao dịch
 * Chuyển đổi từ Stitch screen "Giao Dịch - Thêm Giao Dịch Mới (Modal)"
 */
export default function TransactionsPage({ onAdd, onEdit }) {
  const { getFiltered, deleteTransaction, getCategoryById, categories, transactions } = useApp();

  // State bộ lọc
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    categoryId: '',
    dateFrom: '',
    dateTo: '',
    sortOrder: 'desc',
  });

  // Chế độ xem: 'list' | 'calendar'
  const [viewMode, setViewMode] = useState('list');

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // State confirm dialog
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Lọc giao dịch
  const filteredTransactions = getFiltered(filters);
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Update filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset về trang 1 khi lọc
  };

  // Export JSON
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clarity-finance-transactions-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteTransaction(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] animate-fade-in pt-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <h1 className="text-2xl md:text-[32px] font-semibold text-on-surface leading-8 md:leading-10">
            Lịch sử giao dịch
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Quản lý và theo dõi dòng tiền của bạn.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-[var(--spacing-md)]">
          {/* View Toggle */}
          <div className="bg-surface-container-high rounded-lg p-1 inline-flex hidden md:flex">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-full transition-all flex items-center justify-center gap-2 text-sm font-medium ${viewMode === 'list' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="Xem danh sách"
            >
              <MaterialIcon name="view_list" className="text-xl" />
              Xem danh sách
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-full transition-all flex items-center justify-center gap-2 text-sm font-medium ${viewMode === 'calendar' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="Xem theo lịch"
            >
              <MaterialIcon name="calendar_month" className="text-xl" />
              Xem theo lịch
            </button>
          </div>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center justify-center gap-2 border-2 border-outline text-on-surface rounded-full px-6 py-2 hover:bg-surface-container-low transition-colors text-xs font-medium active:scale-95"
          >
            <MaterialIcon name="data_object" className="text-lg" />
            Xuất JSON
          </button>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-[var(--spacing-lg)] py-2.5 bg-primary text-on-primary rounded-xl font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <MaterialIcon name="add" className="text-lg" />
            Thêm giao dịch
          </button>

        </div>
      </div>

      {/* Filters Toolbar */}
      {viewMode === 'list' && (
        <div className="bg-surface rounded-xl border border-outline-variant p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder-on-surface-variant/50"
            />
          </div>

          {/* Type Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value)}
              className="w-full appearance-none bg-background border border-outline-variant rounded-lg pl-4 pr-10 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option value="all">Tất cả loại</option>
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
            <MaterialIcon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[180px]">
            <select
              value={filters.categoryId}
              onChange={(e) => updateFilter('categoryId', e.target.value)}
              className="w-full appearance-none bg-background border border-outline-variant rounded-lg pl-4 pr-10 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <MaterialIcon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>

          {/* Date Range */}
          <div className="relative flex items-center gap-2 min-w-[300px]">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <span className="text-on-surface-variant">-</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
              className="w-full bg-background border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          {/* Sort */}
          <div className="relative min-w-[200px]">
            <select
              value={filters.sortOrder}
              onChange={(e) => updateFilter('sortOrder', e.target.value)}
              className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-10 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option value="desc">Mới nhất trước</option>
              <option value="asc">Cũ nhất trước</option>
            </select>
            <MaterialIcon name="sort" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            <MaterialIcon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>
        </div>
      )}

      {/* View Content */}
      {viewMode === 'calendar' ? (
        <TransactionCalendar 
          transactions={filteredTransactions} 
          categories={categories} 
        />
      ) : (
        <>
          {/* Transaction List */}
          <div className="flex flex-col gap-3">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => {
                const cat = getCategoryById(tx.categoryId);
                const isIncome = tx.type === 'income';
                return (
                  <div
                    key={tx.id}
                    className="bg-surface rounded-xl border border-outline-variant p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: isIncome ? '#10b98130' : `${cat?.color || '#dc2c4f'}30` }}
                      >
                        <MaterialIcon
                          name={cat?.icon || (isIncome ? 'payments' : 'receipt')}
                          filled
                          className={isIncome ? 'text-primary' : ''}
                          style={!isIncome ? { color: cat?.color || '#dc2c4f' } : undefined}
                        />
                      </div>
                      {/* Info */}
                      <div className="flex flex-col">
                        <h3 className="text-xl font-semibold text-on-surface">{tx.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium border border-outline-variant/30">
                            {cat?.name || 'Khác'}
                          </span>
                          <span className="text-sm text-outline">{formatDateShort(tx.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0 pl-16 sm:pl-0">
                      <div className="text-left sm:text-right">
                        <div className={`text-2xl sm:text-[32px] font-bold leading-10 ${isIncome ? 'text-primary' : 'text-error'}`}>
                          {formatSignedCurrency(tx.amount, tx.type)}
                        </div>
                        {tx.note && (
                          <div className="text-xs text-on-surface-variant truncate max-w-[150px] sm:max-w-[200px]" title={tx.note}>
                            {tx.note}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        <button
                          onClick={() => onEdit(tx)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <MaterialIcon name="edit" className="text-xl" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(tx)}
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors"
                          title="Xóa"
                        >
                          <MaterialIcon name="delete" className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
                <MaterialIcon name="search_off" className="text-6xl mb-4 opacity-30" />
                <p className="text-base font-medium">Không tìm thấy giao dịch nào</p>
                <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc thêm giao dịch mới</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTransactions.length}
          />
        </>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa giao dịch "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}
