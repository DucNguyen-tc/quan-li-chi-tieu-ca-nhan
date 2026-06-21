# STRUCTURE PROJECT — Cấu trúc dự án

> Chi tiết từng file và folder trong `src/`, kèm mô tả chức năng.

---

## Tổng quan cây thư mục

```
quan-ly-chi-tieu-ca-nhan/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── MaterialIcon.jsx      # Icon wrapper cho Material Symbols
│   │   │   ├── Modal.jsx             # Overlay popup (đóng/mở)
│   │   │   ├── ConfirmDialog.jsx     # Dialog xác nhận trước khi xóa
│   │   │   └── Pagination.jsx        # Phân trang (prev / next / page numbers)
│   │   │
│   │   ├── layout/
│   │   │   ├── Layout.jsx            # Wrapper chính: Header + Sidebar + Content
│   │   │   ├── Header.jsx            # Logo, tiêu đề, toggle Dark mode
│   │   │   └── Sidebar.jsx           # Menu điều hướng giữa các trang
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardPage.jsx     # Trang Dashboard (bao gồm SummaryCards, RecentTransactions, PieChart)
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionsPage.jsx  # Trang quản lý giao dịch (bao gồm Filters, List)
│   │   │   └── TransactionForm.jsx   # Form thêm / sửa giao dịch
│   │   │
│   │   └── categories/
│   │       └── CategoriesPage.jsx    # Trang quản lý danh mục (bao gồm Form, List)
│   │
│   ├── context/
│   │   └── AppContext.jsx            # Context + Reducer + Provider
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js        # Custom hook: đọc/ghi localStorage
│   │   ├── useTransactions.js        # Custom hook: CRUD + filter + tính toán giao dịch
│   │   └── useCategories.js          # Custom hook: CRUD danh mục
│   ├── utils/
│   │   ├── constants.js              # DEFAULT_CATEGORIES, TRANSACTION_TYPES, etc.
│   │   ├── formatters.js             # Format tiền tệ, format ngày
│   │   └── validators.js             # Validate form giao dịch
│   │
│   ├── App.jsx                       # Root: layout + navigation state
│   ├── main.jsx                      # Entry point: render App + Provider
│   └── index.css                     # Tailwind imports + CSS variables
│
├── .gitignore
├── index.html                        # HTML template
├── package.json
├── vite.config.js
├── eslint.config.js
├── TASK.md                           # Yêu cầu chức năng
├── AGENT.md                          # Quy tắc code
├── TODO.md                           # Thứ tự triển khai
├── STRUCTURE_PROJECT.md              # File này
├── UI_DESIGN.md                      # Thiết kế giao diện
└── README.md                         # Giới thiệu dự án
```

---

## Chi tiết từng module

### 📦 `components/common/`

Components tái sử dụng xuyên suốt app, **không chứa logic nghiệp vụ**.

| Component        | Props chính                                | Mô tả                              |
| ---------------- | ------------------------------------------ | ----------------------------------- |
| `Button`         | `variant`, `onClick`, `disabled`, `icon`   | Nút bấm có 3 kiểu: primary/secondary/danger |
| `Card`           | `title`, `children`, `className`           | Container với shadow + border       |
| `Modal`          | `isOpen`, `onClose`, `title`, `children`   | Popup overlay, bấm ngoài để đóng   |
| `ConfirmDialog`  | `isOpen`, `onConfirm`, `onCancel`, `message` | Xác nhận Có/Không trước khi xóa |
| `Input`          | `label`, `value`, `onChange`, `error`, `type` | Input field + hiển thị lỗi      |
| `Select`         | `label`, `options`, `value`, `onChange`     | Dropdown chọn giá trị              |
| `Badge`          | `text`, `color`, `variant`                 | Tag nhỏ hiển thị thông tin          |
| `EmptyState`     | `icon`, `title`, `description`             | Placeholder khi không có data       |
| `Pagination`     | `currentPage`, `totalPages`, `onPageChange`| Điều hướng trang                    |

### 🏠 `components/layout/`

Layout chính của ứng dụng.

- **`Layout`**: Bọc Header + Sidebar + vùng nội dung chính. Responsive: sidebar ẩn trên mobile.
- **`Header`**: Logo ứng dụng, tiêu đề, nút toggle dark mode.
- **`Sidebar`**: Menu điều hướng: Dashboard / Giao dịch / Danh mục. Active state cho trang hiện tại.

### 📊 `components/dashboard/`

- **`DashboardPage`**: Trang chính, compose SummaryGrid + RecentTransactions + PieChart.
- **`SummaryGrid`**: Grid 2×2 (hoặc 4 cột trên desktop) chứa 4 SummaryCard.
- **`SummaryCard`**: Hiển thị 1 metric: icon + label + value. Có gradient background.
- **`RecentTransactions`**: Card chứa danh sách 5–7 giao dịch mới nhất.
- **`PieChart`**: [Nâng cao] Vẽ biểu đồ tròn bằng CSS conic-gradient hoặc Canvas API.

### 💸 `components/transactions/`

- **`TransactionsPage`**: Trang chính, compose Filters + List + Modal (Form).
- **`TransactionFilters`**: Search bar + các dropdown lọc + sắp xếp.
- **`TransactionList`**: Danh sách kết quả sau khi lọc, có phân trang.
- **`TransactionItem`**: 1 dòng giao dịch: tên, loại (badge), số tiền, danh mục, ngày, ghi chú, nút sửa/xóa.
- **`TransactionForm`**: Form trong Modal, xử lý cả thêm mới lẫn chỉnh sửa. Validation inline.

### 📂 `components/categories/`

- **`CategoriesPage`**: Trang quản lý, compose Form + List.
- **`CategoryForm`**: Input tên danh mục + chọn icon + chọn màu.
- **`CategoryList`**: Danh sách các danh mục.
- **`CategoryItem`**: Icon + tên + màu + badge số giao dịch sử dụng + nút xóa (disabled nếu đang dùng).

---

### 🧩 `context/AppContext.jsx`

```
State shape:
{
  transactions: Transaction[],
  categories: Category[],
  theme: 'light' | 'dark'
}

Transaction = {
  id: string (uuid),
  name: string,
  type: 'income' | 'expense',
  amount: number,
  categoryId: string,
  date: string (ISO),
  note: string
}

Category = {
  id: string (uuid),
  name: string,
  icon: string (emoji hoặc Lucide icon name),
  color: string (hex hoặc tailwind color)
}
```

### 🪝 `hooks/`

| Hook               | Chức năng                                              |
| ------------------- | ------------------------------------------------------ |
| `useLocalStorage`   | Đọc/ghi giá trị vào localStorage, trả về `[value, setValue]` |
| `useTransactions`   | `add`, `update`, `delete`, `getFiltered`, `getSummary` |
| `useCategories`     | `add`, `delete`, `getAll`, `isInUse(categoryId)`       |

### 🔧 `utils/`

| File             | Nội dung                                                |
| ---------------- | ------------------------------------------------------- |
| `constants.js`   | `DEFAULT_CATEGORIES`, `TRANSACTION_TYPES`, `ITEMS_PER_PAGE` |
| `formatters.js`  | `formatCurrency(amount)`, `formatDate(dateStr)`, `formatRelativeDate(dateStr)` |
| `validators.js`  | `validateTransaction(data)` → trả về object `{ isValid, errors }` |
