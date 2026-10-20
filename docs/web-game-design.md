# Thiết kế câu hỏi và nhận diện — 19/10/2026

## Hướng dẫn đã tham khảo

- `Skills/web-frontend/ui-ux-pro-max/SKILL.md`: phân cấp chữ, trạng thái tương tác, bàn phím, thông báo lỗi có thể đọc bằng trình đọc màn hình, giảm chuyển động. Đã tra cứu các mục typography và error recovery trong bộ dữ liệu của skill. Thư mục hiện tại chỉ có bộ UI/UX này; không tự nhận đã đọc một bộ skill game không tồn tại.
- Carnegie Mellon Eberly Center, [Creating Exams](https://www.cmu.edu/teaching/assessment/assesslearning/creatingexams.html): một đáp án tốt nhất, đáp án nhiễu hợp lý, cùng dạng và độ dài tương đối, xáo trộn vị trí. Không làm khó bằng câu phủ định rối hoặc áp lực thời gian.
- Damien Allan, [Designing Video Game Puzzles](https://www.gamedeveloper.com/design/designing-video-game-puzzles): thử thách nên đến từ liên kết các manh mối; tránh biến thao tác thử mọi lựa chọn thành toàn bộ trải nghiệm. Khó hơn không có nghĩa mô tả phải dài hơn.
- Carnegie Mellon, [Using Concept Tests](https://www.cmu.edu/teaching/assessment/assesslearning/concepTests.html): phương án sai nên phản ánh những nhầm lẫn có thể xảy ra.

## Áp dụng

### Nhận diện

Giữ màu giấy và phong cách cuốn sổ. Thay biểu tượng ứng dụng bo tròn nổi bằng nét vẽ sổ tay phẳng; chữ Mật Mã Việt Nam dùng Be Vietnam Pro SemiBold với đủ dấu tiếng Việt. Bỏ khẩu hiệu viết hoa giãn chữ. Dòng tên hành trình viết thường tự nhiên. Không đổi thương hiệu hoặc đổi toàn bộ game sang phong cách khác.

### Câu hỏi

- Đoạn văn có một chỗ trống, bốn đáp án.
- 79 thẻ món ăn có đoạn hỏi và tên trả lời riêng. Tên địa phương chỉ xuất hiện sau khi đúng; không đưa ảnh có nhãn địa lý hoặc nguồn có thể tiết lộ đáp án lên phần hỏi.
- Bánh tằm bì dùng đúng nhóm lựa chọn người dùng đưa: bánh tráng nướng, bánh canh, bánh tằm bì, bánh cuốn. Mô tả dựa trên dạng sợi, bì và cách ăn, không dựa trên tên Ngan Dừa.
- Biến thể địa phương vẫn giữ tên đầy đủ trong bộ sưu tập và phần thưởng. Hai thẻ hủ tiếu có cùng tên trả lời Hủ tiếu: không xếp chúng thành hai phương án khác nhau trong cùng một câu.
- Địa danh ưu tiên phương án cùng nhóm: chùa với công trình tôn giáo, hang/thác với cảnh quan tương tự. Một số câu biên tập hỏi mốc lịch sử, vật liệu hoặc loại hình di sản thay vì chỉ đoán tên.
- Gợi ý do người chơi chủ động mở. Trả lời sai không mất thẻ; phương án sai bị vô hiệu trong lượt hiện tại. Chưa có hạn giờ, trừ mạng hoặc khóa hành trình.
- Đây là mức khó dự kiến “Vừa”, cần người chơi thử để hiệu chỉnh. Chưa đo được độ khó thực nghiệm, chưa có điều chỉnh độ khó tự động.

### Phản hồi

Chọn đúng: chỉ ghi nhận một lần, phát tiếng hợp âm ngắn bằng Web Audio rồi mở cửa sổ thẻ đã nhận. Cửa sổ có tranh, tên đầy đủ, vùng, giới thiệu, giải thích và đường dẫn tư liệu. Có nút tắt âm thanh lưu trên máy. Lỗi âm thanh không chặn nhận thẻ. Không tự phát âm thanh nền khi tải trang.

## Kiểm tra

Test dữ liệu kiểm tra mọi câu có đúng một chỗ trống, bốn phương án khác nhau, một đáp án đúng, không lặp tên đáp án trong đoạn hỏi món ăn. Test trình duyệt kiểm tra sai không được thẻ, đúng mở cửa sổ có ảnh, lưu và tải lại, chơi lại không nhân đôi, tắt âm thanh và kích thước 375/768/1024/1440.
