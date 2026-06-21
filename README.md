# 💰 Quản lý Chi tiêu Cá nhân

> Ứng dụng quản lý chi tiêu cá nhân được xây dựng bằng **React + Vite** — bài tập luyện tập quản lý state, custom hooks, form handling và localStorage.

---

## ✨ Tính năng

### Chức năng chính

- 📊 **Dashboard tổng quan** — Tổng thu, tổng chi, số dư, số lượng giao dịch
- ➕ **Thêm / Sửa / Xóa giao dịch** — Form có validation đầy đủ
- 🔍 **Tìm kiếm & Lọc** — Theo tên, loại (Thu/Chi), danh mục, khoảng ngày
- 📂 **Quản lý danh mục** — Thêm/xóa danh mục (có icon + màu sắc)
- 💾 **Lưu dữ liệu localStorage** — Không mất dữ liệu khi reload

### Tính năng nâng cao

### Tính năng nâng cao

- 🌙 Dark mode (Sắp hoàn thiện)
- 📈 ✅ Biểu đồ tỷ lệ chi tiêu theo danh mục (Pie Chart)
- 📥 ✅ Export giao dịch ra file JSON
- ⚠️ ✅ Confirm popup trước khi xóa
- 📄 ✅ Phân trang danh sách giao dịch

---

## 🛠 Công nghệ sử dụng

| Công nghệ      | Mục đích                  |
| --------------- | ------------------------- |
| React 19        | UI framework              |
| Vite 8          | Build tool / Dev server   |
| Tailwind CSS 4  | Styling + Design System "Luminous Ledger" |
| Material Symbols| Icons (thay thế cho lucide-react) |
| date-fns        | Xử lý ngày tháng         |
| uuid            | Tạo unique ID             |
| localStorage    | Lưu trữ dữ liệu          |

> ⚠️ **Không sử dụng** UI library (Ant Design, MUI, Bootstrap). Giao diện được tích hợp từ thiết kế chuyên nghiệp trên nền tảng Stitch.

---

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các component UI
│   ├── common/          # Components dùng chung (Button, Modal, Card, ...)
│   ├── dashboard/       # Components trang Dashboard
│   ├── transactions/    # Components quản lý giao dịch
│   └── categories/      # Components quản lý danh mục
├── context/             # React Context + Reducer
├── hooks/               # Custom hooks
├── utils/               # Hàm tiện ích, constants
├── styles/              # CSS files (nếu cần ngoài Tailwind)
├── App.jsx              # Root component (layout + routing)
├── main.jsx             # Entry point
└── index.css            # Tailwind base imports
```

Xem chi tiết: [`STRUCTURE_PROJECT.md`](./STRUCTURE_PROJECT.md)

---

## 🚀 Cách chạy

### Cài đặt

```bash
# Clone repository
git clone <repo-url>
cd quan-ly-chi-tieu-ca-nhan

# Cài dependencies
npm install
```

### Chạy development

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### Build production

```bash
npm run build
npm run preview
```

---

## 📋 Tài liệu dự án

| File                                              | Nội dung                       |
| ------------------------------------------------- | ------------------------------ |
| [`TASK.md`](./TASK.md)                            | Yêu cầu chức năng chi tiết    |
| [`AGENT.md`](./AGENT.md)                          | Quy tắc code & conventions    |
| [`TODO.md`](./TODO.md)                            | Thứ tự triển khai (checklist) |
| [`STRUCTURE_PROJECT.md`](./STRUCTURE_PROJECT.md)  | Cấu trúc folder & files       |
| [`UI_DESIGN.md`](./UI_DESIGN.md)                  | Thiết kế giao diện            |

---

## 📝 License

Bài tập học tập — React + Vite.
