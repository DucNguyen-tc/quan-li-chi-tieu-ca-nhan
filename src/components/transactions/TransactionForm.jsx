import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import MaterialIcon from '../common/MaterialIcon';
import { validateTransaction } from '../../utils/validators';

/**
 * TransactionForm — form thêm/sửa giao dịch
 * Chuyển đổi từ Stitch modal form design
 */
export default function TransactionForm({ editingTransaction, onClose }) {
  const { addTransaction, updateTransaction, categories } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    amount: '',
    categoryId: categories[0]?.id || '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  });

  const [errors, setErrors] = useState({});

  // Load dữ liệu khi sửa
  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        name: editingTransaction.name,
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        categoryId: editingTransaction.categoryId,
        date: editingTransaction.date,
        note: editingTransaction.note || '',
      });
    }
  }, [editingTransaction]);

  // Cập nhật field
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Xóa lỗi khi user sửa
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Submit form
  const handleSubmit = () => {
    const { isValid, errors: validationErrors } = validateTransaction(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData);
    } else {
      addTransaction(formData);
    }
    onClose();
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="p-[var(--spacing-lg)] overflow-y-auto flex-1">
        <form className="space-y-[var(--spacing-md)]" onSubmit={(e) => e.preventDefault()}>
          {/* Type Toggle (Segmented Control) */}
          <div className="bg-surface-container-highest p-1 rounded-lg flex w-full">
            <label className="flex-1 text-center cursor-pointer relative">
              <input
                type="radio"
                name="tx_type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={() => updateField('type', 'expense')}
                className="peer sr-only"
              />
              <div className="py-2 rounded-md text-sm font-medium text-on-surface-variant peer-checked:bg-surface peer-checked:text-secondary peer-checked:shadow-sm transition-all">
                Chi Tiêu
              </div>
            </label>
            <label className="flex-1 text-center cursor-pointer relative">
              <input
                type="radio"
                name="tx_type"
                value="income"
                checked={formData.type === 'income'}
                onChange={() => updateField('type', 'income')}
                className="peer sr-only"
              />
              <div className="py-2 rounded-md text-sm font-medium text-on-surface-variant peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-sm transition-all">
                Thu Nhập
              </div>
            </label>
          </div>

          {/* Transaction Name */}
          <div>
            <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
              Tên Giao Dịch *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Vd: Ăn trưa"
              className={`w-full bg-surface-container-lowest border rounded-lg px-[var(--spacing-md)] py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${
                errors.name ? 'border-error' : 'border-outline-variant'
              }`}
            />
            {errors.name && (
              <p className="text-[10px] text-error mt-[var(--spacing-xs)]">{errors.name}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
              Số Tiền (VNĐ) *
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={
                  formData.amount !== undefined && formData.amount !== null && formData.amount !== ''
                    ? formData.amount.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    : ''
                }
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const numericValue = rawValue.replace(/\D/g, '');
                  updateField('amount', numericValue ? Number(numericValue) : '');
                }}
                placeholder="0"
                className={`w-full bg-surface-container-lowest border rounded-lg pl-[var(--spacing-md)] pr-12 py-3 text-xl font-semibold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-right ${
                  errors.amount ? 'border-error' : 'border-outline-variant'
                }`}
              />
              <span className="absolute right-[var(--spacing-md)] top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">đ</span>
            </div>
            {errors.amount && (
              <p className="text-[10px] text-error mt-[var(--spacing-xs)]">{errors.amount}</p>
            )}
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-[var(--spacing-md)]">
            <div className="relative">
              <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
                Danh Mục
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => updateField('categoryId', e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-[var(--spacing-md)] py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <MaterialIcon name="expand_more" className="absolute right-3 top-[38px] text-outline pointer-events-none text-sm" />
            </div>

            <div>
              <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
                Ngày *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                className={`w-full bg-surface-container-lowest border rounded-lg px-[var(--spacing-md)] py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${
                  errors.date ? 'border-error' : 'border-outline-variant'
                }`}
              />
              {errors.date && (
                <p className="text-[10px] text-error mt-[var(--spacing-xs)]">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
              Ghi Chú
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => updateField('note', e.target.value)}
              placeholder="Thêm chi tiết (tùy chọn)"
              rows={3}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-[var(--spacing-md)] py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
            />
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="p-[var(--spacing-lg)] border-t border-outline-variant bg-surface flex justify-end gap-[var(--spacing-sm)]">
        <button
          onClick={onClose}
          className="px-[var(--spacing-md)] py-2 text-sm font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-[var(--spacing-md)] py-2 text-sm font-medium text-on-primary bg-primary rounded-lg hover:bg-surface-tint transition-colors shadow-sm"
        >
          {editingTransaction ? 'Cập nhật' : 'Lưu Giao Dịch'}
        </button>
      </div>
    </div>
  );
}

