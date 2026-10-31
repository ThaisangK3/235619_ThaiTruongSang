# Hệ thống quản lý thiết bị phòng học

**Sinh viên:** Thái Trường Sang
**MSSV:** 235619

## 1. Giới thiệu
Hệ thống quản lý thiết bị phòng học được xây dựng và triển khai trên nền tảng điện toán đám mây.

Các chức năng chính:
- Xem danh sách và chi tiết thiết bị
- Thêm, sửa và xóa thiết bị
- Tìm kiếm thiết bị
- Quản lý tình trạng sử dụng thiết bị

## 2. Công nghệ
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Quản lý mã nguồn: Git và GitHub
- Đóng gói: Docker
- Triển khai: Render

## 3. Cấu trúc dự án
- `backend/`: REST API và kết nối MongoDB Atlas
- `frontend/`: Giao diện quản lý thiết bị bằng React

## 4. Cài đặt và chạy dự án
Yêu cầu Node.js 20 trở lên và npm.

### Backend
Sau khi hoàn thành backend:
1. Vào thư mục `backend`.
2. Cài đặt dependencies bằng `npm install`.
3. Tạo file `.env` từ `.env.example` và điền cấu hình MongoDB Atlas.
4. Chạy bằng `npm run dev`.

### Frontend
Sau khi hoàn thành frontend:
1. Vào thư mục `frontend`.
2. Cài đặt dependencies bằng `npm install`.
3. Chạy bằng `npm run dev`.

## 5. Triển khai
Docker Hub, Render và các URL triển khai sẽ được cập nhật ở những câu tiếp theo.

## 6. Bảo mật
Không đưa mật khẩu, access token hoặc chuỗi kết nối chứa thông tin xác thực lên GitHub.

## Câu 5. Đóng gói backend bằng Docker và đẩy lên Docker Hub

Docker Hub:
https://hub.docker.com/r/235619thaitruongsang/backend

Image:
235619thaitruongsang/backend:1.0

Build và push:
docker buildx build --platform linux/amd64 -t 235619thaitruongsang/backend:1.0 -f backend/Dockerfile --push backend

Chạy container:
docker run -d --name classroom-backend-test -p 5001:5000 --env-file backend/.env 235619thaitruongsang/backend:1.0

Kiểm tra:
curl http://localhost:5001/health

Lưu ý: File backend/.env chỉ lưu trên máy và không được đưa lên GitHub.

## Câu 6. Đóng gói frontend bằng Docker
Docker Hub: https://hub.docker.com/r/235619thaitruongsang/frontend

Image: `235619thaitruongsang/frontend:1.0`

## Câu 7. Triển khai frontend trên Render

Service: web-235619
URL: https://web-235619.onrender.com
Runtime: Docker + Nginx
Root Directory: frontend
Backend URL: https://api-235619.onrender.com
Environment Variable: BACKEND_URL

Frontend kết nối Backend API thông qua Nginx reverse proxy.

## Câu 8. Triển khai backend API trên Render

Service: api-235619
URL: https://api-235619.onrender.com
Health: https://api-235619.onrender.com/health
Devices API: https://api-235619.onrender.com/api/devices

Runtime: Docker
Database: MongoDB Atlas
Root Directory: backend
Environment Variables: MONGODB_URI, NODE_ENV

## Câu 9. Kiểm tra tổng thể và hoàn thiện bài nộp

Sinh viên: Thái Trường Sang
MSSV: 235619

### Kiến trúc hệ thống
React + Vite -> Nginx -> Node.js + Express -> MongoDB Atlas

### Các đường dẫn triển khai
GitHub: https://github.com/ThaisangK3/235619_ThaiTruongSang
Docker Backend: https://hub.docker.com/r/235619thaitruongsang/backend
Docker Frontend: https://hub.docker.com/r/235619thaitruongsang/frontend
Render Frontend: https://web-235619.onrender.com
Render Backend: https://api-235619.onrender.com

### Chức năng
- Hiển thị danh sách thiết bị
- Xem chi tiết thiết bị
- Thêm thiết bị
- Sửa thông tin thiết bị
- Xóa thiết bị
- Tìm kiếm thiết bị

### Kiểm thử
- Backend API kết nối MongoDB Atlas thành công.
- Frontend và Backend đã triển khai trên Render.
- Nginx reverse proxy trả về HTTP 200 cho API thiết bị.
- Đã sửa lỗi 502 Bad Gateway.
- File .env không được đưa lên GitHub.
