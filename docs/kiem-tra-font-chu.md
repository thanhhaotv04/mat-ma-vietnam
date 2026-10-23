# Kiểm tra font chữ — 22/10/2026

Đã kiểm tra bản local bằng Chromium ở 375, 768, 1024 và 1440 px, mức zoom mặc định 100%.

## Phạm vi

19 màn hình/trạng thái ở mỗi kích thước, tổng 76 lượt: bắt đầu, đăng nhập, đăng ký, chơi thử, địa danh, xem thẻ, ghép chữ, gợi ý, đặc sản, câu hỏi đặc sản, nhận thưởng, bộ sưu tập, thành tựu, xem thành tựu, tìm kiếm, bản đồ, hồ sơ, bắt đầu lại và trang nguồn.

Dùng Chrome DevTools Protocol để kiểm tra font thực sự vẽ các đoạn chữ hiển thị, thay vì chỉ đọc font-family trong CSS. Chờ font và hiệu ứng hữu hạn tải xong. Kiểm tra 2.732 mẫu chữ; chụp 76 ảnh màn hình và xem trực tiếp các ảnh đại diện của đăng nhập, ghép chữ, bộ sưu tập, xem thẻ và nhận thưởng.

## Kết quả

- Font chữ tiếng Việt được kiểm tra đều dùng Nunito, gồm các cửa sổ nổi và màn hình nhận thưởng.
- Không thấy dấu tiếng Việt rơi sang font dự phòng trong các mẫu đã kiểm tra.
- Phát hiện ký tự mũi tên ← trên trang nguồn phải dùng Arial dự phòng. Đã thay bằng SVG; chữ “Về game” vẫn dùng Nunito.
- Sau sửa: 76 lượt, 2.732 mẫu chữ, 0 kết quả lệch font, 0 lỗi JavaScript.
- Build và 51 bài kiểm tra đơn vị đạt; git diff --check đạt.

## Chạy lại

Khởi động `npm run dev`, sau đó chạy `node tests/font-audit-flow.mjs`.

Bằng chứng được ghi ở `artifacts/font-audit/results.json` và ảnh PNG cùng thư mục.

Giới hạn: kiểm tra bản local bằng Chromium, không phải xác nhận trên Safari/Firefox hoặc mọi thiết bị thực tế. Kiểm tra này không khẳng định mọi chuỗi tên dài đều vừa mọi ô thẻ. Chưa triển khai thay đổi lên web công khai.
