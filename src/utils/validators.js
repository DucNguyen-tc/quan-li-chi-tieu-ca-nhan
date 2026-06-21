/**
 * Validate dữ liệu giao dịch
 * @param {object} data - { name, type, amount, date }
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateTransaction(data) {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Vui lòng nhập tên giao dịch.';
  }

  if (!data.type) {
    errors.type = 'Vui lòng chọn loại giao dịch.';
  }

  if (!data.amount || Number(data.amount) <= 0) {
    errors.amount = 'Số tiền phải lớn hơn 0.';
  }

  if (!data.date) {
    errors.date = 'Vui lòng chọn ngày giao dịch.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
