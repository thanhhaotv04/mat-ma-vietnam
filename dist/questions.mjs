import {normalize} from './core.mjs?v=20261020-clean-ui';

// Answers intentionally omit localities. Regional variants keep their full names on the reward card.
const FOOD_NAMES = `Phở|Bánh gai|Bánh tam giác mạch|Hạt dẻ|Xôi tím|Thắng cố|Cốm|Bánh chưng|Miến dong|Khẩu xén|Vịt quay|Nậm pịa|Thịt chua|Bánh trùng mật mía|Cơm lam|Bánh phu thê|Mì gạo|Vải thiều|Chả mực|Bánh đa cua|Bánh mì cay|Bánh đậu xanh|Nhãn lồng|Bánh cáy|Canh cá|Cơm cháy|Cá kho niêu|Kẹo Sìu Châu|Nem chua|Bánh răng bừa|Cháo lươn|Kẹo cu đơ|Bánh bột lọc|Khoai deo|Bún bò|Mè xửng|Bún chả cá|Cao lầu|Mì Quảng|Don|Gỏi lá|Phở khô|Bánh ít lá gai|Bún đỏ|Bánh canh hẹ|Nem nướng|Bánh căn|Bánh tráng nướng|Kem bơ|Cà phê|Lẩu thả|Gỏi cá|Hạt điều|Bánh tráng phơi sương|Lạp xưởng|Cơm tấm|Bánh mì|Gỏi gà măng cụt|Bánh khọt|Hủ tiếu|Nem|Vú sữa|Hủ tiếu|Bún cá|Bánh bò thốt nốt|Bún quậy|Gỏi cá trích|Khoai lang|Kẹo dừa|Bánh tráng dừa|Bún nước lèo|Bánh tét|Bánh cống|Chả cá thác lác|Khóm|Bánh pía|Bún nước sụ|Cua biển|Bánh tằm bì`.split('|');
const FOOD_PASSAGES = [
 'Sợi bánh làm từ gạo, dẹt và mềm, được chan nước dùng ninh từ xương. Bát ăn kèm thịt bò hoặc gà và rau thơm, không dùng sợi tròn như bún. Món được nhắc đến là {{blank}}.',
 'Lá được giã và trộn vào bột nếp để tạo lớp vỏ sẫm màu. Bên trong là nhân đậu xanh; bánh dẻo, thường được gói bằng lá chuối. Món bánh này là {{blank}}.',
 'Hạt của loài cây có hoa nhỏ mọc trên cao nguyên đá được xay thành bột. Bột được đúc thành bánh tròn, có thể nướng trước khi ăn. Tên món bánh là {{blank}}.',
 'Quả có lớp vỏ cứng màu nâu; phần nhân bên trong bùi, được luộc hoặc rang chứ không dùng làm mứt. Loại hạt được mô tả là {{blank}}.',
 'Gạo nếp được ngâm với nước từ cây lá để lên màu tự nhiên rồi đồ chín. Thành phẩm có sắc tím và vẫn giữ độ dẻo của nếp. Món ăn là {{blank}}.',
 'Trong chảo lớn, thịt và nội tạng được nấu cùng nhiều gia vị. Đây là món ăn truyền thống thường gặp ở chợ phiên vùng cao, không phải món thịt treo khô trên bếp. Tên món là {{blank}}.',
 'Lúa nếp được thu hoạch khi hạt còn non, sau đó rang và giã để bỏ vỏ trấu. Thành phẩm có hạt dẹt, mềm và hương lúa mới. Thức quà này gọi là {{blank}}.',
 'Nếp bao quanh nhân đậu xanh và thịt lợn, được gói bằng lá rồi luộc lâu. Bánh có dạng khối vuông thay vì đòn dài. Loại bánh đó là {{blank}}.',
 'Củ dong riềng được lấy tinh bột để làm sợi trong, dai. Sợi thường được phơi khô trước khi đem nấu, khác với sợi làm hoàn toàn từ gạo. Thực phẩm này là {{blank}}.',
 'Bánh được cán mỏng và phơi khô để dành. Khi ăn mới rán cho nở giòn; món bánh truyền thống này của người Thái có tên là {{blank}}.',
 'Thịt gia cầm được tẩm ướp với lá mắc mật rồi quay cho da lên màu vàng nâu. Hương lá và lớp da là đặc điểm quan trọng để nhận ra món {{blank}}.',
 'Món ăn truyền thống của người Thái sử dụng nội tạng và phần dịch ruột non của động vật ăn cỏ. Món có hương vị đặc biệt, khác với món thịt chua lên men. Tên gọi là {{blank}}.',
 'Thịt lợn được trộn cùng thính và ủ để có vị chua. Khi ăn, người ta thường cuốn cùng các loại lá; đây không phải nem nướng. Món được mô tả là {{blank}}.',
 'Những viên bột nếp được nấu trong nước mật mía. Vị ngọt nằm ở phần nước sánh màu nâu, thay vì một lớp nhân đậu bên trong. Món bánh này là {{blank}}.',
 'Gạo nếp được cho vào ống tre hoặc nứa rồi nướng bên lửa. Khi bóc lớp vỏ ống, cơm giữ thành khối và mang hương tre. Món đó là {{blank}}.',
 'Lớp vỏ bánh trong, dẻo, có những sợi đu đủ; bên trong là nhân đậu xanh. Tên gọi của bánh gắn với tình nghĩa vợ chồng: {{blank}}.',
 'Gạo được chế biến thành những sợi mảnh rồi phơi thành từng bó. Sợi có thể dùng trong các món nước hoặc xào, không phải sợi lấy từ tinh bột dong riềng. Thực phẩm này là {{blank}}.',
 'Loại quả này có vỏ đỏ sần, hạt ở giữa và cùi trắng mọng bao quanh. Quả thường ăn tươi, có hương vị khác với nhãn. Đó là {{blank}}.',
 'Hải sản được giã để tạo độ dai rồi nặn thành miếng và rán vàng. Loại nguyên liệu chính phân biệt món này với chả cá; tên món là {{blank}}.',
 'Sợi bánh màu nâu đỏ được ăn cùng nước dùng từ cua và nhiều loại rau. Món nước không dùng sợi bún trắng hay bánh phở dẹt. Tên món là {{blank}}.',
 'Ổ bánh nhỏ, thuôn dài, có lớp vỏ giòn và phần nhân pa tê. Khi ăn thường chấm thêm tương ớt, thay vì kẹp nhiều loại thịt và đồ chua. Đây là {{blank}}.',
 'Đậu được chế biến thành bột mịn rồi kết hợp với đường và chất béo. Miếng bánh nhỏ có kết cấu bở, tan khi ăn, không phải loại bánh có vỏ nhiều lớp. Đó là {{blank}}.',
 'Vỏ quả màu nâu nhạt, bên trong có cùi trong và hạt đen. Đây là một loại quả ăn tươi, không phải món bánh làm từ bột. Tên loại quả là {{blank}}.',
 'Nếp cùng lạc, vừng và các nguyên liệu ngọt được kết hợp rồi ép thành khối. Khi ăn, bánh được cắt thành miếng, không có lớp vỏ bọc nhân như bánh pía. Món này là {{blank}}.',
 'Cá được chế biến để dùng cùng nước dùng và bánh đa, thêm rau gia vị. Món ăn thiên về một bát nước nóng, khác với gỏi cá ăn cuốn. Tên món là {{blank}}.',
 'Cơm được tạo thành lớp, làm khô rồi chiên hoặc nướng cho giòn. Món thường dùng với nước xốt, khác với cơm nấu trong ống tre. Đó là {{blank}}.',
 'Cá được xếp trong niêu đất và kho lâu với gia vị. Thành phẩm có vị đậm, không dùng cách trộn sống hay chiên thành chả. Món được nhắc đến là {{blank}}.',
 'Lạc và đường tạo thành miếng kẹo giòn, thường dùng cùng trà. Loại kẹo này khác kẹo dừa ở nguyên liệu chính và kết cấu khi cắn. Tên gọi là {{blank}}.',
 'Thịt lợn được lên men, thường gói thành phần nhỏ cùng lá. Khi ăn có vị chua, thơm tỏi và có thể thêm ớt; món không qua nướng trước khi dùng. Đó là {{blank}}.',
 'Bột gạo được gói trong lá, bọc nhân thịt và mộc nhĩ. Bánh có dáng dài, thon, tên gợi hình một dụng cụ làm ruộng: {{blank}}.',
 'Thịt lươn được chế biến rồi dùng cùng gạo nấu mềm và các loại rau gia vị. Món được ăn nóng bằng thìa, không có sợi bún hay miến làm phần chính. Đó là {{blank}}.',
 'Lạc được nấu với mật rồi đặt giữa hai lớp bánh tráng mỏng. Cấu trúc hai lớp vỏ kẹp nhân giúp phân biệt món này với kẹo lạc thông thường. Đây là {{blank}}.',
 'Tinh bột sắn tạo lớp vỏ trong và dai, bên trong thường có tôm hoặc thịt. Bánh không có vỏ nếp đen hay nhiều lớp bột mì. Tên loại bánh là {{blank}}.',
 'Khoai lang được luộc rồi thái và phơi qua nắng. Miếng khoai có độ dẻo, vị ngọt cô lại chứ không giòn như khoai chiên. Thức quà này là {{blank}}.',
 'Nước dùng đậm vị, thơm sả, được ăn với sợi bún và thịt bò. Nguyên liệu cùng mùi sả giúp phân biệt món này với bún cá hoặc bún quậy. Tên món là {{blank}}.',
 'Lạc nằm trong khối kẹo dẻo có lớp vừng phủ ngoài. Khi ăn cảm nhận độ dai, khác với kẹo giòn kẹp giữa hai bánh tráng. Tên gọi là {{blank}}.',
 'Sợi bún được chan nước dùng có rau quả và những miếng chả làm từ cá. Món dùng chả đã chế biến thay vì chỉ có cá nguyên miếng. Tên món là {{blank}}.',
 'Sợi mì dai được dùng cùng thịt xá xíu, rau sống và phần bánh giòn. Món không được chan đầy nước dùng như một tô phở. Đó là {{blank}}.',
 'Sợi mì được trộn với các loại nhân, rau sống và một lượng nước dùng vừa phải. Bánh tráng và lạc thường đi cùng món ăn này. Tên món là {{blank}}.',
 'Một loài nhuyễn thể nhỏ được nấu lấy phần nước ngọt và thịt. Món thường ăn với bánh tráng và hành, không dùng sợi bún làm thành phần chính. Tên món là {{blank}}.',
 'Nhiều loại lá được xếp và cuốn cùng nhân, sau đó chấm nước xốt. Thành phần tạo dấu ấn nằm ở bộ lá ăn kèm, không chỉ ở một loại cá hay thịt. Món này là {{blank}}.',
 'Phần sợi được trộn và phục vụ riêng với bát nước dùng. Người ăn dùng hai phần cùng nhau thay vì chan ngập ngay từ đầu. Cách phục vụ đó gắn với món {{blank}}.',
 'Bột nếp trộn lá gai tạo vỏ bánh sẫm màu, bao quanh nhân ngọt. Bánh được gói lá thành dáng chóp, khác với bánh tròn có nhiều lớp vỏ. Tên loại bánh là {{blank}}.',
 'Bún được ăn với nước dùng có sắc đỏ đặc trưng cùng nhiều loại nhân và rau. Tên món nhấn mạnh màu sắc của bát ăn: {{blank}}.',
 'Sợi bánh dày được dùng cùng nước dùng và chả cá, phía trên phủ nhiều lá xanh cắt nhỏ. Chính lớp hẹ làm nên tên món {{blank}}.',
 'Thịt được quết, tạo hình rồi nướng, ăn cùng bánh tráng, rau và nước chấm. Món không dùng thịt lên men ăn trực tiếp như nem chua. Đây là {{blank}}.',
 'Bột được đổ vào những khuôn nhỏ bằng đất nung để làm chín. Bánh thường dùng với nước chấm, khác với bánh tráng mỏng nướng trực tiếp trên than. Đó là {{blank}}.',
 'Một tấm bánh tráng mỏng được đặt trên than, thêm trứng, hành và nhân rồi nướng giòn. Món không có dạng sợi hay vỏ cuốn hấp. Tên gọi là {{blank}}.',
 'Phần quả được xay mịn rồi kết hợp với kem lạnh. Món tráng miệng có màu xanh nhạt và vị béo, không phải chè nấu từ đậu. Đó là {{blank}}.',
 'Hạt được rang, xay rồi pha với nước, có thể dùng nóng hoặc lạnh. Mùi thơm rang và vị đắng là dấu hiệu nhận ra thức uống {{blank}}.',
 'Các nguyên liệu được bày riêng, người ăn kết hợp chúng với nước dùng khi thưởng thức. Cách bày và dùng này gắn với tên món {{blank}}.',
 'Cá được trộn với các nguyên liệu khác rồi ăn cùng rau và nước chấm. Đây là món gỏi, khác với cá kho trong niêu hoặc cá quết thành chả. Tên món là {{blank}}.',
 'Loại hạt này có dáng cong, được tách vỏ và thường rang muối. Nhân có vị bùi, không có lớp vỏ nâu tròn như hạt dẻ. Đó là {{blank}}.',
 'Bánh tráng được nướng rồi phơi qua sương để đạt độ mềm dẻo. Bánh dùng cuốn rau và thịt, khác với loại phủ trứng rồi nướng giòn. Đó là {{blank}}.',
 'Thịt và mỡ được tẩm gia vị, nhồi vào vỏ thành từng đoạn. Sản phẩm có thể chế biến trước khi ăn, không phải nem gói lá lên men. Tên món là {{blank}}.',
 'Hạt gạo vỡ được nấu thành cơm, thường ăn cùng sườn nướng, bì và chả. Món không được ép rồi chiên giòn như cơm cháy. Đó là {{blank}}.',
 'Vỏ bánh giòn được xẻ dọc để kẹp thịt, pa tê, rau và đồ chua. Thành phần chính là một ổ bánh, không phải tấm bánh tráng để cuốn. Tên món là {{blank}}.',
 'Phần thịt gà được trộn cùng một loại quả còn xanh, thái mỏng để giữ độ giòn. Nguyên liệu quả này tạo nét riêng cho món {{blank}}.',
 'Bánh được đổ trong khuôn nhỏ, có lớp vỏ giòn và tôm phía trên. Khi ăn dùng rau sống và nước chấm; món không có dạng bánh lớn gập đôi. Đó là {{blank}}.',
 'Sợi làm từ gạo được ăn cùng thịt và nước dùng, cũng có thể phục vụ khô. Món thuộc nhóm sợi, khác với cơm hay bánh nếp gói lá. Tên món là {{blank}}.',
 'Thịt được chế biến và gói thành phần nhỏ để tạo vị chua. Tên món thường dùng cho loại thịt lên men gói lá, không phải thịt quết rồi nướng. Đó là {{blank}}.',
 'Quả có lớp vỏ mỏng; phần thịt mềm, ngọt, khi bổ có thể thấy dịch trắng. Loại quả này khác nhãn ở cả kích thước lẫn cấu trúc phần ruột. Đó là {{blank}}.',
 'Sợi nhỏ làm từ gạo được dùng cùng thịt và nước dùng thanh. Đây là món ăn dạng sợi, không dùng hạt gạo nấu thành cơm. Tên món là {{blank}}.',
 'Cá và các loại rau được ăn cùng bún; nghệ tạo mùi và sắc nước dùng. Món không dùng thịt bò làm nguyên liệu chính. Tên món là {{blank}}.',
 'Đường lấy từ cây thốt nốt tạo màu vàng nâu và hương thơm cho bánh. Ruột bánh nở xốp với những lỗ nhỏ, không có nhân đậu bọc kín. Món đó là {{blank}}.',
 'Hải sản được quết hoặc dàn trong bát rồi làm chín bằng nước dùng nóng; người ăn tự pha nước chấm. Cách chuẩn bị này gắn với món {{blank}}.',
 'Một loại cá biển nhỏ được trộn làm gỏi, ăn cùng bánh tráng và rau. Tên món nêu rõ nguyên liệu cá, không phải thịt gà hay một loại lá. Đó là {{blank}}.',
 'Loại củ này được trồng trên ruộng, có thể luộc hoặc nướng để ăn phần ruột bở ngọt. Nó không phải hạt hay quả mọc trên cây. Tên loại củ là {{blank}}.',
 'Nước cốt từ phần cơm của quả được nấu với đường cho sánh, rồi cắt thành viên nhỏ. Vị béo của nguyên liệu này giúp nhận ra món {{blank}}.',
 'Bột gạo kết hợp với nguyên liệu từ quả dừa, được tráng mỏng và phơi. Khi nướng, bánh có hương dừa và độ giòn. Đây là {{blank}}.',
 'Mắm góp phần tạo hương cho nước dùng, sau đó ăn cùng bún, rau và các loại nhân. Món được gọi theo phần nước dùng đặc trưng: {{blank}}.',
 'Nếp bao quanh nhân và được gói lá thành đòn dài, luộc chín rồi cắt khoanh. Hình dáng phân biệt món này với bánh chưng vuông. Tên bánh là {{blank}}.',
 'Bột, đậu xanh và nhân được cho vào dụng cụ dạng ống nhỏ, đặt tôm lên rồi nhúng vào dầu. Bánh vàng giòn sau khi lấy khỏi khuôn. Tên món là {{blank}}.',
 'Thịt của một loại cá được quết kỹ để tạo độ dai rồi chế biến thành chả. Tên món nêu rõ loại cá, khác với chả mực: {{blank}}.',
 'Quả có vỏ nhiều mắt và phần ngọn có chùm lá cứng. Ruột có vị ngọt chua, thường ăn tươi hoặc dùng trong món nấu. Tên gọi ở miền Nam là {{blank}}.',
 'Bánh có nhiều lớp vỏ mỏng; phần nhân thường kết hợp đậu xanh với sầu riêng. Khi cắt thấy nhân đặc bên trong, khác với bánh đậu xanh bở mịn. Đây là {{blank}}.',
 'Sợi bún được dùng với nước xốt sánh và cay, khác với bát nước lèo trong thông thường. Chính kết cấu nước dùng gắn với tên món {{blank}}.',
 'Loài giáp xác có mai rộng, hai càng và sống ở môi trường nước mặn hoặc lợ. Khi hấp hay luộc, vỏ chuyển màu đỏ cam. Hải sản được nhắc đến là {{blank}}.',
 'Bột gạo được khuấy chín, se thành sợi rồi hấp cho mềm và dai. Bánh thường ăn cùng bì, thịt, rau và nước xốt; tên món ăn được mô tả là {{blank}}.'
];
const FOOD_IDS = ["ha-noi-3", "tuyen-quang-3", "ha-giang-3", "cao-bang-3", "lai-chau-3", "lao-cai-3", "yen-bai-3", "thai-nguyen-3", "bac-kan-3", "dien-bien-3", "lang-son-3", "son-la-3", "phu-tho-3", "vinh-phuc-3", "hoa-binh-3", "bac-ninh-3", "bac-giang-3", "bac-giang-4", "quang-ninh-3", "hai-phong-3", "hai-phong-4", "hai-duong-3", "hung-yen-3", "thai-binh-3", "thai-binh-4", "ninh-binh-3", "ha-nam-3", "nam-dinh-3", "thanh-hoa-3", "thanh-hoa-4", "nghe-an-3", "ha-tinh-3", "quang-tri-3", "quang-binh-3", "hue-3", "hue-4", "da-nang-3", "quang-nam-3", "quang-nam-4", "quang-ngai-3", "kon-tum-3", "gia-lai-3", "binh-dinh-3", "dak-lak-3", "phu-yen-3", "khanh-hoa-3", "ninh-thuan-3", "lam-dong-3", "lam-dong-4", "dak-nong-3", "binh-thuan-3", "dong-nai-3", "binh-phuoc-3", "tay-ninh-3", "long-an-3", "tphcm-3", "tphcm-4", "binh-duong-3", "ba-ria---vung-tau-3", "dong-thap-3", "dong-thap-4", "tien-giang-3", "tien-giang-4", "an-giang-3", "an-giang-4", "kien-giang-3", "kien-giang-4", "vinh-long-3", "ben-tre-3", "ben-tre-4", "tra-vinh-3", "tra-vinh-4", "can-tho-3", "hau-giang-3", "hau-giang-4", "soc-trang-3", "soc-trang-4", "ca-mau-3", "bac-lieu-3"];
const FOOD_HINTS = {
 'Bánh tằm bì':'Chú ý hai dấu hiệu: bánh dạng sợi và phần bì ăn kèm.',
 'Bánh cáy':'Đây là bánh ép thành khối rồi cắt miếng, không có vỏ bọc nhân.',
 'Cơm tấm':'Từ cần tìm liên quan đến hạt gạo bị vỡ.',
 'Cao lầu':'Phân biệt cách dùng nước với một bát mì nước thông thường.'
};
const SPECIAL_OPTIONS = {
 'Cua biển':['Cua biển','Tôm hùm','Tôm sú','Bề bề'],
 'Hạt dẻ':['Hạt dẻ','Hạt điều','Hạt mắc ca','Hạt óc chó'],
 'Hạt điều':['Hạt điều','Hạt dẻ','Hạt mắc ca','Hạt hạnh nhân'],
 'Nhãn lồng':['Nhãn lồng','Vải thiều','Chôm chôm','Bòn bon'],
 'Vải thiều':['Vải thiều','Nhãn lồng','Chôm chôm','Bòn bon'],
 'Vú sữa':['Vú sữa','Măng cụt','Hồng xiêm','Lê'],
 'Khóm':['Khóm','Mít','Mãng cầu','Sầu riêng'],
 'Khoai lang':['Khoai lang','Khoai môn','Khoai sọ','Sắn'],
 'Kem bơ':['Kem bơ','Kem dừa','Kem sầu riêng','Chè đậu xanh'],
 'Cà phê':['Cà phê','Trà đen','Ca cao','Trà gạo rang'],
 'Bánh tằm bì':['Bánh tráng nướng','Bánh canh','Bánh tằm bì','Bánh cuốn'],
 'Bánh tráng nướng':['Bánh tráng nướng','Bánh căn','Bánh cuốn','Bánh khọt'],
 'Bánh canh hẹ':['Bánh canh hẹ','Bánh đa cua','Bún chả cá','Hủ tiếu'],
 'Bánh cáy':['Bánh cáy','Bánh đậu xanh','Bánh pía','Bánh ít lá gai'],
 'Phở':['Phở','Hủ tiếu','Bún bò','Bánh canh'],
 'Bánh mì cay':['Bánh mì cay','Bánh mì xíu mại','Bánh mì chảo','Bánh mì thịt nướng'],
 'Bánh mì':['Bánh mì','Bánh tráng cuốn','Bánh bao','Bánh giò'],
 'Nem':['Nem','Nem nướng','Chả lụa','Chả cốm'],
 'Nem chua':['Nem chua','Nem nướng','Chả lụa','Chả cốm'],
 'Kẹo dừa':['Kẹo dừa','Kẹo cu đơ','Mè xửng','Kẹo Sìu Châu']
};
const LANDMARK_GROUPS = [
 ['temple',/chùa|đền|miếu|thiền viện|tòa thánh|nhà thờ/],
 ['tower',/tháp|thành |cổng|dinh |ngọ môn|văn miếu|nhà cổ|hoàng thành|đình /],
 ['waterfall',/thác/],
 ['cave',/động|hang /],
 ['lake',/hồ |ao /],
 ['coast',/biển|vịnh|đảo|hòn |cù lao/],
 ['water',/hồ |vịnh|suối|biển|thác|động|hang |đảo|hòn |cù lao|kênh|tràng an|ao /],
 ['mountain',/núi|đèo|đồi|fansipan|pù luông|langbiang|mù cang chải|chư /],
 ['history',/di tích|nhà tù|nhà đày|địa đạo|lán |hầm|làng sen|lưu niệm|mường phăng/],
 ['bridge',/cầu /]
];
function topic(c){const n=normalize(c.name);if(c.type==='landmark'){return LANDMARK_GROUPS.find(([,rx])=>rx.test(c.name.toLowerCase()))?.[0]||'place';}const name=foodName(c);if(/^(Bánh|Kẹo|Mè|Khẩu|Cốm)/.test(name))return 'cake';if(/^(Bún|Phở|Hủ|Mì|Miến|Cao|Canh|Cháo)/.test(name))return 'noodle';if(/^(Gỏi|Nem|Chả|Lạp|Thịt|Vịt|Cá|Thắng|Nậm)/.test(name))return 'savory';if(/^(Cơm|Xôi)/.test(name))return 'rice';return 'produce';}
export function foodName(c){return c.answerName||c.name;}
export function foodEditorial(cards){return cards.filter(c=>c.type==='food'&&FOOD_IDS.includes(c.id)).map(c=>{const i=FOOD_IDS.indexOf(c.id);return {id:c.id,answerName:FOOD_NAMES[i],passage:FOOD_PASSAGES[i],foodArt:{sheet:Math.floor(i/16),tile:i%16}};});}
function shuffled(xs,rng){const out=[...xs];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
export function distractors(data,c,rng=Math.random){
 const own=byRegion(data,c.region),group=topic(c),answer=c.type==='food'?foodName(c):c.name;
 const ranked=shuffled(data.cards.filter(x=>x.type===c.type&&x.id!==c.id),rng).map(x=>{const r=byRegion(data,x.region);return {c:x,score:(topic(x)===group?20:0)+normalize(x.name).split(/\s+/).filter(w=>w.length>2&&normalize(c.name).split(/\s+/).includes(w)).length*2+(r?.macro===own?.macro?3:0)+(x.region===c.region?2:0)};}).sort((a,b)=>b.score-a.score);
 const seen=new Set([normalize(answer)]),out=[];for(const x of ranked){const label=c.type==='food'?foodName(x.c):x.c.name;const n=normalize(label);if(seen.has(n))continue;seen.add(n);out.push({id:x.c.id,label});if(out.length===3)break;}return out;
}
function byRegion(data,id){return data.regions.find(r=>r.id===id);}
function obscureName(text,c,data){
 let result=text;const replacements=[c.name];
 for(const name of replacements){const rx=new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'giu');result=result.replace(rx,'địa danh này');}
 return result;
}
export function makeQuestion(data,c,mode='clue',rng=Math.random){
 if((mode==='clue'||mode==='image')&&c.question){const q=c.question;const options=shuffled(q.options.map((label,i)=>({id:i===q.answer?c.id:`${c.id}:option:${i}`,label})),rng);return {passage:q.passage,options,correct:c.id,hint:q.hint,explanation:q.explanation,source:q.source||c.source,level:'Vừa'};}
 if(mode==='geo'){
  const r=byRegion(data,c.region),siblings=data.regions.filter(x=>x.id!==r.id),same=siblings.filter(x=>x.macro===r.macro),pool=shuffled([...same,...siblings.filter(x=>x.macro!==r.macro)],rng).sort((a,b)=>(a.macro===r.macro?0:1)-(b.macro===r.macro?0:1));
  const options=shuffled([{id:r.id,label:r.name},...pool.slice(0,3).map(x=>({id:x.id,label:x.name}))],rng);
  return {passage:`${obscureName(c.intro,c,data)} Xét theo 63 vùng khám phá trước sắp xếp, ${c.type==='food'?'đặc sản':'địa danh'} ${c.name} được xếp vào vùng {{blank}}.`,options,correct:r.id,hint:'Chọn theo vùng trước sắp xếp, không phải tên chapter hiện tại.',explanation:`${c.name} nằm trong bộ sưu tập ${r.name}, thuộc chapter ${data.chapters.find(x=>x.id===r.chapter).name}.`,source:c.source,level:'Vừa'};
 }
 const label=c.type==='food'?foodName(c):c.name;
 const other=c.type==='food'&&SPECIAL_OPTIONS[label]?SPECIAL_OPTIONS[label].filter(x=>normalize(x)!==normalize(label)).map((x,i)=>({id:`${c.id}:other:${i}`,label:x})):distractors(data,c,rng);
 const options=shuffled([{id:c.id,label},...other],rng);
 let passage=c.type==='food'?c.questionPassage:`${obscureName(c.intro,c,data)} Địa danh được mô tả trong đoạn này là {{blank}}.`;

 return {passage,options,correct:c.id,hint:c.type==='food'?FOOD_HINTS[label]||'So sánh nguyên liệu chính và cách chế biến, thay vì đoán theo tên vùng.':'So sánh loại công trình hoặc cảnh quan với từng lựa chọn.',explanation:c.intro,source:c.source,level:'Vừa'};
}
