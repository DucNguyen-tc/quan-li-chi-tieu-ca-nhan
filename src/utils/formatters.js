/**
 * Format số tiền theo định dạng tiền tệ Việt Nam
 * @param {number} amount
 * @returns {string} Ví dụ: "1,500,000 ₫"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

/**
 * Format số tiền có dấu +/-
 * @param {number} amount
 * @param {'income'|'expense'} type
 * @returns {string} Ví dụ: "+ 1,500,000 ₫" hoặc "- 500,000 ₫"
 */
export function formatSignedCurrency(amount, type) {
  const sign = type === 'income' ? '+' : '-';
  return `${sign} ${formatCurrency(Math.abs(amount))}`;
}

/**
 * Format ngày thành dd/mm/yyyy
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format ngày thành dạng "24 Th10, 2023"
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
