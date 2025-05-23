
# Website Đặt Đồ Ăn - Nhóm 8

# Thành viên thực hiện

- Nguyễn Công Đức – 22050024  
- Lương Thanh Hoàn  
- Hồ Văn Tài  

---
# Giảng viên hướng dẫn:
- ThS. Nguyễn Thanh Sơn
- ThS. Hồ Ngọc Giàu
- ThS. Dương Anh Tuấn
- ThS. Nguyễn Hữu Quyền



## 1. Mô Tả Tổng Quan Hệ Thống

**Website đặt đồ ăn** cho phép người dùng:

- Xem thực đơn, lọc món ăn theo danh mục  
- Thêm món vào giỏ hàng  
- Đăng ký / Đăng nhập  
- Đặt hàng và thanh toán qua Stripe  
- Theo dõi đơn hàng đã đặt  

**Giao diện quản trị viên** có thể:

- Thêm / xóa món ăn  
- Xem danh sách món ăn  
- Xem và cập nhật trạng thái đơn hàng  

---

## 2. 🛠️ Công Nghệ Sử Dụng

| Thành phần     | Công nghệ sử dụng                |
|----------------|----------------------------------|
| Frontend       | ReactJS, React Router            |
| Backend        | Node.js, Express.js              |
| Cơ sở dữ liệu  | MongoDB Atlas                    |
| Thanh toán     | Stripe API                       |
| Xác thực       | JWT + Bcrypt                     |
| Upload ảnh     | Multer (upload ảnh món ăn)       |

---

## 3. 🔄 Luồng Hoạt Động Hệ Thống

### A. Frontend (ReactJS)

- `/` Trang chủ: Hiển thị thực đơn (component `FoodDisplay`)
- Lọc món ăn theo danh mục (component `ExploreMenu`)
- `/cart`: Xem giỏ hàng, tổng tiền, thanh toán
- `/order`: Nhập địa chỉ, gửi đơn hàng, chuyển đến Stripe
- `/verify`: Stripe redirect sau thanh toán, xác minh đơn hàng
- `/myorders`: Danh sách đơn hàng đã đặt
- Đăng ký / Đăng nhập: Gửi tới `/api/user/login` và `/api/user/register`, nhận JWT và lưu `localStorage`

### B. Backend (Node.js + Express)

- **Middleware xác thực JWT** cho các API giỏ hàng và đơn hàng

####  API Giỏ Hàng - `/api/cart`

| Method | Endpoint     | Mô tả                    |
|--------|--------------|--------------------------|
| POST   | /add         | Thêm món vào giỏ hàng    |
| POST   | /remove      | Xóa món khỏi giỏ hàng    |
| POST   | /get         | Lấy giỏ hàng hiện tại    |

####  API Món Ăn - `/api/food`

| Method | Endpoint     | Mô tả                    |
|--------|--------------|--------------------------|
| GET    | /list        | Lấy danh sách món ăn     |
| POST   | /add         | Thêm món ăn mới + ảnh    |
| POST   | /remove      | Xóa món ăn               |

####  API Đơn Hàng - `/api/order`

| Method | Endpoint     | Mô tả                                |
|--------|--------------|--------------------------------------|
| POST   | /place       | Tạo đơn hàng, trả về Stripe URL     |
| POST   | /verify      | Xác minh thanh toán                 |
| POST   | /userorders  | Lấy đơn hàng của người dùng         |
| GET    | /list        | (Admin) Lấy toàn bộ đơn hàng        |
| POST   | /status      | (Admin) Cập nhật trạng thái         |

####  API Người Dùng - `/api/user`

| Method | Endpoint     | Mô tả                    |
|--------|--------------|--------------------------|
| POST   | /register    | Đăng ký tài khoản        |
| POST   | /login       | Đăng nhập                |

---

## 4.  Quy Trình Đặt Hàng & Thanh Toán

1. Người dùng thêm món vào giỏ  
2. Nhấn **Thanh toán**, nhập địa chỉ giao hàng  
3. Gửi yêu cầu tới `/api/order/place`  
4. Stripe tạo phiên thanh toán → redirect người dùng  
5. Sau thanh toán thành công → Stripe redirect về `/verify`  
6. Gửi yêu cầu tới `/api/order/verify` → cập nhật trạng thái đơn hàng thành **"Đã thanh toán"**

---

## 5. Chức Năng Đã Hoàn Thành

| Người dùng                      | Quản trị viên                      |
|---------------------------------|------------------------------------|
| Xem menu, lọc món ăn           | Thêm / xóa món ăn                  |
| Thêm món vào giỏ hàng          | Xem danh sách món ăn              |
| Đặt hàng và thanh toán         | Cập nhật trạng thái đơn hàng      |
| Đăng ký / Đăng nhập            |                                    |
| Theo dõi đơn hàng              |                                    |

---

## 6. Hướng Dẫn Chạy Dự Án

### A. Cài Đặt Môi Trường

Tạo file `.env` trong thư mục `backend` với nội dung:

```env
JWT_SECRET="random#secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

Cập nhật file `db.js` để kết nối MongoDB Atlas (URI).

Trong MongoDB Atlas:
- Truy cập mục **Network Access**
- Thêm IP: `0.0.0.0/0`

### B. Cài Đặt Các Gói

```bash
# Backend
cd backend
npm install

# Frontend người dùng
cd ../frontend
npm install

# Giao diện admin
cd ../admin
npm install
```

### C. Chạy Dự Án

```bash
# Chạy backend
cd backend
npm start

# Chạy frontend người dùng
cd ../frontend
npm run dev

# Chạy giao diện admin
cd ../admin
npm run dev
```

### D. Truy Cập Giao Diện

- Người dùng: [http://localhost:5173](http://localhost:5173)  
- Admin: [http://localhost:5174](http://localhost:5174)  
- Backend API: [http://localhost:4000](http://localhost:4000)
