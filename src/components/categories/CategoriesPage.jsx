import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import MaterialIcon from '../common/MaterialIcon';
import ConfirmDialog from '../common/ConfirmDialog';

// Danh sách icon có sẵn
const AVAILABLE_ICONS = [
  'restaurant', 'directions_car', 'payments', 'shopping_cart', 'sports_esports',
  'more_horiz', 'home_work', 'savings', 'school', 'medical_services',
  'flight', 'coffee', 'fitness_center', 'pets', 'bolt',
];

// Danh sách màu có sẵn
const AVAILABLE_COLORS = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
  '#ec4899', '#06b6d4', '#6b7280', '#d97706', '#14b8a6',
];

/**
 * CategoriesPage — trang quản lý danh mục
 * Chuyển đổi từ Stitch screen "Quản Lý Danh Mục & Form Giao Dịch"
 */
export default function CategoriesPage() {
  const { categories, addCategory, deleteCategory, isCategoryInUse, getTransactionCount } = useApp();

  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState(AVAILABLE_ICONS[0]);
  const [newColor, setNewColor] = useState(AVAILABLE_COLORS[0]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Thêm danh mục mới
  const handleAdd = () => {
    if (!newName.trim()) return;
    addCategory({
      name: newName.trim(),
      icon: newIcon,
      color: newColor,
    });
    setNewName('');
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="animate-fade-in pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-lg)]">
        {/* Category Management (8 cols desktop) */}
        <div className="lg:col-span-8 space-y-[var(--spacing-lg)]">
          {/* Add Category Section */}
          <section className="bg-surface rounded-xl border border-outline-variant p-[var(--spacing-lg)] shadow-sm">
            <h2 className="text-xl font-semibold text-on-surface mb-[var(--spacing-md)]">
              Thêm Danh Mục Mới
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
                  Tên Danh Mục
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="Vd: Ăn uống, Giải trí..."
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-[var(--spacing-md)] py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-outline"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
                  Icon
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 border border-outline-variant rounded-lg bg-surface-container-lowest min-h-[92px] items-center">
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewIcon(icon)}
                      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                        newIcon === icon
                          ? 'bg-primary-container text-primary'
                          : 'hover:bg-surface-container-high text-on-surface-variant'
                      }`}
                      title={icon}
                    >
                      <MaterialIcon name={icon} className="text-lg" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <label className="text-xs font-medium text-on-surface-variant mb-[var(--spacing-xs)] block">
                  Màu Sắc
                </label>
                <div className="flex flex-wrap gap-2.5 p-3 border border-outline-variant rounded-lg bg-surface-container-lowest min-h-[92px] items-center">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        newColor === color ? 'border-on-surface scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Add Button */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={handleAdd}
                  disabled={!newName.trim()}
                  className="w-full sm:w-auto bg-primary text-on-primary text-sm font-medium px-[var(--spacing-lg)] py-2.5 rounded-lg hover:bg-surface-tint transition-colors flex items-center justify-center gap-[var(--spacing-sm)] active:scale-95 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MaterialIcon name="add" className="text-sm" />
                  Thêm Danh Mục
                </button>
              </div>
            </div>
          </section>


          {/* Category List */}
          <section className="bg-surface rounded-xl border border-outline-variant p-[var(--spacing-lg)] shadow-sm">
            <h2 className="text-xl font-semibold text-on-surface mb-[var(--spacing-md)]">
              Danh Sách Danh Mục
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
              {categories.map((cat) => {
                const isUsed = isCategoryInUse(cat.id);
                const txCount = getTransactionCount(cat.id);
                return (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-[var(--spacing-md)] border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors group"
                  >
                    <div className="flex items-center gap-[var(--spacing-md)]">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                      >
                        <MaterialIcon name={cat.icon} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-on-surface">{cat.name}</h3>
                        <p className="text-xs font-medium text-on-surface-variant">
                          {txCount} giao dịch
                        </p>
                      </div>
                    </div>

                    {/* Delete button */}
                    {isUsed ? (
                      <button
                        disabled
                        className="text-outline-variant opacity-50 cursor-not-allowed w-8 h-8 flex items-center justify-center rounded-full"
                        title="Không thể xóa danh mục đang sử dụng"
                      >
                        <MaterialIcon name="delete" className="text-xl" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="text-outline hover:text-error hover:bg-error-container w-8 h-8 flex items-center justify-center rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        <MaterialIcon name="delete" className="text-xl" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Info Panel (Desktop only) */}
        <div className="hidden lg:block lg:col-span-4 space-y-[var(--spacing-lg)]">
          <div className="bg-surface rounded-xl border border-outline-variant p-[var(--spacing-lg)] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container rounded-bl-full opacity-20 -z-10 pointer-events-none" />
            <h3 className="text-xl font-semibold text-on-surface mb-[var(--spacing-xs)]">Thông tin</h3>
            <p className="text-sm text-on-surface-variant mb-[var(--spacing-md)]">
              Việc tổ chức danh mục hợp lý giúp bạn theo dõi chi tiêu một cách minh bạch và chính xác hơn.
            </p>
            <ul className="space-y-[var(--spacing-sm)] text-xs font-medium text-on-surface-variant">
              <li className="flex items-center gap-[var(--spacing-xs)]">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Tổng số danh mục: {categories.length}
              </li>
              <li className="flex items-center gap-[var(--spacing-xs)]">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Chỉ xóa được danh mục chưa có giao dịch
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        title="Xác nhận xóa danh mục"
        message={`Bạn có chắc chắn muốn xóa danh mục "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
