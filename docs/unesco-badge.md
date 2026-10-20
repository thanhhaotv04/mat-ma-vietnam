# UNESCO logo badge — 20/10/2026

Asset đang dùng theo yêu cầu mới: `dist/assets/unesco-logo.svg`, bản **UNESCO white logo** nguyên gốc từ Wikimedia Commons, hình ngôi đền có chữ UNESCO tạo thành các cột. Logo trắng có nền trong suốt; đặt trên nền xanh UNESCO `#0069B4` bằng CSS của khung. Không vẽ lại, không thay đường nét hoặc cắt logo.

Nguồn: [UNESCO white logo.svg, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:UNESCO_white_logo.svg). [SVG gốc](https://upload.wikimedia.org/wikipedia/commons/5/5a/UNESCO_white_logo.svg). Attribution: **UNESCO emblem; white SVG version via Wikimedia Commons, derived from Flag of UNESCO.svg**. Commons đánh dấu Public domain/PD-UN và insignia; quyền sử dụng biểu trưng tách biệt với bản quyền ảnh. [Bộ quy chuẩn logo chính thức UNESCO](https://www.unesco.org/sites/default/files/medias/fichiers/2023/10/outside_toolkit_20221129_eng.pdf). Không diễn đạt game được UNESCO bảo trợ.

Kích thước/tỷ lệ gốc: **397×306, khoảng1,297:1**. Dùng `object-fit:contain; width:100%; height:100%` bên trong nền xanh có padding; không dùng cover, không ép bản thân hình thành vuông. Ví dụ khung38×32 với padding4px cho biểu trưng30×23px; nếu tăng khung48×40 thì logo40×31px dễ đọc hơn. Không thêm chữ dài ở cỡ badge nhỏ. SVG đã parse XML, không script hoặc externalhref. SHA256:`3e7024439c4d95f83ab62a82f6d3e4dd7085fd7564aa25afc16b9db74f091e7c`.

Asset trước `unesco-heritage.svg` là World Heritage emblem, giữ lại làm nguồn tham chiếu nhưng giao diện mới dùng UNESCO temple logo theo yêu cầu. Logo tổ chức UNESCO không phải một danh hiệu di sản tự thân: badge vẫn chỉ gắn theo các heritage records đủ nguồn trong phần rà phạm vi dưới đây. Không tự mở rộng nhãn sang món ăn, toàn thành phố hoặc di sản ngoài phạm vi.

## Patches

`scripts/heritage-review.json` có14 ID:9 bổ sung,4 sửa nguồn/năm,1 xóa nhãn nhầm. Không sửa runtime data.

| ID | Thay đổi | Nguồn xác minh phạm vi |
|---|---|---|
| `hue-1` | Thiên Mụ thuộc quần thể Huế1993, component678-002 | [UNESCO maps](https://whc.unesco.org/en/list/678/maps/) |
| `hue-visit-lang-tu-duc` | Lăng Tự Đức, component678-007 | [UNESCO maps](https://whc.unesco.org/en/list/678/maps/) |
| `hue-visit-lang-khai-dinh` | Lăng Khải Định, component678-011 | [UNESCO maps](https://whc.unesco.org/en/list/678/maps/) |
| `hai-duong-1` | Đền Kiếp Bạc thuộc di sản nối tiếp2025 | [UNESCO component1732-002](https://whc.unesco.org/en/list/1732/maps/) |
| `bac-giang-0`, `quang-ninh-1`, `hai-duong-0` | Thay nguồn danh sách quốc gia chung bằng hồ sơ1732 trực tiếp | [UNESCO1732](https://whc.unesco.org/en/list/1732/) |
| `ninh-binh-visit-tam-coc` | Tam Cốc thuộc cảnh quan Tràng An–Tam Cốc–Bích Động trong tài sản ghi danh2014 | [UNESCO OUV](https://whc.unesco.org/en/list/1438/) nêu rõ khu này |
| `quang-nam-0` | Chùa Cầu thuộc Đô thị cổ Hội An1999 | [UNESCO OUV](https://whc.unesco.org/en/list/948/) mô tả đích danh cầu gỗ Nhật có chùa |
| `quang-binh-1` | Động Thiên Đường nằm trong VQG/di sản Phong Nha–Kẻ Bàng | [Ban quản lý VQG](https://phongnhakebang.vn/news/dong-thien-duong783-en), [UNESCO951](https://whc.unesco.org/en/list/951/) |
| `quang-binh-visit-song-chay-hang-toi` | Tuyến Sông Chày–Hang Tối trong không gian di sản, không áp dụng cả con sông ngoài phạm vi | [Ban quản lý VQG](https://phongnhakebang.vn/news/song-chay-hang-toi-hanh-trinh-kham-pha-thien-nhien-ky-thu-o-phong-nha-ke-bang-1) |
| `hai-phong-1` | Lan Hạ thuộc phần Cát Bà mở rộng2023 | [Báo cáo Bộ Môi trường Nhật2023](https://www.env.go.jp/earth/coop/lowcarbon-asia/english/project/data/EN_VNM_2023_04.pdf) xác nhận Lan Hạ nằm trong khu đề cử đã được thông qua16/9/2023; [UNESCO672](https://whc.unesco.org/en/list/672/) |
| `hai-phong-extra-5` | Cát Bà có mốc mở rộng2023, tránh thể hiện được ghi danh từ1994 cùng phần Hạ Long | [UNESCO672](https://whc.unesco.org/en/list/672/) |
| `thanh-hoa-extra-5` | heritage:null — Hòn Trống Mái Sầm Sơn không phải cặp đá trên vịnh Hạ Long | [Du lịch Thanh Hóa](https://visitthanhhoa.vn/vi/detailcultural/?id=culture_177&t=danh-lam-thang-canh-sam-son-duoc-cong-nhan-la-di-tich-quoc-gia-dac-biet); [UNESCO672](https://whc.unesco.org/en/list/672/) |

## Những trường hợp không thêm nhãn

Không tag cả Huế/Hội An/Hạ Long hoặc món ăn theo vùng. Không suy danh hiệu thế giới cho toàn Văn Miếu từ82bia tiến sĩ, cho Đền Hùng từ tín ngưỡng thờ cúng, cho Cù Lao Chàm từ danh hiệu khu dự trữ sinh quyển, hay cho các thắng cảnh thuộc công viên địa chất từ danh hiệu UNESCO Global Geopark.

Không thêm nhãn Bái Đính: [OUV Tràng An](https://whc.unesco.org/en/list/1438/) nói quần thể chùa tái dựng thuộc **buffer zone**; không đồng nhất vùng đệm với tài sản ghi danh. Hang Múa chưa xác minh ranh giới cụ thể trong lần rà có giới hạn này nên giữ nguyên không tag. Những địa danh khác không có nguồn xác nhận phạm vi ghi danh trực tiếp được giữ nguyên.
