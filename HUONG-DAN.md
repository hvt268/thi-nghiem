# Hướng dẫn bảo trì trang Vật lý ảo

## Cấu trúc thư mục và nguyên tắc "mỗi file một việc"

```
vat-ly-ao/
├─ index.html               Khung trang, gần như không bao giờ phải sửa
├─ css/trang-chu.css        GIAO DIỆN: màu sắc, bố cục, kiểu thẻ, menu
├─ js/ung-dung.js           LOGIC: dựng menu, thẻ, tìm kiếm, trang bảo trì
├─ data/
│  ├─ danh-muc.js           DANH MỤC: chủ đề + thí nghiệm (thêm, ẩn, đổi chủ đề)
│  ├─ hinh-dai-dien.js      HÌNH VẼ: mỗi hình đại diện là một dòng SVG
│  └─ ve-trang-chu.js       Nút "← Trang chủ" cho các trang thí nghiệm (tuỳ chọn)
├─ 404.html                 Trang báo lỗi khi gõ sai đường dẫn (nhiều hosting tự dùng file này)
├─ thi-nghiem/              TẤT CẢ thí nghiệm, mỗi thí nghiệm một file, tên file = id
│  ├─ dinh-luat-boyle.html
│  ├─ tu-truong-dong-dien.html
│  └─ dong-dien-cam-ung.html
├─ anh/                     TẤT CẢ ảnh đại diện (tuỳ chọn), tên file = id thí nghiệm
│  ├─ dinh-luat-boyle.jpg
│  ├─ tu-truong-dong-dien.jpg
│  └─ dong-dien-cam-ung.jpg
└─ cong-cu/xem-hinh.html    Trang xem trước tất cả hình đại diện khi đang chỉnh
```

Bạn muốn làm gì thì chỉ mở đúng một nơi:

| Việc cần làm | File cần sửa |
|---|---|
| Thêm, ẩn, xoá thí nghiệm, đổi chủ đề, đổi mô tả | `data/danh-muc.js` |
| Vẽ mới hoặc chỉnh hình đại diện | `data/hinh-dai-dien.js` (xem bằng `cong-cu/xem-hinh.html`) |
| Đổi màu, cỡ chữ, kiểu thẻ, bố cục | `css/trang-chu.css` |
| Đổi cách hoạt động (ví dụ thêm bộ lọc) | `js/ung-dung.js` |
| Nâng cấp một thí nghiệm | file trong `thi-nghiem/` |

Có thể mở `index.html` bằng cách bấm đúp, hoặc đưa cả thư mục lên bất kỳ máy chủ web/hosting tĩnh nào (GitHub Pages, Netlify, Cloudflare Pages, hosting của trường...). Không cần cài đặt hay biên dịch gì. Sau khi sửa file, nhấn Ctrl+F5 để trình duyệt tải lại bản mới thay vì dùng bản đã lưu tạm.

## 1. Thêm một thí nghiệm mới

Chỉ có hai thư mục dùng chung: `thi-nghiem/` và `anh/`. Tên file chính là mã (`id`) của thí nghiệm, nên nhìn tên file là biết thí nghiệm nào.

1. Chép thí nghiệm vào `thi-nghiem/con-lac-don.html`.
2. (Tuỳ chọn) Chép ảnh đại diện vào `anh/con-lac-don.jpg`. Nhận `.webp`, `.jpg`, `.jpeg`, `.png`. Ảnh được cắt vừa khung 16:9 nên để chủ thể ở giữa ảnh. Chưa có ảnh thì trang tự dùng hình vẽ.
3. Mở `index.html#/bao-tri`, điền form "Soạn dòng cho thí nghiệm mới" rồi bấm "Sao chép dòng này". Dòng sinh ra đã có sẵn `url` và `image` đúng theo cấu trúc trên.
4. Dán dòng đó vào cuối mảng `"experiments"` trong `data/danh-muc.js` (nhớ dấu phẩy giữa các dòng), lưu file, tải lại trang chủ.
5. (Tuỳ chọn) Thêm dòng `<script src="../data/ve-trang-chu.js" defer></script>` vào cuối `<body>` của thí nghiệm để có nút "← Trang chủ".

**Chủ đề không nằm trong đường dẫn.** Thí nghiệm hiện ở chủ đề nào do `"topic"` trong `danh-muc.js` quyết định. Chuyển thí nghiệm sang chủ đề khác chỉ cần đổi `"topic"`, không phải di chuyển file, và liên kết người dùng đã chia sẻ vẫn sống.

Nếu một thí nghiệm sau này cần file phụ riêng (dữ liệu, ảnh, âm thanh), tạo thư mục `thi-nghiem/con-lac-don-tai-nguyen/` rồi dẫn tới nó bằng đường dẫn tương đối từ file `.html`. Không để file phụ lẫn vào các file `.html` khác.

Một dòng thí nghiệm trông như sau:

```js
{"id":"con-lac-don","topic":"dao-dong","title":"Con lắc đơn","desc":"Chu kì theo chiều dài dây.","status":"ready","url":"thi-nghiem/con-lac-don.html","ver":"1","image":"anh/con-lac-don","added":"2026-11-20"},
```

| Trường | Ý nghĩa |
|---|---|
| `id` | Mã duy nhất, không dấu, không trùng |
| `topic` | Mã chủ đề (xem mảng `"topics"`) |
| `status` | `ready` hiện và bấm mở được · `soon` thẻ mờ "Sắp ra mắt" · `hidden` ẩn hoàn toàn |
| `url` | Đường dẫn file, tính từ `index.html`, luôn dạng tương đối (không bắt đầu bằng `/`) |
| `ver` | Số phiên bản của thí nghiệm. Mỗi lần nâng cấp file thí nghiệm, tăng lên 1 để người dùng tải bản mới |
| `tag` | (tuỳ chọn) nhãn nhỏ ở góc thẻ, ví dụ `"3D"` |
| `image` | (tuỳ chọn) ảnh đại diện, ghi không đuôi file, ví dụ `"anh/con-lac-don"`; trang tự thử `.webp .jpg .jpeg .png`. Không thấy ảnh thì dùng hình vẽ |
| `icon` | (tuỳ chọn) tên một hình trong `data/hinh-dai-dien.js`; bỏ trống thì dùng hình của chủ đề |
| `added` | (tuỳ chọn) ngày thêm `YYYY-MM-DD`; trong 30 ngày đầu thẻ có nhãn "Mới" |

## 2. Ẩn, hiện, xoá

- **Tạm ẩn** (đang nâng cấp, chưa muốn công khai): đổi `"status":"hidden"`. Dữ liệu vẫn còn, đổi lại `"ready"` là hiện lại.
- **Đánh dấu sắp có**: `"status":"soon"` (bỏ `url` cũng được).
- **Xoá hẳn**: xoá dòng đó trong `danh-muc.js`. File `.html` trong `thi-nghiem/` không bị ảnh hưởng.
- **Ẩn cả một chủ đề**: thêm `"hidden":true` vào dòng chủ đề trong mảng `"topics"`.
- **Ẩn toàn bộ thẻ "Sắp ra mắt"**: đổi `"showSoon"` trong `"settings"` thành `false` (khi chỉ muốn công khai thí nghiệm thật).
- **Ẩn chủ đề chưa có thí nghiệm nào**: đặt `"hideEmptyTopics":true`.

## 2b. Hình đại diện

Hình đại diện được vẽ bằng code SVG, không cần file ảnh. Trong `data/hinh-dai-dien.js`, mỗi dòng có dạng `"tên-hình": "<nội dung SVG>"`, khung vẽ 320 × 180, dùng các lớp màu `s`, `a`, `fi`, `fa` để hình tự đổi màu theo chủ đề và chế độ sáng/tối (chi tiết ở phần chú thích đầu file).

- Hình có tên trùng `id` của chủ đề là hình mặc định của chủ đề đó.
- Muốn một thí nghiệm có hình riêng: thêm một hình mới (ví dụ `"con-lac-don"`), rồi thêm `"icon":"con-lac-don"` vào dòng thí nghiệm.
- Mở `cong-cu/xem-hinh.html` để xem tất cả hình cùng nơi chúng đang được dùng. Hình hiện chữ "Chưa được dùng ở đâu" là hình dư, có thể xoá.
- Trang bảo trì sẽ báo nếu một `icon` hoặc chủ đề không có hình tương ứng.

## 3. Nâng cấp một thí nghiệm đang chạy

Sửa file `.html` của thí nghiệm đó trong `thi-nghiem/`, rồi **tăng `"ver"`** của thí nghiệm trong `danh-muc.js` (ví dụ từ `"1"` lên `"2"`). Nhờ vậy trình duyệt của người dùng tải bản mới ngay thay vì dùng bản đã lưu tạm. Nếu nâng cấp lớn và muốn giữ bản cũ cho an toàn, tạo file mới (ví dụ `tu-truong-dong-dien-2.html`), kiểm tra xong mới đổi `url` và xoá file cũ.

## 4. Thêm chủ đề mới

Thêm một dòng vào mảng `"topics"`:

```js
{"id":"cam-ung-dien-tu","name":"Cảm ứng điện từ","group":2,"hue":200,"desc":"Mô tả ngắn."},
```

`group` là số thứ tự nhóm trong mảng `"groups"` (0 = Cơ học, 1 = Nhiệt học, 2 = Điện và từ, 3 = Quang học, 4 = Vật lý hiện đại). `hue` là màu 0 đến 360. Thứ tự các dòng trong `"topics"` chính là thứ tự trong menu.

## 4b. Quy ước đặt tên (rất quan trọng khi đưa lên máy chủ)

Dấu gạch ngang `-` hoàn toàn an toàn và là quy ước nên dùng cho đường dẫn web (công cụ tìm kiếm coi nó là dấu phân cách từ). Những thứ gây lỗi thật sự là:

| Không dùng | Vì sao |
|---|---|
| Dấu tiếng Việt, ví dụ `từ-trường.html` | Mỗi hệ điều hành, trình duyệt, ứng dụng chat mã hoá khác nhau; liên kết dễ bị hỏng hoặc biến thành chuỗi `%E1%BB%AB…`. Khi tải lên, tên còn có thể bị lỗi như `T__tr__ng.html` |
| Dấu cách | Thành `%20`, dễ cắt đứt liên kết khi chia sẻ |
| Chữ hoa, ví dụ `Con-Lac.html` | Máy chủ Linux phân biệt hoa thường: `Con-Lac` và `con-lac` là hai file khác nhau. Trên Windows/macOS không lỗi, lên máy chủ mới lỗi |
| Gạch dưới `_` | Hợp lệ, nhưng để đồng nhất chỉ dùng `-` |
| Đường dẫn bắt đầu bằng `/` | Hỏng khi đặt trang trong thư mục con (ví dụ `tenmien.vn/vat-ly/`) |

Quy tắc ngắn gọn: **chỉ chữ thường không dấu, số và dấu gạch ngang**. Ngoài ra:

- **Không bao giờ đổi `id`** (của thí nghiệm hoặc chủ đề) sau khi đã công bố, vì người dùng có thể đã lưu hoặc chia sẻ liên kết. Muốn đổi tên hiển thị thì sửa `title` hoặc `name`.
- **Chủ đề không nằm trong đường dẫn.** Chủ đề của thí nghiệm nằm ở `"topic"` trong `danh-muc.js` (xem mục 1).
- Trang bảo trì tự báo mọi chỗ vi phạm các quy tắc trên.

## 4c. Khi đưa lên máy chủ thật

1. **Tải toàn bộ thư mục `vat-ly-ao/`** lên hosting, giữ nguyên cấu trúc. Chạy được cả ở gốc tên miền (`tenmien.vn/`) lẫn trong thư mục con (`tenmien.vn/vat-ly/`) vì mọi đường dẫn đều là tương đối.
2. **Bật HTTPS** (hầu hết hosting đều miễn phí). Một số tính năng của trình duyệt (như sao chép bằng nút bấm) chỉ chạy trên HTTPS.
3. **Sau mỗi lần cập nhật:** đổi số `SITE_V` ở đầu `index.html` nếu đã sửa `css/`, `js/` hoặc `data/`; tăng `"ver"` của thí nghiệm nếu đã sửa thí nghiệm đó. Hai việc này đảm bảo người dùng luôn thấy bản mới.
4. **Mở `index.html#/bao-tri` trên địa chỉ thật** để kiểm tra mọi liên kết (✓ hoặc ✗) trước khi thông báo cho người dùng.
5. **Khi có tên miền chính thức:** mở `index.html`, bỏ chú thích dòng `og:image` và `og:url` rồi điền địa chỉ thật để khi chia sẻ qua Zalo, Facebook có ảnh xem trước.
6. **Sao lưu:** mỗi lần cập nhật lớn, nén cả thư mục thành file zip có ngày trong tên (ví dụ `vat-ly-ao-2026-11-15.zip`).

### Nên làm sớm: không phụ thuộc thư viện bên ngoài

Hiện các thí nghiệm 3D tải thư viện three.js từ `cdnjs.cloudflare.com`, và trang dùng phông chữ từ Google Fonts. Khi có nhiều người dùng, bạn nên tự lưu thư viện trên máy chủ của mình để (a) không phụ thuộc dịch vụ bên ngoài, (b) khoá cố định phiên bản, tránh bị đổi ngầm, (c) vào được cả khi mạng trường chặn CDN. Cách làm: tải file `three.min.js` (phiên bản r128 đang dùng) về, đặt vào thư mục mới `lib/` cạnh `index.html`, rồi trong thí nghiệm đổi thẻ `<script src="https://cdnjs…/three.min.js">` thành `<script src="../../lib/three.min.js">`. Làm một lần, mọi thí nghiệm dùng chung. Trang chủ vẫn hiển thị bình thường nếu Google Fonts không tải được (tự dùng phông hệ thống).

## 5. Kiểm tra lỗi

Mở `index.html#/bao-tri`. Trang này báo trùng id, chủ đề không tồn tại, status sai, thiếu url. Khi trang được mở qua máy chủ web, nó còn kiểm tra file thí nghiệm có thật sự tồn tại hay không (✓ hoặc ✗), đồng thời kiểm tra quy ước đặt tên và hình đại diện còn thiếu.

Nếu trang chủ trắng hoặc báo không đọc được dữ liệu, gần như chắc chắn là `danh-muc.js` bị sai cú pháp (thiếu dấu phẩy, thừa dấu phẩy ở dòng cuối, thiếu dấu nháy). Dán nội dung file vào trình kiểm tra JavaScript hoặc so với dòng mẫu ở trên.

## 6. Hai nút điều hướng trong trang thí nghiệm

Mỗi trang thí nghiệm có hai nút nhỏ nổi ở góc: **← Trang chủ** và **≡ Tên chủ đề** (bấm vào sẽ về danh sách các thí nghiệm cùng chủ đề). Tên chủ đề tự đọc từ `data/danh-muc.js` bằng cách khớp tên file với `id`, nên đổi `"topic"` ở danh mục là hai nút tự cập nhật, không phải sửa trang thí nghiệm.

Để một thí nghiệm có hai nút này, thêm một dòng vào cuối `<body>` của file:

```html
<script src="../data/ve-trang-chu.js" defer></script>
```

Nếu nút che mất nội dung của trang, đổi góc bằng `data-pos`: `<script src="../data/ve-trang-chu.js" data-pos="tl" defer></script>` (`tr` trên phải là mặc định, `tl` trên trái, `br` dưới phải, `bl` dưới trái). Trang có bảng điều khiển bên phải thì đặt hai nút ở góc trên phải của khung mô phỏng (sát bên trái bảng) bằng `data-dx` = bề rộng bảng (px) và `data-bp` = độ rộng màn hình mà dưới đó bảng chuyển xuống dưới: `<script src="../data/ve-trang-chu.js" data-dx="360" data-bp="760" defer></script>`. Trên màn hình nhỏ hai nút tự thu gọn thành biểu tượng. Nếu tên file thí nghiệm không trùng `id` trong danh mục thì chỉ hiện nút Trang chủ, vì vậy nhớ đặt tên file = id.

Cây menu đầy đủ chỉ có ở trang chủ. Trong thí nghiệm không đặt menu để dành chỗ cho khung mô phỏng và bảng điều khiển, nhất là trên điện thoại.

## 7. Ảnh đại diện chủ đề (tuỳ chọn)

Mặc định chủ đề dùng hình SVG vẽ bằng code. Muốn dùng ảnh thật: đặt file vào thư mục `anh/` với tên `chu-de-<id chủ đề>.jpg` (tiền tố `chu-de-` để không trùng ảnh thí nghiệm), rồi thêm `"image": "anh/chu-de-<id>"` (không ghi đuôi file) vào chủ đề trong `data/danh-muc.js`. Ảnh chủ đề hiện ở ô "Duyệt theo chủ đề" của trang chủ, tỉ lệ khung 2:1. Chưa có file ảnh thì tự dùng hình SVG.

Cài đặt `settings`: `hideEmptyTopics` ẩn chủ đề chưa có thí nghiệm khỏi cả menu trái lẫn ô duyệt; `hideEmptyTiles` chỉ ẩn khỏi ô duyệt ở trang chủ (menu trái vẫn đủ). Hiện: menu trái đầy đủ, ô duyệt chỉ hiện chủ đề có thí nghiệm.

## 8. Sửa chữ ở trang chủ

Mở `data/danh-muc.js`, tìm mục `"home"` ở đầu dữ liệu: `title` (tiêu đề lớn), `intro` (dòng mô tả, để `""` thì bỏ), `showStats` (`false` thì bỏ hàng "thí nghiệm sẵn sàng / chủ đề"), `randomTitle`, `shuffleLabel`, `browseTitle`. Mục nào bị xoá sẽ dùng chữ mặc định.

## 9. Giao diện chung của các thí nghiệm

Mọi trang thí nghiệm dùng chung `css/thi-nghiem.css`: khung mô phỏng bên trái (`.stage`), bảng điều khiển bên phải rộng 360px (`.panel`), phông Be Vietnam Pro, màu xanh ngọc, nút, thanh trượt, ô tích, bảng số liệu cùng kiểu, tự đổi sáng/tối theo hệ thống. Muốn đổi giao diện của tất cả thí nghiệm, sửa file này (nhớ tăng số `?v=` ở thẻ `<link>` trong các trang, hoặc đổi `SITE_V` nếu trang chủ).

Trang thí nghiệm mới cần: hai thẻ `<link>` (phông + `../css/thi-nghiem.css?v=1`) trong `<head>`, khung `<div class="app"><div class="stage" id="stage">…</div><aside class="panel">…</aside></div>`, và dòng script điều hướng có `data-dx="360" data-bp="760"`. Việc riêng của trang (màu vẽ cảnh, nhãn nổi...) đặt trong `<style>` của trang đó, viết sau thẻ `<link>`.
