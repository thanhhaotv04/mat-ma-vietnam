# Mật Mã Việt Nam

Game trình duyệt khám phá Việt Nam qua bản đồ, câu đố hình ảnh và thẻ sưu tập. Bản static HTML/CSS/JavaScript, dùng Firebase Authentication và Cloud Firestore để lưu tiến trình riêng theo tài khoản.

## Chạy

```bash
npm install
npm run dev
```

Mở http://localhost:4173. Có thể phục vụ `dist/` bằng static web server; không mở bằng `file://` vì game tải JSON và module.

## Nội dung và cách chơi

- 34 chapter theo tỉnh thành hiện tại, 63 vùng xuất phát; 346 thẻ gồm 264 địa danh và 82 đặc sản. Trong đó có 13 thẻ bí mật liên vùng; mở khi đã mở khóa 2 vùng nhỏ liên quan (trong 63 vùng), không cần hoàn thành cả chapter hoặc toàn bộ thẻ. Thẻ bí mật không tính vào điều kiện hoàn thành tỉnh và được nhận một lần duy nhất. Xem [danh sách và nguồn](docs/easter-eggs.md).
- Bản đồ sách chọn vùng bằng cách chạm vào hình. Tab icon bên trái mở bản đồ sát tỉnh hiện tại; kéo, lăn chuột hoặc chụm hai ngón để đổi khung nhìn, không có các nút miền/zoom.
- Màu vàng là vùng còn thẻ địa danh/đặc sản chưa mở; chỉ thu thập đủ mới xanh. Mốc 3 thẻ để mở đường giữ nguyên. Phân nhóm địa lý trong dữ liệu giữ theo 34 tỉnh hiện tại; giao diện bản đồ tập trung tỉnh đang chơi.
- Thẻ có tỷ lệ 3:4, ảnh vuông nguyên vẹn ở trên, tên bên dưới. Tab Bộ Sưu Tập gom thẻ đã có trên toàn hành trình với ba tab nhỏ Địa Danh Nổi Tiếng / Đặc Sản / Thành Tựu. Bộ Sưu Tập hiển thị 3 thẻ mỗi hàng và số đã mở/tổng thẻ riêng cho từng nhóm. 10 thẻ Thành Tựu có ảnh riêng, bấm để xem điều kiện và tiến độ. Logo UNESCO trắng trên nền xanh ở góc thẻ đã mở thuộc hồ sơ UNESCO; nguồn và phạm vi ở `docs/unesco-badge.md`.
- Danh sách thẻ chỉ có ảnh và tên; thẻ khóa bị mờ và ẩn tên. Trang bên phải đổi tiêu đề theo tab Địa Danh Nổi Tiếng / Đặc Sản / Thành Tựu. Vùng chưa có đặc sản đủ căn cứ không bị ép thêm thẻ món ăn.
- Chạm thẻ mở thẳng câu đố Nhận diện hình ảnh: 16 ô hé ngẫu nhiên mỗi 500 ms, không lặp; bên dưới là đoạn văn điền khuyết và bốn đáp án cùng chủ đề. Không có bước chọn chế độ hoặc gợi ý.
- Đồng hồ bắt đầu khi ảnh tải/giải mã xong. Đúng ngay lần chọn đầu của lượt thử thách và dưới 3000 ms nhận thẻ lấp lánh, lưu cùng tiến độ. Chơi lại thẻ đã nhận không nâng độ lấp lánh hoặc nhân đôi thẻ.
- Đáp án đúng tự hiện ảnh thẻ, giới thiệu ngắn và nguồn. Ba thẻ khác nhau mở các vùng còn lại trong chapter; hoàn thành mọi vùng mở chapter tiếp giáp.
- Hồ sơ khách hoặc email/mật khẩu, đồng bộ Firebase theo UID; vẫn lưu cục bộ và hỗ trợ xuất/nhập JSON. Tiến trình chưa có chống gian lận ở server.

## Ảnh riêng cho từng thẻ

Mỗi thẻ dùng một ảnh được tạo độc lập bằng imagegen, không cắt từ atlas hay collage. Tệp phục vụ trình duyệt ở `dist/assets/cards/<id>.webp`, bản PNG gốc giữ ở `output/card-originals/` (gitignored). `scripts/individual-art.json` lưu ID, đường dẫn và prompt cho từng ảnh.

Khung thẻ trong danh sách, nhận thẻ và xem lại là 3:4; phần ảnh và ảnh câu hỏi đều vuông; ảnh hiển thị bằng `<img>` với `object-fit: contain`. Chuyển PNG sang WebP giữ nguyên toàn bộ khung và kích thước pixel:

```bash
node scripts/optimize-card-art.mjs  # cần ffmpeg
node scripts/update-questions.mjs
```

## Nguồn nội dung và bản đồ

- `scripts/food-review.json` và `docs/food-review.md`: đối chiếu 79 món ban đầu; giữ 78, tạm bỏ Bún nước sụ. Bánh cống Đại Tâm chuyển về vùng Sóc Trăng, vẫn giữ ID để tương thích tiến độ.
- `scripts/new-places.json`: 55 địa danh thêm, trải trên 34 chapter, kèm giới thiệu và nguồn. Bãi Xép được thay bằng Đầm Ô Loan vì thông tin tiếp cận chưa rõ.
- `scripts/content.py`, `scripts/prepare.py` và `scripts/wiki-references.json`: nguồn dữ liệu ban đầu. `update-questions.mjs` áp dụng phần biên tập và ánh xạ ảnh sau khi tái tạo.
- Bản đồ sách giữ polygon WGS84 từ Vietnamese Provinces Database và phép ghép 63 vùng bằng mã lịch sử. Tiếp giáp chapter tính theo đường bao; hình học đã giản lược, không dùng xác định địa giới pháp lý.
- `dist/world-map.json`: silhouette phẳng từ `App/VietNam-map-checkin/assets/vietnam-provinces.geojson`, ghép thành 34 chapter, có các đảo/quần đảo. Lớp này dùng riêng để vẽ bản đồ, không phải kinh/vĩ độ. `scripts/prepare-world-map.py` tái tạo bằng Python + Shapely.
- Hoàng Sa/Trường Sa dùng bố cục thu gọn gần bờ để phần đất liền dễ nhìn; hình học gốc và tọa độ GPS giữ riêng. Nhãn thu gọn phân biệt bố cục hiển thị với vị trí thật.
- `scripts/coordinate-review.json` và `docs/coordinate-review.md`: rà đủ 94 pin ban đầu, giữ 82 có nguồn tọa độ và ẩn 12 pin chưa đủ căn cứ. Chỉ đặt pin có `coordinateVerified`; không dùng tâm xã/phường hay tâm tỉnh. `scripts/enrich-new-places.py` bổ sung tọa độ cho nhóm mới.
- Danh hiệu UNESCO thuộc đúng hồ sơ quần thể. Di sản phi vật thể có hồ sơ dùng chung, không giả làm địa điểm tham quan.
- Tranh là minh họa hoạt hình, cần tiếp tục duyệt chi tiết kiến trúc/ẩm thực. Nguồn, giấy phép font và dữ liệu có trong `dist/credits.html`.

## Kiểm tra

```bash
npm run build
npm test
# bật server cổng 4173 trước khi kiểm tra trình duyệt
node tests/browser.mjs
node tests/reveal-flow.mjs
node tests/minimal-map-flow.mjs
node tests/map-progress-flow.mjs
node tests/compact-map-flow.mjs
node tests/collection-flow.mjs
node tests/collection-achievements-flow.mjs
node tests/food-flow.mjs
node tests/card-layout.mjs
node tests/landmark-flow.mjs
```

Kiểm tra bao gồm điều kiện mở vùng, khôi phục tiến độ cũ, chuyển vùng đặc sản, 55 địa danh bổ sung, tiêu điểm bản đồ và đảo, các mốc 499/500/2999/3000/8000 ms, ảnh vuông, bố cục điện thoại và lưu thẻ lấp lánh. Ảnh QA nằm trong `artifacts/` (gitignored).

## Chơi qua Firebase

Link gửi cho người chơi: https://mat-ma-viet-nam-hao.web.app

Xem [cấu hình, tài khoản và đồng bộ tiến trình](docs/firebase.md). Build SDK bằng `npm run build:cloud` sau khi sửa `src/cloud.mjs`.

- Ngân hàng câu hỏi đã rà: `scripts/question-review.json`; quy trình, nguồn và giới hạn kiểm chứng: [docs/question-review.md](docs/question-review.md).

- Rà ảnh, gợi ý bí mật và điều kiện lấp lánh: [docs/image-review.md](docs/image-review.md).
