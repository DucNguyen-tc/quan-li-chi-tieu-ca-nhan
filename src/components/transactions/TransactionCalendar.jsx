import { useState, useMemo } from 'react';
import MaterialIcon from '../common/MaterialIcon';
import { formatCurrency, formatSignedCurrency } from '../../utils/formatters';

export default function TransactionCalendar({ transactions, categories }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCategoryById = (id) => categories.find((c) => c.id === id);

  // Chuyển tháng
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();

  // Tính toán lưới lịch
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = [];
    let currentWeek = [];

    // Cột trống đầu tháng
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    // Các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Lọc giao dịch của ngày này
      const dayTxs = transactions.filter(tx => tx.date.startsWith(dateString));
      
      let totalExpense = 0;
      let totalIncome = 0;
      
      dayTxs.forEach(tx => {
        if (tx.type === 'expense') totalExpense += tx.amount;
        if (tx.type === 'income') totalIncome += tx.amount;
      });

      currentWeek.push({
        day,
        dateString,
        transactions: dayTxs,
        totalExpense,
        totalIncome,
        net: totalIncome - totalExpense
      });

      if (currentWeek.length === 7) {
        grid.push(currentWeek);
        currentWeek = [];
      }
    }

    // Cột trống cuối tháng
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      grid.push(currentWeek);
    }

    // Tìm chi tiêu cao nhất để tính độ đậm nhạt của màu nền (Heatmap)
    const maxExpense = Math.max(...grid.flat().map(c => c?.totalExpense || 0), 1); // Tránh chia cho 0

    return { year, month, grid, maxExpense };
  }, [currentDate, transactions]);

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Hàm tính class màu sắc cho ô ngày dựa trên chi tiêu
  const getCellColorClass = (cell, maxExpense) => {
    if (!cell) return 'bg-transparent border-transparent';
    if (cell.transactions.length === 0) return 'bg-surface border-outline-variant/30 hover:border-primary/50';
    
    // Nếu có chi tiêu, hiện màu đỏ nhạt -> đậm
    if (cell.totalExpense > 0) {
      const ratio = cell.totalExpense / maxExpense;
      if (ratio > 0.75) return 'bg-error text-on-error border-error';
      if (ratio > 0.4) return 'bg-error/70 text-on-error border-error/70';
      if (ratio > 0) return 'bg-error/30 text-on-surface border-error/30';
    }
    
    // Nếu chỉ có thu nhập
    if (cell.totalIncome > 0 && cell.totalExpense === 0) {
      return 'bg-primary/30 text-on-surface border-primary/30';
    }

    return 'bg-surface border-outline-variant/30 hover:border-primary/50';
  };

  const isToday = (day, month, year) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Header điều hướng */}
      <div className="flex items-center justify-between bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
        >
          <MaterialIcon name="chevron_left" className="text-2xl" />
        </button>
        <h2 className="text-lg font-semibold text-on-surface">
          {monthNames[calendarData.month]}, {calendarData.year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
        >
          <MaterialIcon name="chevron_right" className="text-2xl" />
        </button>
      </div>

      {/* Lưới lịch */}
      <div className="bg-surface rounded-xl border border-outline-variant shadow-sm">
        {/* Tiêu đề cột */}
        <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-container-lowest">
          {dayNames.map((name, index) => (
            <div key={index} className="py-3 text-center text-xs font-medium text-on-surface-variant">
              {name}
            </div>
          ))}
        </div>

        {/* Lưới ngày */}
        <div className="p-2 flex flex-col gap-2 bg-surface-container-lowest/30">
          {calendarData.grid.map((week, wIndex) => (
            <div key={wIndex} className="grid grid-cols-7 gap-2">
              {week.map((cell, dIndex) => {
                const todayFlag = cell && isToday(cell.day, calendarData.month, calendarData.year);
                
                return (
                  <div
                    key={dIndex}
                    className={`relative group aspect-[3/2] rounded-lg border flex flex-col items-center justify-center p-1 transition-all cursor-default
                      ${getCellColorClass(cell, calendarData.maxExpense)}
                      ${todayFlag ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''}
                      ${cell && cell.transactions.length > 0 ? 'hover:scale-105 hover:z-10 shadow-sm' : ''}
                    `}
                  >
                    {cell && (
                      <>
                        <span className={`text-sm font-medium ${todayFlag ? 'text-primary' : ''}`}>
                          {cell.day}
                        </span>
                        
                        {/* Hiển thị số nhỏ (chấm) nếu có giao dịch */}
                        {cell.transactions.length > 0 && (
                          <div className="absolute bottom-1.5 flex gap-1">
                            {cell.totalIncome > 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />}
                            {cell.totalExpense > 0 && <span className="w-1.5 h-1.5 rounded-full bg-error shadow-sm" />}
                          </div>
                        )}

                        {/* Tooltip khi hover */}
                        {cell.transactions.length > 0 && (
                          <div className={`absolute bottom-full mb-2 w-64 p-3 bg-surface border border-outline-variant rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none flex flex-col gap-2 ${
                            dIndex === 0 ? 'left-0' :
                            dIndex === 6 ? 'right-0' :
                            'left-1/2 -translate-x-1/2'
                          }`}>
                            <div className="text-sm font-semibold text-on-surface border-b border-outline-variant/50 pb-1 mb-1">
                              Ngày {cell.day}/{calendarData.month + 1}/{calendarData.year}
                            </div>
                            
                            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
                              {cell.transactions.map((tx) => {
                                const isIncome = tx.type === 'income';
                                const cat = getCategoryById(tx.categoryId);
                                return (
                                  <div key={tx.id} className="flex justify-between items-center text-xs">
                                    <span className="flex items-center gap-1.5 text-on-surface truncate pr-2">
                                      <MaterialIcon 
                                        name={cat?.icon || (isIncome ? 'payments' : 'receipt')} 
                                        className={`text-[14px] ${isIncome ? 'text-primary' : 'text-error'}`} 
                                      />
                                      <span className="truncate max-w-[100px]">{tx.name}</span>
                                    </span>
                                    <span className={`font-medium shrink-0 ${isIncome ? 'text-primary' : 'text-error'}`}>
                                      {formatSignedCurrency(tx.amount, tx.type)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            <div className="flex justify-between items-center mt-1 pt-2 border-t border-outline-variant/50 text-xs font-semibold text-on-surface">
                              <span>Tổng kết:</span>
                              <span className={cell.net >= 0 ? 'text-primary' : 'text-error'}>
                                {formatSignedCurrency(cell.net, cell.net >= 0 ? 'income' : 'expense')}
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
