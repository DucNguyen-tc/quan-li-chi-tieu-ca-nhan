# TODO — Thứ tự triển khai

> Checklist này xác định thứ tự làm việc từ nền tảng → chức năng → nâng cao.
> Đánh dấu `[x]` khi hoàn thành mỗi bước.

---

## Phase 1: Setup & Nền tảng

- [x] Cài đặt dependencies bổ sung (`lucide-react`, `date-fns`, `uuid`)
- [x] Tạo cấu trúc folder theo `STRUCTURE_PROJECT.md`
- [x] Thiết lập Tailwind config (colors, dark mode, fonts)
- [x] Tạo file `index.css` với Tailwind imports + CSS variables
- [x] Tạo constants: `DEFAULT_CATEGORIES`, `TRANSACTION_TYPES`

## Phase 2: Custom Hooks

- [x] `useLocalStorage` — đọc/ghi dữ liệu vào localStorage
- [x] `useCategories` — CRUD danh mục, seed danh mục mặc định
- [x] `useTransactions` — CRUD giao dịch, tính tổng thu/chi/số dư

## Phase 3: Context & State Management

- [x] Tạo `AppContext` với `useReducer`
- [x] Tạo `AppProvider` bọc toàn bộ app
- [x] Định nghĩa reducer actions: `ADD_TRANSACTION`, `UPDATE_TRANSACTION`, `DELETE_TRANSACTION`, `ADD_CATEGORY`, `DELETE_CATEGORY`, `SET_THEME`
- [x] Kết nối custom hooks với context

## Phase 4: Components dùng chung (Common)

- [x] `Button` — primary, secondary, danger variants
- [x] `Card` — container có shadow, border-radius
- [x] `Modal` — overlay popup, hỗ trợ đóng/mở
- [x] `ConfirmDialog` — xác nhận trước khi xóa
- [x] `Input` — text input có label + error message
- [x] `Select` — dropdown select
- [x] `Badge` — hiển thị tag nhỏ (loại giao dịch, danh mục)
- [x] `EmptyState` — hiển thị khi không có dữ liệu
- [x] `Pagination` — phân trang

## Phase 5: Layout & Navigation

- [x] `Layout` — wrapper chính (Header + Sidebar + Content)
- [x] `Header` — logo, tiêu đề app, nút Dark mode
- [x] `Sidebar` — menu điều hướng giữa các trang
- [x] Xây dựng hệ thống navigation (state-based, không cần react-router)

## Phase 6: Dashboard

- [x] `DashboardPage` — trang chính
- [x] `SummaryCard` — card hiển thị 1 metric (tổng thu / tổng chi / số dư / số giao dịch)
- [x] `SummaryGrid` — grid chứa 4 SummaryCard
- [x] `RecentTransactions` — danh sách 5–7 giao dịch gần nhất
- [x] `TransactionItem` — 1 row giao dịch (dùng chung cho Dashboard + Transactions)

## Phase 7: Quản lý Giao dịch

- [x] `TransactionsPage` — trang danh sách giao dịch
- [x] `TransactionForm` — form thêm/sửa giao dịch (trong Modal)
- [x] Validation logic cho form
- [x] `TransactionList` — danh sách giao dịch có phân trang
- [x] `TransactionFilters` — thanh tìm kiếm + bộ lọc
  - [x] Tìm kiếm theo tên
  - [x] Lọc theo loại (Tất cả / Thu / Chi)
  - [x] Lọc theo danh mục
  - [x] Lọc theo khoảng ngày
  - [x] Sắp xếp theo ngày (mới nhất / cũ nhất)
- [x] Chức năng sửa giao dịch (load dữ liệu vào form)
- [x] Chức năng xóa giao dịch (có confirm)

## Phase 8: Quản lý Danh mục

- [x] `CategoriesPage` — trang quản lý danh mục
- [x] `CategoryForm` — form thêm danh mục mới
- [x] `CategoryList` — danh sách danh mục
- [x] `CategoryItem` — 1 row danh mục (icon + tên + màu + nút xóa)
- [x] Logic kiểm tra: không cho xóa danh mục đang được dùng

## Phase 9: Tính năng nâng cao

- [x] **Dark mode** — toggle light/dark, lưu vào localStorage
- [x] **Pie Chart** — biểu đồ tỷ lệ chi theo danh mục (CSS hoặc Canvas)
- [x] **Export JSON** — tải xuống file JSON chứa danh sách giao dịch
- [x] **Confirm popup** — hiện dialog xác nhận trước mọi hành động xóa
- [x] **Phân trang** — 10 giao dịch / trang, có nút prev/next

## Phase 10: Polish & Hoàn thiện

- [x] Responsive design: kiểm tra trên mobile / tablet / desktop
- [x] Animation / Transition cho modal, sidebar, hover effects
- [x] Empty states cho các trang khi chưa có dữ liệu
- [x] Xử lý edge cases (số tiền quá lớn, tên quá dài, v.v.)
- [x] Kiểm tra localStorage hoạt động đúng sau reload
- [ ] Cleanup: xóa console.log, code thừa
- [ ] Review code lần cuối, refactor nếu cần
