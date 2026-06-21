# UI DESIGN — Thiết kế giao diện

> Tài liệu mô tả chi tiết giao diện, color palette, typography, layout và thiết kế từng trang.

---

## 🎨 Design System

### Color Palette

| Tên             | Light Mode     | Dark Mode      | Sử dụng                    |
| --------------- | -------------- | -------------- | --------------------------- |
| Primary         | `#6366F1`      | `#818CF8`      | Nút chính, accent           |
| Primary Light   | `#EEF2FF`      | `#312E81`      | Background hover, selected  |
| Success (Thu)   | `#10B981`      | `#34D399`      | Badge/card loại Thu          |
| Danger (Chi)    | `#EF4444`      | `#F87171`      | Badge/card loại Chi          |
| Warning         | `#F59E0B`      | `#FBBF24`      | Cảnh báo                    |
| Background      | `#F8FAFC`      | `#0F172A`      | Nền chính                   |
| Surface         | `#FFFFFF`      | `#1E293B`      | Card, modal background      |
| Border          | `#E2E8F0`      | `#334155`      | Viền card, input            |
| Text Primary    | `#1E293B`      | `#F1F5F9`      | Tiêu đề, nội dung chính     |
| Text Secondary  | `#64748B`      | `#94A3B8`      | Mô tả, label, placeholder   |

### Typography

```
Font Family: 'Inter', 'Segoe UI', sans-serif
(Import từ Google Fonts)

Heading 1:  28px / 700 (font-bold)    — Tiêu đề trang
Heading 2:  22px / 600 (font-semibold) — Tiêu đề section
Heading 3:  18px / 600 (font-semibold) — Tiêu đề card
Body:       14px / 400 (font-normal)   — Nội dung chính
Caption:    12px / 400 (font-normal)   — Ghi chú, label nhỏ
```

### Spacing & Radius

```
Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 (px)
Border radius:
  - Small:  6px  (badge, tag)
  - Medium: 10px (input, button)
  - Large:  16px (card, modal)
  - Full:   9999px (avatar, icon circle)
```

### Shadows

```
Shadow SM:  0 1px 2px rgba(0,0,0,0.05)           — Input focus
Shadow MD:  0 4px 6px -1px rgba(0,0,0,0.1)        — Card
Shadow LG:  0 10px 15px -3px rgba(0,0,0,0.1)      — Modal, dropdown
Shadow XL:  0 20px 25px -5px rgba(0,0,0,0.1)      — Overlay
```

---

## 📐 Layout tổng thể

```
┌──────────────────────────────────────────────────────┐
│                    HEADER                            │
│  [☰ Menu]   💰 Quản lý Chi tiêu         [🌙 Dark]  │
├──────────┬───────────────────────────────────────────┤
│          │                                           │
│ SIDEBAR  │              MAIN CONTENT                 │
│          │                                           │
│ ┌──────┐ │   (Dashboard / Giao dịch / Danh mục)     │
│ │ 📊   │ │                                           │
│ │ Dash │ │                                           │
│ ├──────┤ │                                           │
│ │ 💸   │ │                                           │
│ │ GD   │ │                                           │
│ ├──────┤ │                                           │
│ │ 📂   │ │                                           │
│ │ DM   │ │                                           │
│ └──────┘ │                                           │
│          │                                           │
├──────────┴───────────────────────────────────────────┤
│                    FOOTER (optional)                 │
└──────────────────────────────────────────────────────┘
```

**Responsive:**
- Desktop (≥1024px): Sidebar cố định bên trái (width: 240px)
- Tablet (768–1023px): Sidebar thu gọn (width: 64px, chỉ icon)
- Mobile (<768px): Sidebar ẩn, mở bằng nút hamburger ☰

---

## 📊 Trang 1: Dashboard

```
┌─────────────────────────────────────────────────┐
│  📊 Dashboard                                   │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  │ 💚 TỔNG  │ │ 🔴 TỔNG  │ │ 💙 SỐ    │ │ 📋 SỐ    │
│  │ THU      │ │ CHI      │ │ DƯ       │ │ GIAO     │
│  │          │ │          │ │          │ │ DỊCH     │
│  │ 15,000,  │ │ 8,500,   │ │ 6,500,   │ │          │
│  │ 000 ₫    │ │ 000 ₫    │ │ 000 ₫    │ │ 24       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘
│                                                  │
│  ┌────────────────────────┐ ┌────────────────────┐
│  │ 📋 Giao dịch gần đây  │ │ 📈 Chi tiêu theo   │
│  │                        │ │    danh mục         │
│  │ ○ Lương T6    +15,000k│ │                      │
│  │ ○ Ăn trưa     -150k   │ │   ┌─────────────┐   │
│  │ ○ Grab        -50k    │ │   │  PIE CHART   │   │
│  │ ○ Mua sách    -200k   │ │   │  (conic      │   │
│  │ ○ Cafe        -80k    │ │   │  gradient)   │   │
│  │                        │ │   └─────────────┘   │
│  │         [Xem tất cả →]│ │                      │
│  └────────────────────────┘ │  🟠 Ăn uống 40%    │
│                              │  🔵 Di chuyển 20%  │
│                              │  🟣 Mua sắm 25%   │
│                              │  🟡 Giải trí 15%  │
│                              └────────────────────┘
│                                                  │
└─────────────────────────────────────────────────┘
```

### SummaryCard

Mỗi card có:
- Icon bên trái (trong vòng tròn có màu gradient)
- Label phía trên (text-secondary, caption size)
- Value phía dưới (heading-2 size, font-bold)
- Background: surface color + subtle gradient tùy loại
- Hover: nhẹ scale(1.02) + shadow tăng

---

## 💸 Trang 2: Giao dịch

```
┌─────────────────────────────────────────────────┐
│  💸 Giao dịch                    [+ Thêm mới]  │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ 🔍 Tìm kiếm...                            │  │
│  ├────────────────────────────────────────────┤  │
│  │ Loại: [Tất cả ▾]  Danh mục: [Tất cả ▾]   │  │
│  │ Từ ngày: [____]   Đến ngày: [____]        │  │
│  │ Sắp xếp: [Mới nhất ▾]                     │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ 🟢 Lương tháng 6        +15,000,000₫      │  │
│  │    💼 Lương · 01/06/2026                   │  │
│  ├────────────────────────────────────────────┤  │
│  │ 🔴 Ăn trưa cơm gà       -150,000₫        │  │
│  │    🍔 Ăn uống · 02/06/2026 · Cơm gà ngon │  │
│  ├────────────────────────────────────────────┤  │
│  │ 🔴 Grab đi làm           -50,000₫         │  │
│  │    🚗 Di chuyển · 02/06/2026               │  │
│  ├────────────────────────────────────────────┤  │
│  │                    ...                     │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  [← Prev]   Trang 1 / 5   [Next →]             │
│                                                  │
└─────────────────────────────────────────────────┘
```

### TransactionItem

Mỗi giao dịch hiển thị:
- Hàng 1: Icon loại (🟢/🔴) + Tên giao dịch + Số tiền (xanh nếu thu, đỏ nếu chi)
- Hàng 2: Icon danh mục + Tên danh mục · Ngày · Ghi chú (nếu có)
- Bên phải: 2 nút icon [✏️ Sửa] [🗑️ Xóa] — hiện khi hover

### TransactionForm (Modal)

```
┌──────────────────────────────────────┐
│  ➕ Thêm giao dịch          [✕]     │
├──────────────────────────────────────┤
│                                      │
│  Tên giao dịch *                     │
│  ┌──────────────────────────────┐    │
│  │ Nhập tên giao dịch...       │    │
│  └──────────────────────────────┘    │
│  ⚠️ Vui lòng nhập tên giao dịch     │
│                                      │
│  Loại giao dịch *                    │
│  ┌─────────┐ ┌─────────┐            │
│  │ 💚 Thu  │ │ 🔴 Chi  │            │
│  └─────────┘ └─────────┘            │
│                                      │
│  Số tiền *                           │
│  ┌──────────────────────────────┐    │
│  │ 0                     VND ₫ │    │
│  └──────────────────────────────┘    │
│                                      │
│  Danh mục                            │
│  ┌──────────────────────────────┐    │
│  │ Chọn danh mục...          ▾ │    │
│  └──────────────────────────────┘    │
│                                      │
│  Ngày giao dịch *                    │
│  ┌──────────────────────────────┐    │
│  │ dd/mm/yyyy              📅  │    │
│  └──────────────────────────────┘    │
│                                      │
│  Ghi chú                             │
│  ┌──────────────────────────────┐    │
│  │ Nhập ghi chú (tùy chọn)... │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │        💾 LƯU GIAO DỊCH     │    │
│  └──────────────────────────────┘    │
│                                      │
└──────────────────────────────────────┘
```

---

## 📂 Trang 3: Quản lý Danh mục

```
┌─────────────────────────────────────────────────┐
│  📂 Danh mục                                    │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ ➕ Thêm danh mục mới                      │  │
│  │                                            │  │
│  │ Tên: [____________]  Icon: [🍔▾]           │  │
│  │ Màu: [● ● ● ● ● ●]                       │  │
│  │                          [Thêm danh mục]   │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ Danh sách danh mục (8)                     │  │
│  ├────────────────────────────────────────────┤  │
│  │ 🍔 Ăn uống        █ #EF4444   12 giao dịch│  │
│  │ 🚗 Di chuyển      █ #3B82F6    5 giao dịch│  │
│  │ 💼 Lương          █ #10B981    2 giao dịch│  │
│  │ 🛒 Mua sắm       █ #F59E0B    8 giao dịch│  │
│  │ 🎮 Giải trí      █ #8B5CF6    4 giao dịch│  │
│  │ 📦 Khác          █ #6B7280    1 giao dịch│  │
│  │ ☕ Cafe          █ #D97706    3 giao dịch │ │
│  │ 📚 Học tập       █ #06B6D4    0 giao dịch [🗑️] │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ℹ️ Chỉ xóa được danh mục chưa có giao dịch nào │
│                                                  │
└─────────────────────────────────────────────────┘
```

Nút xóa 🗑️ chỉ hiện cho danh mục **0 giao dịch**. Các danh mục đang được dùng hiển thị số lượng giao dịch và không cho xóa.

---

## 🌙 Dark Mode

- Toggle nút 🌙/☀️ trên Header.
- Chuyển đổi mượt mà bằng CSS transition trên `background-color`, `color`, `border-color`.
- State lưu vào localStorage, khôi phục khi reload.
- Áp dụng class `dark` trên `<html>` element, kết hợp Tailwind `dark:` prefix.

---

## ⚠️ Confirm Dialog

```
┌───────────────────────────────────────┐
│                                       │
│         ⚠️ Xác nhận xóa              │
│                                       │
│  Bạn có chắc chắn muốn xóa giao     │
│  dịch "Ăn trưa cơm gà"?             │
│                                       │
│  Hành động này không thể hoàn tác.   │
│                                       │
│     [Hủy]          [🗑️ Xóa]          │
│                                       │
└───────────────────────────────────────┘
```

- Overlay backdrop mờ (backdrop-blur + bg-black/50).
- Animation: scale từ 0.95 → 1 + fade in.
- Nút "Xóa" có variant danger (đỏ).
- Nút "Hủy" có variant secondary.

---

## 🎭 Micro-animations

| Element          | Animation                           | Duration |
| ---------------- | ----------------------------------- | -------- |
| Card hover       | `scale(1.02)` + shadow tăng        | 200ms    |
| Modal open       | `scale(0.95→1)` + `opacity(0→1)`   | 250ms    |
| Modal close      | `scale(1→0.95)` + `opacity(1→0)`   | 200ms    |
| Sidebar hover    | Background color slide              | 150ms    |
| Button hover     | Brightness tăng + subtle lift       | 150ms    |
| Button click     | `scale(0.97)` → snap back           | 100ms    |
| Transaction item | Slide in từ trái                    | 300ms    |
| Delete item      | Fade out + slide trái               | 250ms    |
| Badge            | Subtle pulse khi mới xuất hiện      | 400ms    |
| Page transition  | Fade + slide up                     | 300ms    |
| Dark mode toggle | Color transition smooth             | 500ms    |

---

## 📱 Responsive Breakpoints

| Breakpoint | Kích thước  | Layout                          |
| ---------- | ----------- | ------------------------------- |
| Mobile     | < 768px     | 1 cột, sidebar ẩn, stack cards  |
| Tablet     | 768–1023px  | 2 cột cards, sidebar thu gọn   |
| Desktop    | ≥ 1024px    | 4 cột cards, sidebar đầy đủ    |

### Responsive cho từng trang:
- **Dashboard**: SummaryGrid 1→2→4 cột. PieChart + RecentTransactions stack (mobile) → side by side (desktop).
- **Giao dịch**: Filters stack (mobile) → inline (desktop). TransactionItem full-width.
- **Danh mục**: CategoryForm stack (mobile). CategoryList 1→2→3 cột.
