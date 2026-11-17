/* =====================================================================
   DANH MỤC TRANG CHỦ — đây là nơi DUY NHẤT bạn cần sửa khi bảo trì.
   Xem HUONG-DAN.md để biết cách thêm, ẩn, đổi chủ đề cho thí nghiệm.

   CẤU TRÚC THƯ MỤC (phẳng, chỉ hai thư mục dùng chung):
     thi-nghiem/<id>.html     mỗi thí nghiệm là một file, TÊN FILE = id thí nghiệm
     anh/<id>.jpg             ảnh đại diện, tên file = id (nhận .webp .jpg .jpeg .png)
     "image" ghi đường dẫn KHÔNG có đuôi file; trang tự tìm đúng đuôi. Chưa có ảnh thì tự dùng hình vẽ.
     Chủ đề của thí nghiệm do "topic" bên dưới quyết định, không phụ thuộc vào thư mục. Nhờ vậy đổi chủ đề
     chỉ cần sửa "topic", không phải di chuyển file, và liên kết đã chia sẻ không bị hỏng.

   QUY ƯỚC ĐẶT TÊN (rất quan trọng khi đưa lên máy chủ):
     - id, tên file thí nghiệm, tên file ảnh: chỉ dùng chữ thường không dấu a-z, số 0-9 và dấu gạch ngang (-).
       Ví dụ: "con-lac-don". KHÔNG dấu tiếng Việt, KHÔNG dấu cách, KHÔNG chữ hoa, KHÔNG gạch dưới.
     - id đã công bố thì KHÔNG đổi nữa (người dùng có thể đã lưu/chia sẻ liên kết). Muốn đổi tên hiển thị
       thì sửa "title", đừng sửa "id".
     - Chủ đề của thí nghiệm nằm ở "topic" trong file này, KHÔNG phản ánh vào tên thư mục. Nhờ vậy chuyển
       thí nghiệm sang chủ đề khác không làm đổi đường dẫn.
     - "ver": số phiên bản của thí nghiệm. Mỗi lần nâng cấp file thí nghiệm, tăng "ver" lên (1, 2, 3...)
       để trình duyệt của người dùng tải bản mới thay vì dùng bản đã lưu tạm.

   ẢNH ĐẠI DIỆN CHỦ ĐỀ (tuỳ chọn): thêm "image": "anh/chu-de-<id chủ đề>" vào chủ đề (không ghi đuôi file), ví dụ
     {"id": "tu-truong", ..., "image": "anh/chu-de-tu-truong"}  rồi đặt file anh/chu-de-tu-truong.jpg.
     Tiền tố "chu-de-" tránh trùng tên với ảnh thí nghiệm. Chủ đề không có "image" (hoặc chưa có file ảnh)
     thì dùng hình vẽ SVG. Ảnh chủ đề chỉ hiện ở ô "Duyệt theo chủ đề" trên trang chủ. Tỉ lệ khung 2:1.

   settings: "hideEmptyTopics" ẩn chủ đề chưa có thí nghiệm khỏi cả menu trái lẫn ô duyệt;
             "hideEmptyTiles" chỉ ẩn khỏi ô "Duyệt theo chủ đề" ở trang chủ (menu trái vẫn đủ).

   status của mỗi thí nghiệm:
     "ready"  : hiện và bấm mở được (cần có "url")
     "soon"   : hiện thẻ mờ "Sắp ra mắt", không bấm được
     "hidden" : ẩn hoàn toàn (giữ lại dữ liệu để dùng sau)
   ===================================================================== */
window.SITE_DATA = {
  /* CHỮ Ở TRANG CHỦ — sửa tại đây. Để "intro" là "" thì bỏ dòng mô tả; "showStats": false thì bỏ hàng số liệu. */
  "home": {
    "title": "Khám phá vật lý bằng thí nghiệm tương tác",
    "intro": "Chọn một chủ đề ở danh mục bên trái, hoặc thử ngay một trong những thí nghiệm được gợi ý ngẫu nhiên bên dưới.",
    "showStats": true,
    "randomTitle": "Thí nghiệm ngẫu nhiên",
    "shuffleLabel": "Xáo trộn",
    "browseTitle": "Duyệt theo chủ đề"
  },

  "settings": {"showSoon": false, "hideEmptyTopics": false, "hideEmptyTiles": true, "randomCount": 9, "newDays": 30},
  "groups": ["Cơ học", "Nhiệt học", "Điện và từ", "Quang học", "Vật lý hiện đại"],
  "topics": [
    {"id": "dong-hoc", "name": "Động học chất điểm", "group": 0, "hue": 210, "desc": "Chuyển động thẳng, ném xiên, ném ngang, chuyển động tròn."},
    {"id": "dong-luc-hoc", "name": "Động lực học chất điểm", "group": 0, "hue": 232, "desc": "Các định luật Newton, lực ma sát, lực hướng tâm."},
    {"id": "dong-luong", "name": "Động lượng", "group": 0, "hue": 262, "desc": "Va chạm, bảo toàn động lượng, chuyển động phản lực."},
    {"id": "nang-luong", "name": "Năng lượng", "group": 0, "hue": 28, "desc": "Công, công suất, động năng, thế năng, bảo toàn cơ năng."},
    {"id": "bien-dang", "name": "Biến dạng đàn hồi", "group": 0, "hue": 148, "desc": "Lực đàn hồi, định luật Hooke, biến dạng kéo và nén."},
    {"id": "dao-dong", "name": "Dao động", "group": 0, "hue": 172, "desc": "Con lắc lò xo, con lắc đơn, dao động tắt dần và cộng hưởng."},
    {"id": "song", "name": "Sóng", "group": 0, "hue": 194, "desc": "Sóng cơ, giao thoa, sóng dừng, sóng âm."},
    {"id": "vat-ly-nhiet", "name": "Vật lý nhiệt", "group": 1, "hue": 12, "desc": "Nhiệt độ, nhiệt lượng, sự chuyển thể, nở vì nhiệt."},
    {"id": "khi-ly-tuong", "name": "Khí lý tưởng", "group": 1, "hue": 340, "desc": "Mô hình động học phân tử, các đẳng quá trình."},
    {"id": "dien-truong", "name": "Điện trường", "group": 2, "hue": 46, "desc": "Lực Coulomb, đường sức điện, điện thế, tụ điện."},
    {"id": "dong-dien-mot-chieu", "name": "Dòng điện một chiều", "group": 2, "hue": 286, "desc": "Định luật Ohm, mạch nối tiếp, song song, nguồn điện."},
    {"id": "dong-dien-moi-truong", "name": "Dòng điện trong các môi trường", "group": 2, "hue": 318, "desc": "Điện phân, chất bán dẫn, dòng điện trong chất khí và chân không."},
    {"id": "tu-truong", "name": "Từ trường", "group": 2, "hue": 355, "desc": "Đường sức từ, lực từ, từ trường của dòng điện."},
    {"id": "dien-tu-truong", "name": "Điện từ trường và sóng điện từ", "group": 2, "hue": 268, "desc": "Cảm ứng điện từ, điện từ trường, sự lan truyền sóng điện từ."},
    {"id": "quang-hoc", "name": "Quang học", "group": 3, "hue": 92, "desc": "Khúc xạ, phản xạ, thấu kính, giao thoa và nhiễu xạ ánh sáng."},
    {"id": "hat-nhan", "name": "Vật lý hạt nhân", "group": 4, "hue": 128, "desc": "Cấu tạo hạt nhân, phóng xạ, phản ứng hạt nhân."}
  ],
  "experiments": [
    {"id": "tu-truong-dong-dien", "topic": "tu-truong", "title": "Từ trường của dòng điện", "desc": "Dây thẳng, vòng tròn, ống dây: đường sức từ, quy tắc nắm tay phải, vặn nút chai và nam châm thử.", "status": "ready", "url": "thi-nghiem/tu-truong-dong-dien.html", "ver": "4", "tag": "3D", "icon": "coil", "added": "2026-11-15", "image": "anh/tu-truong-dong-dien"},
    {"id": "dinh-luat-boyle", "topic": "khi-ly-tuong", "title": "Định luật Boyle 3D: xilanh – pít-tông", "desc": "Mô hình 3D xoay được: kéo tay quay nén/giãn khí, xem mật độ phân tử, áp kế, đồ thị p–V.", "status": "ready", "url": "thi-nghiem/dinh-luat-boyle.html", "ver": "6", "tag": "3D", "icon": "boyle", "added": "2026-11-17", "image": "anh/dinh-luat-boyle"},
    {"id": "dong-dien-cam-ung", "topic": "tu-truong", "title": "Dòng điện cảm ứng trong vòng dây", "desc": "Nam châm xuyên qua vòng dây: chiều dòng điện cảm ứng theo định luật Len-xơ, đường sức từ và vectơ vận tốc.", "status": "ready", "url": "thi-nghiem/dong-dien-cam-ung.html", "ver": "2", "tag": "3D", "icon": "cam-ung", "added": "2026-11-15", "image": "anh/dong-dien-cam-ung"},
    {"id": "cd-bdd", "topic": "dong-hoc", "title": "Chuyển động thẳng biến đổi đều", "desc": "Quan sát vận tốc, quãng đường và gia tốc theo thời gian.", "status": "soon"},
    {"id": "chuyen-dong-nem", "topic": "dong-hoc", "title": "Vật ném trong không khí", "desc": "Ném ngang, ném xiên có lực cản không khí và gió; so sánh với quỹ đạo parabol trong chân không.", "status": "ready", "url": "thi-nghiem/chuyen-dong-nem.html", "ver": "1", "tag": "3D", "added": "2026-11-16","image": "anh/chuyen-dong-nem"},
    {"id": "newton-2", "topic": "dong-luc-hoc", "title": "Định luật II Newton trên mặt phẳng nghiêng", "desc": "Phân tích lực và gia tốc của vật trượt trên dốc.", "status": "soon"},
    {"id": "luc-huong-tam", "topic": "dong-luc-hoc", "title": "Lực ma sát và lực hướng tâm", "desc": "Vật chuyển động tròn trên mặt bàn quay.", "status": "soon"},
    {"id": "va-cham", "topic": "dong-luong", "title": "Va chạm đàn hồi và va chạm mềm", "desc": "So sánh động lượng và động năng trước, sau va chạm.", "status": "soon"},
    {"id": "phan-luc", "topic": "dong-luong", "title": "Chuyển động bằng phản lực", "desc": "Tên lửa nước và định luật bảo toàn động lượng.", "status": "soon"},
    {"id": "co-nang", "topic": "nang-luong", "title": "Bảo toàn cơ năng của con lắc", "desc": "Theo dõi sự chuyển hoá động năng, thế năng.", "status": "soon"},
    {"id": "cong-cs", "topic": "nang-luong", "title": "Công và công suất", "desc": "Tính công của lực theo quãng đường và góc hợp.", "status": "soon"},
    {"id": "hooke", "topic": "bien-dang", "title": "Định luật Hooke với lò xo", "desc": "Đo độ cứng lò xo từ đồ thị lực và độ dãn.", "status": "soon"},
    {"id": "keo-thanh", "topic": "bien-dang", "title": "Biến dạng kéo của thanh", "desc": "Ứng suất, biến dạng tỉ đối và suất Young.", "status": "soon"},
    {"id": "con-lac-lo-xo", "topic": "dao-dong", "title": "Con lắc lò xo", "desc": "Chu kì, năng lượng và đồ thị dao động điều hoà.", "status": "soon"},
    {"id": "con-lac-don", "topic": "dao-dong", "title": "Con lắc đơn", "desc": "Chu kì theo chiều dài dây và gia tốc trọng trường.", "status": "soon"},
    {"id": "giao-thoa-nuoc", "topic": "song", "title": "Giao thoa sóng nước", "desc": "Hai nguồn kết hợp, cực đại và cực tiểu giao thoa.", "status": "soon"},
    {"id": "song-dung", "topic": "song", "title": "Sóng dừng trên dây", "desc": "Nút sóng, bụng sóng và các hoạ âm.", "status": "soon"},
    {"id": "can-bang-nhiet", "topic": "vat-ly-nhiet", "title": "Nhiệt dung và cân bằng nhiệt", "desc": "Trộn hai chất ở nhiệt độ khác nhau.", "status": "soon"},
    {"id": "no-nhiet", "topic": "vat-ly-nhiet", "title": "Sự nở vì nhiệt", "desc": "Nở dài, nở khối của các vật liệu khác nhau.", "status": "soon"},
    {"id": "dang-qua-trinh", "topic": "khi-ly-tuong", "title": "Các đẳng quá trình", "desc": "Đẳng nhiệt, đẳng tích, đẳng áp trên đồ thị p-V-T.", "status": "soon"},
    {"id": "dong-hoc-phan-tu", "topic": "khi-ly-tuong", "title": "Mô hình động học phân tử", "desc": "Áp suất khí sinh ra từ va chạm của các phân tử.", "status": "soon"},
    {"id": "coulomb", "topic": "dien-truong", "title": "Lực Coulomb giữa các điện tích", "desc": "Lực tương tác theo độ lớn điện tích và khoảng cách.", "status": "soon"},
    {"id": "duong-suc-dien", "topic": "dien-truong", "title": "Đường sức điện và điện thế", "desc": "Điện trường của điện tích điểm và hệ điện tích.", "status": "soon"},
    {"id": "ohm", "topic": "dong-dien-mot-chieu", "title": "Định luật Ohm và mạch điện", "desc": "Mạch nối tiếp, song song, đo U, I bằng đồng hồ.", "status": "soon"},
    {"id": "suat-dien-dong", "topic": "dong-dien-mot-chieu", "title": "Suất điện động và điện trở trong", "desc": "Hiệu điện thế hai cực của nguồn khi có tải.", "status": "soon"},
    {"id": "dien-phan", "topic": "dong-dien-moi-truong", "title": "Điện phân dung dịch", "desc": "Chuyển động của ion và định luật Faraday.", "status": "soon"},
    {"id": "ban-dan", "topic": "dong-dien-moi-truong", "title": "Chất bán dẫn và điốt", "desc": "Lớp chuyển tiếp p-n và đặc tuyến vôn-ampe.", "status": "soon"},
    {"id": "luc-tu", "topic": "tu-truong", "title": "Lực từ lên dây dẫn mang dòng điện", "desc": "Quy tắc bàn tay trái, lực từ theo B, I và chiều dài.", "status": "soon"},
    {"id": "song-dien-tu", "topic": "dien-tu-truong", "title": "Sự lan truyền sóng điện từ", "desc": "Điện trường và từ trường vuông góc, cùng pha.", "status": "soon"},
    {"id": "khuc-xa", "topic": "quang-hoc", "title": "Khúc xạ và phản xạ toàn phần", "desc": "Định luật Snell, góc giới hạn, tia sáng qua lăng kính.", "status": "soon"},
    {"id": "thau-kinh", "topic": "quang-hoc", "title": "Thấu kính và tạo ảnh", "desc": "Dựng ảnh bằng tia đặc biệt, công thức thấu kính.", "status": "soon"},
    {"id": "phong-xa", "topic": "hat-nhan", "title": "Phóng xạ và chu kì bán rã", "desc": "Số hạt nhân còn lại theo thời gian.", "status": "soon"},
    {"id": "phan-hach", "topic": "hat-nhan", "title": "Phản ứng phân hạch", "desc": "Phản ứng dây chuyền và năng lượng toả ra.", "status": "soon"}
  ]
};
