import MaterialIcon from './MaterialIcon';

/**
 * ConfirmDialog — xác nhận trước khi xóa
 */
export default function ConfirmDialog({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0b1c30]/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative bg-surface w-[90%] sm:w-[384px] rounded-2xl shadow-xl border border-outline-variant p-6 shrink-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
            <MaterialIcon name="warning" className="text-error text-2xl" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-on-surface text-center mb-2">
          {title || 'Xác nhận xóa'}
        </h3>

        {/* Message */}
        <p className="text-sm text-on-surface-variant text-center mb-6">
          {message || 'Hành động này không thể hoàn tác.'}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors text-sm font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-error text-on-error hover:bg-error/90 transition-colors text-sm font-medium shadow-sm"
          >
            <span className="flex items-center gap-1">
              <MaterialIcon name="delete" className="text-base" />
              Xóa
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
