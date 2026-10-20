# Rà soát câu hỏi — 20/10/2026

Đã đọc đủ 346 câu: 264 địa danh/di sản và 82 đặc sản, gồm 13 easter egg. 98 câu được ghi nhận cần sửa hoặc làm rõ. Tất cả 346 bộ lựa chọn được chốt trong `scripts/question-review.json`; thứ tự A–D vẫn xáo trộn.

## Phạm vi xác minh

- Kiểm tra câu có một chỗ trống, bốn lựa chọn không rỗng/không trùng, một đáp án đúng được đánh dấu, lời giải và nguồn.
- Kiểm tra diễn đạt, câu lộ đáp án, bộ đáp án bao hàm nhau và mô tả quá chung.
- Đối chiếu trực tuyến có chọn lọc các dữ kiện đáng ngờ với UNESCO, Cục Di sản, cơ quan du lịch, báo và đơn vị quản lý di tích. Không coi HTTP 200 hoặc trang tìm kiếm là bằng chứng cho mọi chi tiết.
- Thay 51 liên kết tìm kiếm bằng bài trực tiếp; sửa nguồn Hòn Trống Mái Sầm Sơn và Chư Đang Ya, cùng ba đường dẫn UNESCO tới đúng hồ sơ Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc.
- Đây là rà soát nội dung và kiểm thử, không phải chứng nhận độc lập tuyệt đối cho mọi dữ kiện. Công thức món ăn có biến thể; câu hỏi tránh khẳng định độc quyền nguyên liệu/cách làm khi không có căn cứ.

## Các câu cần chỉnh

| Thẻ | Vấn đề | Nguồn dùng cho câu đã sửa |
| --- | --- | --- |
| Văn Miếu (`ha-noi-1`) | obscureName thay tên công trình thành vùng này, làm hỏng câu. | https://vi.wikipedia.org/wiki/V%C4%83n_Mi%E1%BA%BFu_%E2%80%93_Qu%E1%BB%91c_T%E1%BB%AD_Gi%C3%A1m |
| Đồi A1 (`dien-bien-0`) | Tên chiến dịch bị biến thành vùng này Phủ. | https://svhttdl.dienbien.gov.vn/ditich/pages/2012/Di-tich-doi-A1--5009.aspx |
| Hầm Đờ Cát (`dien-bien-1`) | Tên Điện Biên Phủ bị hỏng; cần phân biệt bộ chỉ huy Pháp với sở chỉ huy Việt Nam. | https://svhttdl.dienbien.gov.vn/ditich/pages/2011/Ham-De-Castries-5048.aspx |
| Mường Phăng (`dien-bien-2`) | Tên chiến dịch bị hỏng, thiếu phân biệt sở chỉ huy hai bên. | https://vi.wikipedia.org/wiki/M%C6%B0%E1%BB%9Dng_Ph%C4%83ng |
| Hồ Na Hang (`tuyen-quang-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://csdl.vietnamtourism.gov.vn/dest/?item=996 |
| Động Ngườm Ngao (`cao-bang-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vietnamtourism.vn/index.php/tourism/items/2547/3 |
| Đồi chè Tân Uyên (`lai-chau-1`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://dulich.laichau.gov.vn/vi/place/details/doi-che-tan-uyen-23 |
| Động Pu Sam Cáp (`lai-chau-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://dulich.laichau.gov.vn/en/place/details/pu-sam-cap-cave-53 |
| Mù Cang Chải (`yen-bai-0`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://nongthon.vietnamtourism.gov.vn/dung-chan-tren-ruong-bac-thang-va-trai-nghiem-homestay-hello-mu-cang-chai/ |
| Hồ Thác Bà (`yen-bai-1`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/H%E1%BB%93_Th%C3%A1c_B%C3%A0 |
| Đèo Khau Phạ (`yen-bai-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/%C4%90%C3%A8o_Khau_Ph%E1%BA%A1 |
| Đồi chè Tân Cương (`thai-nguyen-0`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/T%C3%A2n_C%C6%B0%C6%A1ng_(x%C3%A3) |
| Hồ Núi Cốc (`thai-nguyen-1`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://csdl.vietnamtourism.gov.vn/dest/?item=539 |
| Tháp Bình Sơn (`vinh-phuc-1`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://dsvh.gov.vn/di-tich-kien-truc-nghe-thuat-thap-binh-son-1294 |
| Hồ Đại Lải (`vinh-phuc-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vietnamtourism.gov.vn/post/40633 |
| Đồi chè Long Cốc (`phu-tho-1`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://dulichphutho.gov.vn/diemden/doi-che-long-coc |
| Hồ Cấm Sơn (`bac-giang-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vietnamtourism.vn/index.php/tourism/items/1468 |
| Văn miếu Xích Đằng (`hung-yen-1`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/V%C4%83n_mi%E1%BA%BFu_X%C3%ADch_%C4%90%E1%BA%B1ng |
| Đền Trần Thương (`ha-nam-2`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/%C4%90%E1%BB%81n_Tr%E1%BA%A7n_Th%C6%B0%C6%A1ng |
| Tháp Phổ Minh (`nam-dinh-0`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/Ch%C3%B9a_Ph%E1%BB%95_Minh_(Nam_%C4%90%E1%BB%8Bnh) |
| Động Hua Mạ (`bac-kan-visit-dong-hua-ma`) | Đoạn mô tả chung có thể phù hợp nhiều đáp án; bổ sung dấu hiệu phân biệt. | https://vi.wikipedia.org/wiki/%C4%90%E1%BB%99ng_Hua_M%E1%BA%A1 |
| Quần đảo Cát Bà (`hai-phong-extra-5`) | Đáp án bao quát Hạ Long–Cát Bà và bộ phận Vịnh Lan Hạ cùng xuất hiện gây chồng lấn phạm vi. | https://whc.unesco.org/en/list/672/ |
| Vịnh Lan Hạ (`hai-phong-1`) | Lựa chọn quần đảo và di sản bao quát trộn với tên vịnh. | https://vi.wikipedia.org/wiki/V%E1%BB%8Bnh_Lan_H%E1%BA%A1 |
| Vườn quốc gia Cúc Phương (`egg-vuon-quoc-gia-cuc-phuong`) | Partial answer CúcPhương left intact, giving awayanswer; endpointnames erased. | https://cucphuongtourism.com/index.php/vi.html |
| Vườn quốc gia Tam Đảo (`egg-vuon-quoc-gia-tam-dao`) | Partial answer TamĐảo leftintact; endpointnames erased and dynamicoptions not nationalparks. | https://vnexpress.net/cac-trai-nghiem-o-vuon-quoc-gia-tam-dao-4582655.html |
| Vườn quốc gia Hoàng Liên (`egg-vuon-quoc-gia-hoang-lien`) | Partial answer HoàngLiênSơn leftintact and endpoints erased; explicitfixedcloze reduces confusingvùngnày. | https://nbca.gov.vn/wp-content/uploads/HoangLien/ |
| Vịnh Hạ Long – Quần đảo Cát Bà (`egg-ha-long-cat-ba`) | Passage repeats full components ofanswer; overlapping optionsCátBà andLanHạ canconfuse wholeproperty vscomponent. | https://whc.unesco.org/en/list/672/ |
| Ngã ba Đồng Lộc (`ha-tinh-0`) | Clue only says wartime transport memorial; many historic sites satisfy it. | https://baochinhphu.vn/nga-ba-dong-loc-quan-the-di-tich-y-nghia-tieu-bieu-102241764.htm |
| Địa đạo Vịnh Mốc (`quang-tri-2`) | Generic shelter tunnels can match Củ Chi when it enters dynamic distractors; geography stripped. | https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Ba_%C4%91%E1%BA%A1o_V%E1%BB%8Bnh_M%E1%BB%91c |
| Động Phong Nha (`quang-binh-0`) | Underground river and stalactites also describe other cave options, especially Sông Chày–Hang Tối. | https://whc.unesco.org/en/list/951/ |
| Động Thiên Đường (`quang-binh-1`) | Dry spacious cave with stalactites not unique; lock stable cave alternatives with distinctive measured length. | https://phongnhakebang.vn/du-lich/dong-thien-duong13 |
| Kỳ Co (`binh-dinh-1`) | Bright sand blue water cliffs fits many beaches and Eo Gió distractor. | https://vi.wikipedia.org/wiki/B%C3%A3i_K%E1%BB%B3_Co |
| Hồ Lắk (`dak-lak-0`) | Large lake in TayNguyen next to villages/hills also correct for T’Nưng,TàĐùng; region clue absent. | https://vi.wikipedia.org/wiki/H%E1%BB%93_L%E1%BA%AFk |
| Nhà đày Buôn Ma Thuột (`dak-lak-2`) | All four prison choices satisfy original clue. | https://vhttdl.daklak.gov.vn/Articles/Detail/3218 |
| Hòn Chồng (`khanh-hoa-1`) | Stone piles on coast fits Hòn Trống Mái option too. | https://vi.wikipedia.org/wiki/H%C3%B2n_Ch%E1%BB%93ng |
| Nhà thờ Núi Nha Trang (`khanh-hoa-2`) | Hilltop Gothic church also fits SaPa/TamĐảo options after cityname removal. | https://nhatrang.khanhhoa.gov.vn/tin-bai/diem-den/nha-tho-nui-nha-trang-%E2%80%93-diem-tham-quan-check-in-tua-chau-au-1617 |
| Hang Rái (`ninh-thuan-2`) | Only coastal rocks/waves vague; fixedalternatives and coral/rock shelf adds discriminator. | https://dulichso.khanhhoa.gov.vn/article/vuon-quoc-gia-nui-chua-41f |
| Thác Liêng Nung (`dak-nong-1`) | High cliff waterfall in forest matches all waterfall alternatives. | https://dulich.daknong.gov.vn/vi/place/details/thac-lieng-nung-13 |
| Biển Cửa Lò (`nghe-an-visit-bien-cua-lo`) | Long beach with nearbyislands matches most beach options after obscureName erases NghệAn. | https://vi.wikipedia.org/wiki/B%C3%A3i_bi%E1%BB%83n_C%E1%BB%ADa_L%C3%B2 |
| Biển Mỹ Khê Quảng Ngãi (`quang-ngai-visit-bien-my-khe-quang-ngai`) | Both QuảngNgãi and ĐàNẵng replaced with vùngnày, impossible distinction. | https://vietnamtourism.vn/index.php/tourism/items/1326 |
| Hòn Trống Mái (`thanh-hoa-extra-5`) | Source points to UNESCO HạLong instead of SầmSơn; same name creates locationconfusion. | https://vietnamtourism.gov.vn/post/28603 |
| Chư Đang Ya (`gia-lai-1`) | Current source is BiểnHồcommune, not ChưĐangYa; keep ownactualvolcano source. | https://dantoc.vietnamtourism.gov.vn/le-hoi-hoa-da-quy-nui-lua-chu-dang-ya-nam-2025/ |
| Cầu Mỹ Thuận (`vinh-long-1`) | Answer leaks as partial MỹThuận while both banknames erased. | https://vi.wikipedia.org/wiki/C%E1%BA%A7u_M%E1%BB%B9_Thu%E1%BA%ADn |
| Cầu Rạch Miễu (`egg-cau-rach-mieu-1`) | Answer obfuscated into malformed vùngnày; geography erased, distinguish fromMỹThuận. | https://vi.wikipedia.org/wiki/C%E1%BA%A7u_R%E1%BA%A1ch_Mi%E1%BB%85u |
| Cầu Vàm Cống (`egg-cau-vam-cong`) | Both endpointnames erased; leave explicit historicalregions and distinguishHậu/Tiền. | https://vi.wikipedia.org/wiki/C%E1%BA%A7u_V%C3%A0m_C%E1%BB%91ng |
| Đèo Hải Vân (`egg-hai-van`) | Endpointnames erased and vagueinlandcoast clues; keep HảiVânQuan. | https://vi.wikipedia.org/wiki/%C4%90%C3%A8o_H%E1%BA%A3i_V%C3%A2n |
| Đèo Cả (`egg-deo-ca`) | Endpointnames erased; dãyĐạiLãnh remains onlydiscriminator. | https://vi.wikipedia.org/wiki/%C4%90%C3%A8o_C%E1%BA%A3 |
| Vườn quốc gia Cát Tiên (`dong-nai-visit-vuon-quoc-gia-cat-tien`) | Repeated vùngnày destroys all three connectedregionclues and makes vagueparkquestion. | https://cattiennationalpark.com.vn/trang-chu-2/ |
| Núi Chứa Chan (`dong-nai-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://baodongnai.com.vn/tin-moi/202504/danh-thuc-nui-chua-chan-vien-ngoc-xanh-cua-dong-nam-bo-565543e/ |
| Thác Giang Điền (`dong-nai-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/Th%C3%A1c_Giang_%C4%90i%E1%BB%81n |
| Bù Gia Mập (`binh-phuoc-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/V%C6%B0%E1%BB%9Dn_qu%E1%BB%91c_gia_B%C3%B9_Gia_M%E1%BA%ADp |
| Núi Bà Đen (`tay-ninh-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/N%C3%BAi_B%C3%A0_%C4%90en |
| Tháp Bình Thạnh (`tay-ninh-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/Th%C3%A1p_B%C3%ACnh_Th%E1%BA%A1nh |
| Nhà trăm cột (`long-an-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vietnamtourism.vn/index.php/tourism/items/2065 |
| Làng nổi Tân Lập (`long-an-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/R%E1%BB%ABng_tr%C3%A0m_T%C3%A2n_L%E1%BA%ADp |
| Láng Sen (`long-an-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vietnamtourism.vn/index.php/tourism/items/2870 |
| Chùa Hội Khánh (`binh-duong-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/Ch%C3%B9a_H%E1%BB%99i_Kh%C3%A1nh |
| Nhà cổ Trần Văn Hổ (`binh-duong-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vnexpress.net/nha-co-120-nam-ben-song-sai-gon-4843365.html |
| Tràm Chim (`dong-thap-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://csdl.vietnamtourism.gov.vn/dest/?item=552 |
| Gò Tháp (`dong-thap-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/G%C3%B2_Th%C3%A1p |
| Chùa Vĩnh Tràng (`tien-giang-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vietnamtourism.vn/index.php/tourism/items/2737 |
| Cù lao Thới Sơn (`tien-giang-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vietnamtourism.vn/index.php/tourism/items/2111 |
| Văn Thánh Miếu Vĩnh Long (`vinh-long-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/V%C4%83n_Th%C3%A1nh_Mi%E1%BA%BFu_V%C4%A9nh_Long |
| Cồn Phụng (`ben-tre-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/C%E1%BB%93n_Ph%E1%BB%A5ng |
| Chùa Hang Trà Vinh (`tra-vinh-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://csdl.vietnamtourism.gov.vn/dest/?item=530 |
| Bến Ninh Kiều (`can-tho-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/B%E1%BA%BFn_Ninh_Ki%E1%BB%81u |
| Nhà cổ Bình Thủy (`can-tho-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://csdl.vietnamtourism.gov.vn/dest/?item=145 |
| Lung Ngọc Hoàng (`hau-giang-0`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/Khu_b%E1%BA%A3o_t%E1%BB%93n_thi%C3%AAn_nhi%C3%AAn_Lung_Ng%E1%BB%8Dc_Ho%C3%A0ng |
| Di tích Chiến thắng Chương Thiện (`hau-giang-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://dsvh.gov.vn/di-tich-lich-su-chien-thang-chuong-thien-thanh-pho-vi-thanh-va-huyen-long-my-tinh-hau-giang-2976 |
| Chùa Som Rong (`soc-trang-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/Ch%C3%B9a_Som_Rong |
| Rừng U Minh Hạ (`ca-mau-1`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/V%C6%B0%E1%BB%9Dn_qu%E1%BB%91c_gia_U_Minh_H%E1%BA%A1 |
| Hòn Đá Bạc (`ca-mau-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/H%C3%B2n_%C4%90%C3%A1_B%E1%BA%A1c |
| Tháp Vĩnh Hưng (`bac-lieu-2`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vi.wikipedia.org/wiki/Th%C3%A1p_V%C4%A9nh_H%C6%B0ng |
| Bãi Sao Phú Quốc (`kien-giang-extra-5`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vietnam.travel/places-to-go/mekong-delta/phu-quoc |
| Bãi Dài Phú Quốc (`kien-giang-visit-bai-dai-phu-quoc`) | Manh mối cũ quá rộng hoặc mất địa danh phân biệt; cố định bộ lựa chọn để tránh nhiều đáp án cùng phù hợp. | https://vietnam.travel/node/1845 |
| Phở Hà Nội (`ha-noi-3`) | Hủ tiếu cũng có dạng sợi gạo dẹt và nước xương; bộ đáp án hiện tại chồng lấn mô tả. | https://vietnam.travel/node/1479 |
| Hạt dẻ Trùng Khánh (`cao-bang-3`) | Vỏ nâu cứng, luộc/rang, vị bùi chưa phân biệt được hạt dẻ với các hạt khác. | https://baocaobang.vn/Ngot-ngao-hat-de-Trung-Khanh-7309.html |
| Thắng cố Bắc Hà (`lao-cai-3`) | Nậm pịa cũng là món nấu thịt/nội tạng; thay distractor và tránh suy rằng mọi thắng cố đều cùng loài thịt. | https://baolaocai.vn/kham-pha-nhung-mon-an-dac-san-tren-dat-bac-ha-post633488.html |
| Thịt chua Thanh Sơn (`phu-tho-3`) | Nem chua cũng phù hợp mô tả thịt lên men và lá ăn kèm; cần bỏ đáp án chồng lấn. | https://baophutho.vn/dam-da-huong-vi-thit-chua-262197.htm |
| Mì Chũ (`bac-giang-3`) | Mô tả sợi gạo phơi khô chưa loại trừ phở; đáp án dùng loại món chung cần bộ nhiễu tách biệt. | https://baobacgiang.vn/bg2/luc-ngan/khai-mac-ngay-hoi-trai-cay-luc-ngan-lan-thu-nhat-nam-2016-ton-vinh-qua-ngot-mo-rong-giao-thuong.bbg |
| Kẹo Sìu Châu (`nam-dinh-3`) | Mô tả kẹo lạc ngọt giòn quá chung; bánh cáy cũng có lạc và đường. Giữ nhóm lựa chọn loại kẹo có cấu tạo khác. | https://baonamdinh.vn/dat-nuoc-con-nguoi/202404/nam-dinh-phat-huy-loi-the-phat-trien-du-lich-25b1379/ |
| Khoai deo (`quang-binh-3`) | Khoai lang là nguyên liệu/lớp bao của khoai deo, không nên làm đáp án sai. | https://www.vietnamplus.vn/khoai-deo-mon-dac-san-dan-da-ma-doc-dao-cua-vung-dat-quang-binh-post912018.vnp |
| Bún chả cá Đà Nẵng (`da-nang-3`) | Bún sứa cũng thường có chả cá và nước dùng rau củ, nên có thể khớp mô tả. | https://www.vietnamplus.vn/huong-vi-dam-da-dau-an-kho-phai-cua-bun-cha-ca-da-nang-post909488.vnp |
| Cao lầu Hội An (`quang-nam-3`) | Mì Quảng cũng ít nước và có thịt, rau, bánh giòn; loại khỏi bộ nhiễu để tránh phụ thuộc biến thể quán. | https://baotintuc.vn/kham-pha-ban-do-am-thuc-duong-pho-hoi-an-post802648.html |
| Mì Quảng (`quang-nam-4`) | Cao lầu chồng lấn đặc điểm ít nước, rau và phần giòn; thay bằng các món phân biệt rõ. | https://baotintuc.vn/kham-pha-ban-do-am-thuc-duong-pho-hoi-an-post802648.html |
| Phở khô Gia Lai (`gia-lai-3`) | Hủ tiếu khô cũng được phục vụ tô khô và tô nước riêng; hiện câu chưa có dấu hiệu loại trừ. | https://vietnam.travel/vi/things-to-do/gia-lai-where-mountains-embrace-sea |
| Bún đỏ Buôn Ma Thuột (`dak-lak-3`) | Chỉ màu đỏ của nước dùng chưa phân biệt bún bò/bún đỏ. Bổ sung sợi to, riêu và trứng cút có nguồn. | https://baodaklak.vn/channel/3624/202102/am-thuc-mien-dat-do-cao-nguyen-5722988/ |
| Bánh canh hẹ (`phu-yen-3`) | Không nên cố định bánh canh hẹ chỉ có một chất liệu/kích thước sợi: nguồn cho biết có bột gạo hoặc bột lọc. Giữ đặc điểm phủ hẹ và cá. | https://vnexpress.net/banh-canh-ngap-he-o-phu-yen-4881266.html |
| Nem nướng Ninh Hòa (`khanh-hoa-3`) | Nem là tên nhóm có thể bao gồm nem nướng, không hợp làm lựa chọn sai. | https://nongthon.vietnamtourism.gov.vn/nem-nuong-ninh-hoa-nam-trong-top-10-ky-luc-chau-a-moi-ve-am-thuc-va-qua-tang-dac-san-viet-nam/ |
| Gỏi cá Biên Hòa (`dong-nai-3`) | Gỏi cá trích là một loại gỏi cá và cũng khớp stem cá/rau/bánh tráng. Cần phân biệt cá nước ngọt và sốt nóng. | https://baodongnai.com.vn/dong-nai-cuoi-tuan/202205/am-thuc-dia-phuong-niu-chan-du-khach-3118275/ |
| Bánh khọt Vũng Tàu (`ba-ria---vung-tau-3`) | Khuôn nhỏ, tôm và chiên cũng đúng với bánh cống; mô tả hình đĩa nông giúp phân biệt. | https://csdl.vietnamtourism.gov.vn/rest/?item=124 |
| Hủ tiếu Sa Đéc (`dong-thap-3`) | Mô tả sợi gạo với nước dùng/thịt quá chung, dễ đúng với các loại bún. Dùng bộ nhiễu khác chất liệu/cách làm. | https://vnexpress.net/cam-nang-du-lich-lang-hoa-sa-dec-5003954.html |
| Nem Lai Vung (`dong-thap-4`) | Nhãn đáp án Nem quá rộng và chứa các loại nem khác trong đáp án nhiễu. Gọi đúng kỹ thuật là nem chua. | https://nongthon.vietnamtourism.gov.vn/dong-thap-tiep-tuc-dua-thuong-hieu-nem-lai-vung-phat-trien-ben-vung-va-vuon-xa/ |
| Hủ tiếu Mỹ Tho (`tien-giang-4`) | Mô tả sợi gạo với nước dùng/thịt quá chung, dễ đúng với các loại bún. Cùng câu hỏi nhận diện loại món không nên coi bún cá là chắc chắn sai chỉ vì topping. | https://www.vietnamplus.vn/tien-giang-thuong-thuc-huong-vi-hu-tiu-my-tho-post1022706.vnp |
| Gỏi cá trích (`kien-giang-4`) | Gỏi cá là tên bao gồm gỏi cá trích; hiện có hai cấp tên cùng đúng. | https://vnexpress.net/6-mon-ngon-khong-dung-hang-o-phu-quoc-4511108.html |
| Khoai lang Bình Tân (`vinh-long-3`) | Mô tả củ luộc/nướng, bở và hơi ngọt đúng đồng thời khoai môn, khoai sọ, sắn và khoai lang. | https://nongthon.vietnamtourism.gov.vn/vinh-long-mien-song-nuoc-noi-dai-giac-mo-du-lich-xanh/ |
| Bún nước lèo Trà Vinh (`tra-vinh-3`) | Bún cá có thể dùng nước lèo mắm nên tên nhóm này không đủ loại trừ; dùng các món có hệ nước dùng khác. | https://vnexpress.net/net-duyen-tham-cua-thanh-pho-tra-vinh-3118337.html |
| Bún sứa Nha Trang (`khanh-hoa-food-bun-sua-nha-trang`) | Bún cá là nhóm rộng, nhiều bát bún cá có sứa và chả cá; tránh dùng tên nhóm làm đáp án sai. | https://dulichso.khanhhoa.gov.vn/explore/bun-sua-nha-trang-vi-ngot-thanh-khiet-mat-lanh-tu-dai-duong-605 |

## Các nguồn trực tiếp đã thay

| Thẻ | Nguồn |
| --- | --- |
| `tuyen-quang-0` | https://vietnamtourism.vn/index.php/news/items/16232 |
| `tuyen-quang-1` | https://stttt.tuyenquang.gov.vn/vi/tin-bai/di-tich-lich-su-tuyen-quang?id=454&type=NEWS |
| `lai-chau-0` | https://dulich.laichau.gov.vn/vi/place/details/sin-suoi-ho-market-20 |
| `lai-chau-1` | https://dulich.laichau.gov.vn/vi/place/details/doi-che-tan-uyen-23 |
| `lao-cai-0` | https://vi.wikipedia.org/wiki/Fansipan |
| `yen-bai-0` | https://nongthon.vietnamtourism.gov.vn/dung-chan-tren-ruong-bac-thang-va-trai-nghiem-homestay-hello-mu-cang-chai/ |
| `dien-bien-0` | https://svhttdl.dienbien.gov.vn/ditich/pages/2012/Di-tich-doi-A1--5009.aspx |
| `dien-bien-1` | https://svhttdl.dienbien.gov.vn/ditich/pages/2011/Ham-De-Castries-5048.aspx |
| `son-la-0` | https://nongthon.vietnamtourism.gov.vn/cay-che-lam-du-lich/ |
| `phu-tho-1` | https://dulichphutho.gov.vn/diemden/doi-che-long-coc |
| `phu-tho-2` | https://dulichphutho.gov.vn/diem-den-hut-khach-du-lich.html |
| `vinh-phuc-0` | https://nongthon.vietnamtourism.gov.vn/tam-dao-choi-gi-an-gi-bo-tui-bi-kip-du-lich-tam-dao-tiet-kiem/ |
| `hoa-binh-0` | https://nongthon.vietnamtourism.gov.vn/nhung-diem-den-du-lich-cong-dong-hap-dan-o-huyen-mai-chau-hoa-binh/ |
| `bac-giang-0` | https://whc.unesco.org/en/list/1732/ |
| `quang-ninh-1` | https://whc.unesco.org/en/list/1732/ |
| `quang-ninh-2` | https://quangninh.gov.vn/Trang/ChiTietTinTuc.aspx?nid=136826 |
| `hai-phong-0` | https://haiphong.gov.vn/Hai-Phong-Thanh-Pho-Toi-Yeu/Nha-hat-thanh-pho---Chung-tich-lich-su-va-nghe-thuat-52517 |
| `hai-duong-0` | https://whc.unesco.org/en/list/1732/ |
| `hung-yen-2` | https://dulich.hungyen.gov.vn/vi/detailnews/?id=news_3783&t=lang-nom-ve-dep-xua-o-hung-yen |
| `thai-binh-2` | https://vietnamtourism.vn/index.php/tourism/items/1555 |
| `ha-nam-1` | https://nhandan.vn/lac-buoc-coi-thien-dia-tang-phi-lai-tu-post744177.html |
| `nam-dinh-1` | https://vietnamtourism.vn/index.php/news/items/24079 |
| `nam-dinh-2` | https://nongthon.vietnamtourism.gov.vn/hai-hau-nam-dinh-diem-sang-phat-trien-du-lich-cong-dong/ |
| `nghe-an-1` | https://nongthon.vietnamtourism.gov.vn/kham-pha-doi-che-thanh-chuong-ve-dep-xanh-giua-lang-que-xu-nghe/ |
| `nghe-an-2` | https://visitnghean.gov.vn/diem-tham-quan/dao-lan-chau%2C-dao-ngu%2C-chua-dao-ngu |
| `ha-tinh-2` | https://hatinh.gov.vn/vi/page/du-lich/bai-viet/cam-nang-du-lich-bien-thien-cam |
| `quang-binh-2` | https://csdl.vietnamtourism.gov.vn/dest/?item=632 |
| `quang-nam-0` | https://hoianheritage.danang.gov.vn/vi/di-san-van-hoa/Cau/Chua-Cau-134.html |
| `quang-ngai-0` | https://sovhttdl.quangngai.gov.vn/tin-tuc/hoat-dong-van-hoa-van-nghe/thang-canh-cong-to-vo-duoc-xep-hang-la-di-tich-cap-quoc-gia.html |
| `quang-ngai-2` | https://lyson.quangngai.gov.vn/en/danh-muc-cot-phai/gioi-thieu/dieu-kien-tu-nhien |
| `kon-tum-1` | https://dantoc.vietnamtourism.gov.vn/kon-tum-chung-tay-giu-hon-nha-rong-truyen-thong/ |
| `kon-tum-2` | https://dantoc.vietnamtourism.gov.vn/cuc-du-lich-quoc-gia-viet-nam-to-chuc-khao-sat-phat-trien-san-pham-du-lich-cong-dong-tai-quang-ngai/ |
| `gia-lai-0` | https://vietnamtourism.vn/index.php/tourism/items/1445/2 |
| `gia-lai-1` | https://dantoc.vietnamtourism.gov.vn/le-hoi-hoa-da-quy-nui-lua-chu-dang-ya-nam-2025/ |
| `gia-lai-2` | https://phatgiao.org.vn/chua-minh-thanh-diem-den-tam-linh-dac-biet-o-pleiku-d26949.html |
| `binh-dinh-0` | https://dulichquynhon.binhdinh.gov.vn/vi/eogiolandscape |
| `dak-lak-1` | https://krongana.daklak.gov.vn/danh-lam-va-thang-canh-1292.html |
| `phu-yen-2` | https://baochinhphu.vn/phu-yen-khong-chi-co-hoa-vang-tren-co-xanh-102205751.htm |
| `khanh-hoa-0` | https://dulichso.khanhhoa.gov.vn/article/thap-ba-po-nagar-di-san-ngan-nam-7f7 |
| `khanh-hoa-2` | https://nhatrang.khanhhoa.gov.vn/tin-bai/diem-den/nha-tho-nui-nha-trang-%E2%80%93-diem-tham-quan-check-in-tua-chau-au-1617 |
| `ninh-thuan-2` | https://dulichso.khanhhoa.gov.vn/article/vuon-quoc-gia-nui-chua-41f |
| `dak-nong-2` | https://dulich.daknong.gov.vn/vi/place/details/hang-dong-nui-lua-chu-bluk-1 |
| `binh-duong-1` | https://vnexpress.net/nha-co-120-nam-ben-song-sai-gon-4843365.html |
| `binh-duong-2` | https://nongthon.vietnamtourism.gov.vn/kham-pha-lang-nghe-son-mai-tuong-binh-hiep/ |
| `tien-giang-2` | https://kiethouse.com/vi/ve-chung-toi/ |
| `an-giang-2` | https://angiang.gov.vn/vi/mot-thoang-tri-ton |
| `kien-giang-2` | https://vnexpress.net/cam-nang-du-lich-nam-du-4764453.html |
| `ben-tre-2` | https://dsvh.gov.vn/di-tich-lich-su-mo-va-khu-tuong-niem-nguyen-dinh-chieu-2999 |
| `tra-vinh-2` | https://csdl.vietnamtourism.gov.vn/dest/?item=530 |
| `hau-giang-1` | https://dulich.haugiang.gov.vn/vi/kenhxangxano |
| `hau-giang-2` | https://dsvh.gov.vn/di-tich-lich-su-chien-thang-chuong-thien-thanh-pho-vi-thanh-va-huyen-long-my-tinh-hau-giang-2976 |
| `bac-lieu-0` | https://csdl.vietnamtourism.gov.vn/dest/?item=8 |
| `bac-lieu-1` | https://nongthon.vietnamtourism.gov.vn/bac-lieu-phat-trien-san-pham-du-lich-nong-nghiep/ |
| `thanh-hoa-extra-5` | https://vietnamtourism.gov.vn/post/28603 |
| `lam-dong-extra-5` | https://vietnamtourism.gov.vn/post/38558 |
| `kien-giang-extra-5` | https://vietnam.travel/places-to-go/mekong-delta/phu-quoc |

## Quy tắc khi thêm thẻ

Thẻ mới phải có câu hỏi đã biên tập trong `scripts/question-review.json` trước khi build. `scripts/update-questions.mjs` áp dụng ngân hàng này sau các lớp nội dung khác để tránh bị ghi đè. Kiểm thử thử 100 cách xáo trộn cho mỗi câu (34.600 bộ); kiểm thử cấu trúc không tự chứng minh tính đúng đắn ngữ nghĩa.
