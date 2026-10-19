# Sổ Việt

Game trình duyệt khám phá Việt Nam theo giao diện sổ hành trình đã duyệt. Đây là bản chơi thử đầu tiên, chạy bằng HTML/CSS/JavaScript thuần; không có phụ thuộc runtime hoặc khóa API.

## Chạy

```bash
npm install
npm run dev
```

Mở http://localhost:4173. Có thể phục vụ toàn bộ `dist/` bằng bất kỳ static web server nào; không mở bằng `file://` vì game cần tải JSON/module. Font và tranh được lưu cùng game, không phụ thuộc Google Fonts khi chơi.

## Đã có

- Hồ sơ cục bộ, chọn một trong 63 vùng xuất phát.
- 34 chapter hiện tại; 63 vùng tái dựng từ polygon phường/xã, tên vùng không thêm chữ “cũ”.
- Bản đồ Việt Nam chọn chapter, kéo và phóng to/thu nhỏ; bản đồ sách phân biệt vùng đang mở/chưa mở.
- Mỗi vùng ít nhất ba địa danh; 277 thẻ tổng cộng, có giới thiệu ngắn và đường dẫn tư liệu.
- Bốn icon trên “Bộ sưu tập”: bản đồ, món ăn, cúp thành tựu, tìm kiếm.
- Thẻ khóa mờ/ẩn tên; câu đố nhận diện tranh (khi có tranh), mô tả văn hóa và chọn vùng trên bản đồ.
- Đủ ba thẻ khác nhau mở tất cả vùng còn lại trong chapter. Hoàn thành toàn bộ vùng mở các chapter tiếp giáp. Thẻ không bị tiêu hao, chơi lại không nhân đôi.
- Thành tựu theo miền và nhóm món ăn/cầu; 17 hồ sơ di sản phi vật thể dùng chung, các địa danh đại diện cho 9 Di sản thế giới của Việt Nam theo danh mục UNESCO đã tra cứu.
- localStorage, xuất/nhập tiến độ JSON, xác nhận trước khi xóa tiến độ.
- Layout máy tính hai trang sách, điện thoại xếp dọc; bàn phím và reduced motion.

## Kiểm tra

```bash
npm run build
npm test
# cần Chromium của Playwright đã cài trên máy
node tests/browser.mjs
npm audit --audit-level=moderate
```

`npm run build` kiểm tra bản static trong `dist/`, không biên dịch framework. `tests/browser.mjs` cần server ở cổng 4173, kiểm tra thao tác thật và lưu ảnh vào `artifacts/` (gitignored).

## Dữ liệu và giới hạn bản đầu

- 12 hình minh họa riêng, tạo bằng imagegen, trong sprite atlas. Các thẻ khác dùng biểu tượng tạm; không dùng hình chung để đặt câu hỏi nhận diện địa danh. Cần tạo tranh riêng dựa trên ảnh gốc đã duyệt cho các thẻ còn lại.
- Wikipedia API đã giải 166 tên bài tham khảo và tìm 70 tham chiếu tọa độ; tọa độ chỉ dùng khi gần polygon của vùng tương ứng. Có thêm tọa độ biên tập cho nhóm địa danh mẫu. Chưa có tọa độ cho mọi thẻ: chỉ thẻ địa danh có tọa độ mới hiện chấm trên map, không tự đặt chấm vào tâm tỉnh.
- Đoạn giới thiệu là bản biên tập đề xuất; một đường dẫn tới bài có thật không đồng nghĩa mọi câu đã được duyệt. Tên chưa giải được bài dùng đường dẫn tìm tư liệu. Cần kiểm duyệt nội dung/địa chỉ/hình ảnh trước phát hành chính thức.
- Không gọi mọi di tích trong một tỉnh có UNESCO là di sản thế giới. Metadata danh hiệu gắn với đúng hồ sơ quần thể; di sản phi vật thể ở hồ sơ văn hóa dùng chung, không giả làm địa điểm tham quan.
- 63 vùng được tái dựng bằng polygon phường/xã hiện tại và mã tỉnh lịch sử trong v2.4.0 của Vietnamese Provinces Database. Sáu mã mới suy theo dải mã: 26732, 21548, 20333, 06978, 19742, 11948. Cần đối chiếu lớp ranh giới lịch sử nếu cần độ chính xác pháp lý. 34 chapter dùng đường bao tỉnh hiện tại từ cùng nguồn.
- Tiếp giáp dùng khoảng cách polygon dưới 0,001 độ; không nối theo khoảng cách tâm tỉnh. Cần kiểm chứng các trường hợp biên giới đặc biệt khi phát hành.
- Chưa có máy chủ tài khoản, mật khẩu, chống gian lận hoặc đồng bộ nhiều thiết bị. Bản xuất tiến độ không phải dữ liệu được ký/xác thực.
- Font Nunito và dataset có giấy phép kèm `dist/assets/`; nguồn đầy đủ trong `dist/credits.html`.

## Sửa nội dung

`dist/data.json` là dữ liệu dùng khi chơi. Các file `scripts/content.py`, `scripts/wiki-references.json` và `scripts/prepare.py` giữ nguồn để tái tạo; `enrich_wikipedia.py` chỉ dùng khi chủ động làm mới tra cứu. Tái tạo cần Python + Shapely và checkout dữ liệu tại đường dẫn khai báo trong script. Game đã xuất sẵn không cần Python/Shapely để build hoặc deploy.

Tranh atlas theo thứ tự 4 cột × 3 hàng, trường `art` trong dữ liệu chỉ ô 0–11. Thẻ mới không có tranh để `art: null`.
