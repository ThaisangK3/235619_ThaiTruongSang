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

## Docker Backend

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
