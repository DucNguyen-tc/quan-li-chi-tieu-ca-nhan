/**
 * MaterialIcon — wrapper cho Material Symbols
 * @param {string} name - Tên icon (vd: "dashboard", "receipt_long")
 * @param {boolean} filled - Có fill hay không
 * @param {string} className - Class CSS bổ sung
 */
export default function MaterialIcon({ name, filled = false, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'icon-fill' : ''} ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
