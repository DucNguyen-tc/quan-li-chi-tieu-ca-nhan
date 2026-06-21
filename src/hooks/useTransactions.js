import { useCallback, useMemo } from 'react';

/**
 * Custom hook: CRUD + filter + tính toán giao dịch
 * @param {Array} transactions - Danh sách giao dịch
 * @param {Function} setTransactions - Setter
 * @returns {object}
 */
export function useTransactions(transactions, setTransactions) {
  // Thêm giao dịch mới
  const addTransaction = useCallback((transaction) => {
    const newTx = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  }, [setTransactions]);

  // Cập nhật giao dịch
  const updateTransaction = useCallback((id, updatedData) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedData } : tx))
    );
  }, [setTransactions]);

  // Xóa giao dịch
  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, [setTransactions]);

  // Tính tổng thu
  const totalIncome = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [transactions]);

  // Tính tổng chi
  const totalExpense = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [transactions]);

  // Số dư
  const balance = useMemo(() => totalIncome - totalExpense, [totalIncome, totalExpense]);

  // Tổng số giao dịch
  const transactionCount = transactions.length;

  // Lọc giao dịch
  const getFiltered = useCallback((filters) => {
    let result = [...transactions];

    // Tìm theo tên
    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      result = result.filter((tx) =>
        tx.name.toLowerCase().includes(keyword)
      );
    }

    // Lọc theo loại
    if (filters.type && filters.type !== 'all') {
      result = result.filter((tx) => tx.type === filters.type);
    }

    // Lọc theo danh mục
    if (filters.categoryId) {
      result = result.filter((tx) => tx.categoryId === filters.categoryId);
    }

    // Lọc theo ngày bắt đầu
    if (filters.dateFrom) {
      result = result.filter((tx) => tx.date >= filters.dateFrom);
    }

    // Lọc theo ngày kết thúc
    if (filters.dateTo) {
      result = result.filter((tx) => tx.date <= filters.dateTo);
    }

    // Sắp xếp
    if (filters.sortOrder === 'asc') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [transactions]);

  // Giao dịch gần đây (cho Dashboard)
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);
  }, [transactions]);

  return {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
    transactionCount,
    getFiltered,
    recentTransactions,
  };
}
