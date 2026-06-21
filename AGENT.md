# AGENT INSTRUCTIONS

Bạn là một Senior React Developer chuyên nghiệp. Dưới đây là các quy tắc bắt buộc
khi làm việc trên dự án này.

---

## Công nghệ bắt buộc

| Thư viện          | Phiên bản | Mục đích                     |
| ----------------- | --------- | ---------------------------- |
| React             | 19.x      | UI framework                 |
| Vite              | 8.x       | Build tool                   |
| Tailwind CSS      | 4.x       | Styling (đã cài sẵn)        |
| Lucide React      | latest    | Icon library                 |
| date-fns          | latest    | Xử lý ngày tháng            |
| uuid              | latest    | Tạo unique ID                |

> **KHÔNG** được dùng UI library: Ant Design, MUI, Bootstrap, Chakra, v.v.

---

## Quy tắc code

### 1. Cấu trúc & tổ chức

- Chia nhỏ components — mỗi component một file riêng.
- **KHÔNG** viết toàn bộ logic trong `App.jsx`. App.jsx chỉ chứa routing/layout.
- Tách logic nghiệp vụ vào **custom hooks** (`useLocalStorage`, `useTransactions`, `useCategories`).
- Sử dụng **useContext + useReducer** cho state toàn cục (transactions, categories, theme).
- Tổ chức folder theo chức năng (xem `STRUCTURE_PROJECT.md`).

### 2. Naming conventions

- **Components**: PascalCase → `TransactionForm.jsx`, `DashboardCard.jsx`
- **Hooks**: camelCase, prefix `use` → `useLocalStorage.js`, `useTransactions.js`
- **Context**: PascalCase, suffix `Context/Provider` → `AppContext.jsx`, `ThemeProvider.jsx`
- **Constants**: SCREAMING_SNAKE_CASE → `DEFAULT_CATEGORIES`, `TRANSACTION_TYPES`
- **CSS files**: kebab-case hoặc cùng tên component → `TransactionForm.css`
- **Biến, hàm**: camelCase, tên có ý nghĩa → `totalIncome`, `handleDeleteTransaction`

### 3. Component patterns

- Mỗi component chỉ làm **một việc** (Single Responsibility).
- Props phải có ý nghĩa rõ ràng.
- Tránh prop drilling quá 2 cấp → dùng Context.
- Sử dụng `React.memo` cho component không cần re-render.

### 4. State management

```
AppContext (useReducer)
├── transactions[] — danh sách giao dịch
├── categories[] — danh sách danh mục
└── theme — 'light' | 'dark'
```

- Mọi component truy cập state qua `useContext(AppContext)`.
- Dispatch actions thông qua reducer (ADD, UPDATE, DELETE, SET).

### 5. Styling

- Sử dụng **Tailwind CSS utility classes** là chính.
- Có thể viết custom CSS cho animation hoặc layout phức tạp.
- Hỗ trợ **dark mode** (Tailwind `dark:` prefix).
- Responsive: Mobile-first approach.

### 6. Data persistence

- Tất cả dữ liệu (transactions, categories, theme) lưu vào **localStorage**.
- Sử dụng custom hook `useLocalStorage` để đọc/ghi.
- Khi app load, đọc dữ liệu từ localStorage để khôi phục state.

### 7. Form validation

- Validate **phía client** trước khi submit.
- Hiển thị lỗi inline bên dưới mỗi trường.
- Các trường bắt buộc: tên giao dịch, loại, số tiền (> 0), ngày.

### 8. Code quality

- Comment giải thích logic phức tạp.
- Không duplicate code — extract thành helper/utils.
- Xóa console.log trước khi commit.
- Import gọn gàng, nhóm theo: React → third-party → local.

---

## Quy trình làm việc

1. Đọc `TASK.md` để hiểu yêu cầu.
2. Xem `STRUCTURE_PROJECT.md` để biết cấu trúc folder.
3. Xem `TODO.md` để biết thứ tự triển khai.
4. Xem `UI_DESIGN.md` để hiểu thiết kế giao diện.
5. Code theo thứ tự trong TODO.md, đánh dấu `[x]` khi hoàn thành.
