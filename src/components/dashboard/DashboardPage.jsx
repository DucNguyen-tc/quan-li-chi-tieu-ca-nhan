import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import MaterialIcon from "../common/MaterialIcon";
import {
  formatCurrency,
  formatSignedCurrency,
  formatDateShort,
} from "../../utils/formatters";

/**
 * DashboardPage — trang tổng quan tài chính
 * Chuyển đổi trực tiếp từ Stitch screen "Dashboard Tổng Quan - Modern Refresh"
 */
export default function DashboardPage() {
  const {
    recentTransactions,
    categories,
    transactions,
    getCategoryById,
    setCurrentPage,
  } = useApp();

  const [timeFilter, setTimeFilter] = useState("all"); // 'month' | 'year' | 'all'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (timeFilter === "all") return true;
      const txDate = new Date(tx.date);
      if (timeFilter === "month") {
        return (
          txDate.getMonth() === selectedMonth &&
          txDate.getFullYear() === selectedYear
        );
      }
      if (timeFilter === "year") {
        return txDate.getFullYear() === selectedYear;
      }
      return true;
    });
  }, [transactions, timeFilter, selectedMonth, selectedYear]);

  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [filteredTransactions]);

  const totalExpense = useMemo(() => {
    return filteredTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }, [filteredTransactions]);

  const balance = totalIncome - totalExpense;
  const transactionCount = filteredTransactions.length;

  // Tính phần trăm chi theo danh mục
  const expenseByCategory = categories
    .map((cat) => {
      const total = filteredTransactions
        .filter((tx) => tx.type === "expense" && tx.categoryId === cat.id)
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
      return { ...cat, total };
    })
    .filter((cat) => cat.total > 0)
    .sort((a, b) => b.total - a.total);

  const totalExpenseForChart = expenseByCategory.reduce(
    (sum, c) => sum + c.total,
    0,
  );

  return (
    <div className="space-y-[var(--spacing-xl)] animate-fade-in pt-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[var(--spacing-md)]">
        <div>
          <h1 className="text-[32px] font-semibold text-on-surface leading-10 tracking-tight">
            Tổng quan tài chính
          </h1>
          <p className="text-base text-on-surface-variant mt-1">
            Chào, Anh/Chị!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {timeFilter === "month" && (
            <div className="relative min-w-[110px]">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-8 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer shadow-sm"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <MaterialIcon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
            </div>
          )}

          {(timeFilter === "month" || timeFilter === "year") && (
            <div className="relative min-w-[100px]">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-8 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer shadow-sm"
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const y = new Date().getFullYear() - 5 + i;
                  return (
                    <option key={y} value={y}>
                      Năm {y}
                    </option>
                  );
                })}
              </select>
              <MaterialIcon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
            </div>
          )}

          <div className="relative min-w-[140px]">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-8 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer shadow-sm"
            >
              <option value="month">Theo tháng</option>
              <option value="year">Theo năm</option>
              <option value="all">Tất cả</option>
            </select>
            <MaterialIcon
              name="expand_more"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Prominent Balance Card */}
      <div className="bg-primary-container text-on-primary-container rounded-2xl p-[var(--spacing-xl)] shadow-md flex flex-col md:flex-row justify-between items-center gap-[var(--spacing-lg)]">
        <div className="flex flex-col gap-[var(--spacing-sm)] w-full md:w-auto">
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <div className="bg-white/20 p-2 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <MaterialIcon
                name="account_balance_wallet"
                className="text-3xl"
              />
            </div>
            <span className="text-xl font-semibold">Số Dư Hiện Tại</span>
          </div>
          <div className="text-5xl font-bold leading-14 tracking-tight">
            {formatCurrency(balance)}
          </div>
        </div>
      </div>

      {/* Secondary Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-md)]">
        {/* Total Income */}
        <div className="bg-surface rounded-xl p-[var(--spacing-lg)] border border-outline-variant shadow-sm flex flex-col gap-[var(--spacing-sm)] hover:border-primary transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-xl font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
              Tổng Thu Nhập
            </span>
            <div className="bg-primary-container/20 text-primary p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon name="trending_up" className="text-2xl" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-primary">
            + {formatCurrency(totalIncome)}
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-surface rounded-xl p-[var(--spacing-lg)] border border-outline-variant shadow-sm flex flex-col gap-[var(--spacing-sm)] hover:border-error transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-xl font-semibold text-on-surface-variant group-hover:text-error transition-colors">
              Tổng Chi Phí
            </span>
            <div className="bg-error-container/50 text-error p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon name="trending_down" className="text-2xl" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-error">
            - {formatCurrency(totalExpense)}
          </div>
        </div>

        {/* Transaction Count */}
        <div className="bg-surface rounded-xl p-[var(--spacing-lg)] border border-outline-variant shadow-sm flex flex-col gap-[var(--spacing-sm)] hover:border-tertiary transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-xl font-semibold text-on-surface-variant group-hover:text-tertiary transition-colors">
              Giao Dịch
            </span>
            <div className="bg-tertiary-container/30 text-tertiary p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon name="sync_alt" className="text-2xl" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-on-surface">
            {transactionCount}
          </div>
          <div className="flex items-center gap-[var(--spacing-xs)] text-sm text-on-surface-variant mt-auto pt-2">
            <span className="text-on-surface-variant font-medium">
              Tổng cộng
            </span>
          </div>
        </div>
      </section>

      {/* Charts + Recent Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-lg)]">
        {/* Donut Chart - Chi tiêu theo danh mục */}
        <div className="bg-surface rounded-xl p-[var(--spacing-lg)] border border-outline-variant shadow-sm flex flex-col">
          <h2 className="text-2xl font-semibold text-on-surface mb-[var(--spacing-lg)]">
            Phân bổ chi tiêu
          </h2>

          {expenseByCategory.length > 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-[var(--spacing-xl)]">
              {/* SVG Donut */}
              <div className="w-64 h-64 relative flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f0f0f0"
                    strokeWidth="16"
                  />
                  {
                    expenseByCategory.reduce(
                      (acc, cat, i) => {
                        const percent =
                          (cat.total / totalExpenseForChart) * 100;
                        const dashArray = 2 * Math.PI * 40;
                        const dashOffset =
                          dashArray - (dashArray * percent) / 100;
                        const prevPercent = acc.prevPercent;
                        const rotation = (prevPercent / 100) * 360;
                        acc.elements.push(
                          <circle
                            key={cat.id}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke={cat.color}
                            strokeWidth="16"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            transform={`rotate(${rotation} 50 50)`}
                          />,
                        );
                        acc.prevPercent += percent;
                        return acc;
                      },
                      { elements: [], prevPercent: 0 },
                    ).elements
                  }
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-medium text-on-surface-variant">
                    Tổng chi
                  </span>
                  <span className="text-xl font-semibold text-on-surface mt-1">
                    {totalExpenseForChart >= 1000000
                      ? `${(totalExpenseForChart / 1000000).toFixed(1)}M`
                      : formatCurrency(totalExpenseForChart)}
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="w-full grid grid-cols-2 gap-[var(--spacing-md)]">
                {expenseByCategory.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors"
                  >
                    <div className="flex items-center gap-[var(--spacing-sm)]">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm text-on-surface">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-xl font-semibold text-on-surface">
                      {totalExpenseForChart > 0
                        ? Math.round((cat.total / totalExpenseForChart) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant py-12">
              <MaterialIcon
                name="pie_chart"
                className="text-5xl mb-2 opacity-30"
              />
              <p className="text-sm">Chưa có dữ liệu chi tiêu</p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-surface rounded-xl p-[var(--spacing-lg)] border border-outline-variant shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-[var(--spacing-lg)]">
            <h2 className="text-2xl font-semibold text-on-surface">
              Giao dịch gần đây
            </h2>
            <button
              onClick={() => setCurrentPage("transactions")}
              className="text-sm text-primary hover:underline font-medium"
            >
              Xem tất cả →
            </button>
          </div>

          {recentTransactions.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recentTransactions.map((tx) => {
                const cat = getCategoryById(tx.categoryId);
                const isIncome = tx.type === "income";
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${cat?.color || "#6b7280"}20`,
                      }}
                    >
                      <MaterialIcon
                        name={cat?.icon || "receipt"}
                        className="text-lg"
                        style={{ color: cat?.color || "#6b7280" }}
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-on-surface truncate">
                        {tx.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {formatDateShort(tx.date)}
                      </p>
                    </div>
                    {/* Amount */}
                    <span
                      className={`text-base font-bold whitespace-nowrap ${isIncome ? "text-primary" : "text-error"}`}
                    >
                      {formatSignedCurrency(tx.amount, tx.type)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant py-12">
              <MaterialIcon
                name="receipt_long"
                className="text-5xl mb-2 opacity-30"
              />
              <p className="text-sm">Chưa có giao dịch nào</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
