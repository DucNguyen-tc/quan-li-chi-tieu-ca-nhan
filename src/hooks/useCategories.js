import { useCallback } from 'react';

/**
 * Custom hook: CRUD danh mục
 * @param {Array} categories - Danh sách danh mục
 * @param {Function} setCategories - Setter
 * @param {Array} transactions - Danh sách giao dịch (để kiểm tra đang sử dụng)
 * @returns {object}
 */
export function useCategories(categories, setCategories, transactions) {
  // Thêm danh mục mới
  const addCategory = useCallback((category) => {
    const newCat = {
      ...category,
      id: crypto.randomUUID(),
    };
    setCategories((prev) => [...prev, newCat]);
  }, [setCategories]);

  // Xóa danh mục (chỉ khi chưa được dùng)
  const deleteCategory = useCallback((id) => {
    const isUsed = transactions.some((tx) => tx.categoryId === id);
    if (isUsed) {
      return false; // Không cho xóa
    }
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    return true;
  }, [setCategories, transactions]);

  // Kiểm tra danh mục có đang dùng không
  const isCategoryInUse = useCallback((id) => {
    return transactions.some((tx) => tx.categoryId === id);
  }, [transactions]);

  // Đếm số giao dịch theo danh mục
  const getTransactionCount = useCallback((categoryId) => {
    return transactions.filter((tx) => tx.categoryId === categoryId).length;
  }, [transactions]);

  // Lấy danh mục theo ID
  const getCategoryById = useCallback((id) => {
    return categories.find((cat) => cat.id === id);
  }, [categories]);

  return {
    addCategory,
    deleteCategory,
    isCategoryInUse,
    getTransactionCount,
    getCategoryById,
  };
}
