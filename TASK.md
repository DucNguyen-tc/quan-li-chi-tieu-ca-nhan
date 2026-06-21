# TASK: Xây dựng Ứng dụng Quản lý Chi tiêu Cá nhân (React + Vite)

## Mô tả dự án

Xây dựng một Single Page Application quản lý chi tiêu cá nhân hoàn chỉnh.
Mục tiêu: Luyện tập quản lý state, chia nhỏ components, xử lý form, filter dữ liệu,
custom hooks và lưu dữ liệu trên trình duyệt (localStorage).

---

## Yêu cầu chức năng (Bắt buộc)

### 1. Dashboard tổng quan

- Hiển thị **tổng thu** (tổng tiền các giao dịch loại "Thu").
- Hiển thị **tổng chi** (tổng tiền các giao dịch loại "Chi").
- Hiển thị **số dư hiện tại** = Tổng thu - Tổng chi.
- Hiển thị **số lượng giao dịch** tổng cộng.
- Hiển thị danh sách **giao dịch gần đây** (5–7 items).

### 2. Thêm giao dịch

Người dùng có thể thêm giao dịch mới với các trường:

| Trường          | Bắt buộc | Mô tả                           |
| --------------- | -------- | -------------------------------- |
| Tên giao dịch   | ✅        | Không được bỏ trống              |
| Loại giao dịch  | ✅        | Thu / Chi                        |
| Số tiền         | ✅        | Phải > 0                         |
| Danh mục        | ❌        | Chọn từ danh mục đã có           |
| Ngày giao dịch  | ✅        | Phải chọn ngày                   |
| Ghi chú         | ❌        | Nội dung tùy chọn                |

**Validation form:**

- Không được bỏ trống tên giao dịch.
- Số tiền phải lớn hơn 0.
- Phải chọn loại giao dịch (Thu/Chi).
- Phải chọn ngày giao dịch.

### 3. Danh sách giao dịch

- Hiển thị danh sách các giao dịch đã tạo.
- Mỗi item hiển thị: Tên, Loại, Số tiền, Danh mục, Ngày, Ghi chú (nếu có).
- Cho phép **xóa** giao dịch.
- Cho phép **sửa** giao dịch.

### 4. Tìm kiếm và lọc

- Tìm kiếm giao dịch **theo tên**.
- Lọc theo **loại**: Tất cả / Thu / Chi.
- Lọc theo **danh mục**.
- Lọc theo **khoảng ngày** (từ ngày – đến ngày).
- Sắp xếp theo **ngày mới nhất** hoặc **cũ nhất**.

### 5. Quản lý danh mục

Danh mục mặc định:

- Ăn uống
- Di chuyển
- Lương
- Mua sắm
- Giải trí
- Khác

Chức năng:

- Thêm danh mục mới.
- Xóa danh mục (chỉ khi chưa được sử dụng trong bất kỳ giao dịch nào).
- Mỗi danh mục có thể gắn icon + màu sắc.

### 6. Lưu dữ liệu

- Dữ liệu phải được lưu bằng **localStorage**.
- Khi reload trang, dữ liệu **không bị mất**.

---

## Yêu cầu kỹ thuật (Bắt buộc)

- Sử dụng **React + Vite**.
- **Tailwind CSS** (đã cài đặt sẵn v4).
- Chia nhỏ components rõ ràng, **không viết toàn bộ logic trong App.jsx**.
- Sử dụng **custom hooks**:
  - `useLocalStorage` — đọc/ghi localStorage.
  - `useTransactions` — quản lý state giao dịch.
  - `useCategories` — quản lý state danh mục.
- Sử dụng **useReducer** hoặc **useContext** để quản lý state toàn cục.
- **Không dùng UI library** (Ant Design, MUI, Bootstrap).
- Code sạch, dễ đọc, đặt tên biến và component có ý nghĩa.
- Validation form rõ ràng.

---

## Tính năng nâng cao (Làm được càng tốt)

- [x] Biểu đồ Pie Chart hiển thị tỷ lệ chi tiêu theo danh mục.
- [x] Export danh sách giao dịch ra file JSON.
- [x] Confirm popup trước khi xóa.
- [x] Dark mode.
- [x] Phân trang cho danh sách giao dịch.

---

## Tiêu chí đánh giá

| Tiêu chí                           | Trọng số |
| ----------------------------------- | -------- |
| Hoàn thành đúng chức năng           | ⭐⭐⭐⭐⭐  |
| Biết chia nhỏ components            | ⭐⭐⭐⭐   |
| Biết tách logic ra custom hooks     | ⭐⭐⭐⭐   |
| Biết quản lý state hợp lý           | ⭐⭐⭐⭐   |
| Code sạch, dễ đọc, ít lặp lại      | ⭐⭐⭐    |
| Giao diện có sự chăm chút           | ⭐⭐⭐    |
| Dữ liệu không mất khi reload trang  | ⭐⭐⭐⭐⭐  |
