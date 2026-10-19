# Tranh thẻ món ăn

Tạo bằng built-in imagegen, không dùng CLI/API key. Năm sprite atlas, mỗi atlas 4 × 4 ô vuông, thứ tự hàng từ trái sang phải. Lưu tại `dist/assets/food-atlas-0.png` đến `food-atlas-4.png`. 79 thẻ sử dụng 79 ô; ô cuối cùng là ô dự phòng.

Prompt chung: “Production sprite atlas for a Vietnamese travel-journal browser game. Exactly 4 columns by 4 rows of equal square tiles; no margins, gutters, text, numbers, labels, frames, watermarks or logos. Center each Vietnamese food in its own plate, bowl or banana leaf on ivory background. Hand-drawn cartoon, clean outlines, flat appetizing colors, restrained cel shading, no photorealism. Follow exact row-major order.”

Mỗi prompt thêm tên và mô tả của 16 món trong nhóm. Danh sách gốc gồm 79 thẻ món ăn theo `scripts/content.py`; vị trí ô lưu trong `foodArt` của `dist/data.json`. Riêng bánh tằm yêu cầu sợi bột gạo trắng, bì, thịt, dưa leo, rau và nước xốt nhạt; không vẽ thành bánh hoặc mì vàng.

Các tranh đã xem để kiểm tra thứ tự và chủ thể. Đây là minh họa tạo mới, chưa đối chiếu đủ ảnh gốc để xác nhận mọi chi tiết về trình bày đặc sản. Không dùng tranh để khẳng định công thức hoặc hình thức duy nhất của món.
