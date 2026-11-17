/* Hai nút nổi trong trang thí nghiệm:  [← Trang chủ]  [≡ Tên chủ đề]
   - "Trang chủ" về trang chủ.
   - Nút chủ đề về danh sách các thí nghiệm cùng chủ đề. Tên chủ đề tự đọc từ data/danh-muc.js
     bằng cách khớp tên file thí nghiệm (thi-nghiem/<id>.html) với id, nên đổi "topic" ở danh mục là tự cập nhật.
   - Không tìm thấy thí nghiệm trong danh mục thì chỉ hiện nút Trang chủ.

   Cách dùng: thêm một dòng vào cuối <body> của trang thí nghiệm:
     <script src="../data/ve-trang-chu.js" defer></script>
   Nếu nút che mất nội dung, chọn góc khác bằng data-pos:
     <script src="../data/ve-trang-chu.js" data-pos="tl" defer></script>
   Giá trị data-pos: tr (trên phải, mặc định), tl (trên trái), br (dưới phải), bl (dưới trái).
   Trang có bảng điều khiển bên phải: để hai nút nằm ở góc trên phải của KHUNG MÔ PHỎNG (sát bên trái bảng),
   thêm data-dx = bề rộng bảng (px) và data-bp = độ rộng màn hình mà dưới đó bảng chuyển xuống dưới (mặc định 760):
     <script src="../data/ve-trang-chu.js" data-dx="360" data-bp="760" defer></script>
   Trên màn hình nhỏ hai nút tự thu gọn thành biểu tượng. */
(function () {
  var s = document.currentScript, base = '';
  try { base = new URL('../', s.src).href; } catch (e) { base = '../'; }
  var pos = (s && s.getAttribute('data-pos')) || 'tr';

  var st = document.createElement('style');
  st.textContent =
    '.vla-nav{position:fixed;z-index:2147483000;display:flex;gap:6px;font:500 13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.vla-nav a{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:99px;text-decoration:none;color:#fff;' +
    'background:rgba(20,27,41,.82);box-shadow:0 2px 10px rgba(0,0,0,.25);backdrop-filter:blur(4px);white-space:nowrap;max-width:46vw}' +
    '.vla-nav a:hover{background:rgba(29,78,216,.95)}' +
    '.vla-nav .t{overflow:hidden;text-overflow:ellipsis}' +
    '@media (max-width:700px){.vla-nav a{padding:0;width:34px;height:34px;justify-content:center}.vla-nav .t{display:none}}';
  document.head.appendChild(st);

  var box = document.createElement('div');
  box.className = 'vla-nav';
  box.setAttribute('role', 'navigation');
  box.setAttribute('aria-label', 'Điều hướng Vật lý ảo');
  box.style[pos.charAt(0) === 'b' ? 'bottom' : 'top'] = '10px';
  var side = pos.charAt(1) === 'l' ? 'left' : 'right';
  var dx = parseInt(s && s.getAttribute('data-dx'), 10) || 0;
  var bp = parseInt(s && s.getAttribute('data-bp'), 10) || 760;
  function place() { box.style[side] = (12 + (window.innerWidth > bp ? dx : 0)) + 'px'; }
  place();
  window.addEventListener('resize', place);

  function add(href, icon, text, label) {
    var a = document.createElement('a');
    a.href = href;
    a.setAttribute('aria-label', label || text);
    a.title = label || text;
    a.innerHTML = '<span aria-hidden="true">' + icon + '</span><span class="t"></span>';
    a.lastChild.textContent = text;
    box.appendChild(a);
    return a;
  }
  add(base + 'index.html', '←', 'Trang chủ', 'Về trang chủ');
  document.body.appendChild(box);

  /* Đọc danh mục để biết thí nghiệm này thuộc chủ đề nào */
  var me = decodeURIComponent(location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
  var d = document.createElement('script');
  d.src = base + 'data/danh-muc.js?t=' + Math.floor(Date.now() / 3600000);
  d.onload = function () {
    var D = window.SITE_DATA; if (!D || !me) return;
    var ex = (D.experiments || []).filter(function (e) { return e.id === me; })[0];
    var tp = ex && (D.topics || []).filter(function (t) { return t.id === ex.topic; })[0];
    if (tp) add(base + 'index.html#/chu-de/' + encodeURIComponent(tp.id), '≡', tp.name, 'Về chủ đề: ' + tp.name);
  };
  document.head.appendChild(d);
})();
