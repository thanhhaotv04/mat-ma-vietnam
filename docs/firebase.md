# Firebase — Mật Mã Việt Nam

- Project: `mat-ma-viet-nam-hao` (project riêng cho game).
- Hosting: https://mat-ma-viet-nam-hao.web.app
- Firestore: Standard, `(default)`, `asia-southeast1`; không kết nối billing.
- Authentication: bật **Anonymous** và **Email/Password** trong Firebase Console. Lần khởi tạo Authentication trên Spark cần bấm **Get started** trong Console; API `initializeAuth` dành cho project có billing, không dùng API đó để nâng gói.

Game dùng hồ sơ khách ngay khi mở link. Trong Hồ sơ, “Tạo tài khoản, giữ tiến độ” liên kết email/mật khẩu với cùng UID khách. “Đăng nhập” tải hành trình của tài khoản được chọn, không nhập thẻ của người dùng trước. Đăng xuất tạo hồ sơ khách mới. Email/mật khẩu do Firebase Auth xử lý; mật khẩu không được lưu vào Firestore hoặc localStorage của game.

Mỗi UID chỉ đọc/ghi `players/{uid}` của chính mình. Firestore Rules chặn liệt kê người chơi và truy cập UID khác. Dữ liệu chỉ gồm tiến trình và thời điểm cập nhật; không lưu email trong Firestore. Thẻ được hợp nhất khi ghi để hai thiết bị không ghi đè các thẻ đã nhận; bản cục bộ được hợp nhất lúc tải lại nếu đúng chủ sở hữu. Khi không kết nối được Firebase, game vẫn giữ bản cục bộ; hãy tải lại khi có mạng để thử đồng bộ lại. Xóa tiến độ online là thao tác xác nhận riêng trong Hồ sơ.

Đây là game chơi cá nhân: tiến trình do trình duyệt gửi lên, chưa có xác thực chống gian lận ở server hoặc bảng xếp hạng.

## Build và triển khai

```sh
npm ci
npm run build:cloud
npm test
npm run build
npx firebase-tools deploy --only firestore:rules,hosting --project mat-ma-viet-nam-hao
```

`dist/firebase-config.json` là cấu hình Web công khai của Firebase, không phải service-account key. Không đưa token CLI hoặc private key vào source. Bundle SDK nằm ở `dist/cloud.mjs`; sửa `src/cloud.mjs` rồi chạy `build:cloud`.

Hosting Firebase công khai để người khác chơi. Site ChatGPT cũ giữ cấu hình quyền truy cập riêng; không cần đổi audience của nó.
