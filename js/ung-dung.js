/* Logic trang chủ: dựng menu, thẻ, tìm kiếm, trang bảo trì.
   Không chứa dữ liệu hay hình vẽ: dữ liệu ở data/danh-muc.js, hình ở data/hinh-dai-dien.js. */
(function(){'use strict';
/* Dữ liệu danh mục nằm ở data/danh-muc.js (đây là file duy nhất cần sửa khi bảo trì) */
var DATA=window.SITE_DATA;
if(!DATA){document.getElementById('view').innerHTML='<div class="empty"><b>Không đọc được data/danh-muc.js</b>Kiểm tra file có tồn tại và đúng đường dẫn không.</div>';return}
var CFG=Object.assign({showSoon:true,hideEmptyTopics:false,hideEmptyTiles:false,randomCount:9,newDays:30},DATA.settings||{});
/* Chữ ở trang chủ: sửa trong data/danh-muc.js, mục "home" (ở đây chỉ là giá trị mặc định) */
var HOME=Object.assign({title:'Khám phá Vật Lý bằng thí nghiệm tương tác',
  intro:'Chọn một chủ đề ở danh mục bên trái, hoặc thử ngay một trong những thí nghiệm được gợi ý ngẫu nhiên bên dưới.',
  showStats:true,randomTitle:'Thí nghiệm ngẫu nhiên',shuffleLabel:'Xáo trộn',browseTitle:'Duyệt theo chủ đề'},DATA.home||{});
var GROUPS=DATA.groups||[],ALL=DATA.experiments||[],TOPICS_ALL=DATA.topics||[];
var topicOf={};TOPICS_ALL.forEach(function(t){topicOf[t.id]=t});
/* Chỉ giữ thứ cần hiển thị: bỏ thí nghiệm "hidden", chủ đề bị ẩn, và (nếu tắt showSoon) cả thẻ "Sắp ra mắt" */
var EXPS=ALL.filter(function(e){var t=topicOf[e.topic];return t&&!t.hidden&&e.status!=='hidden'&&(CFG.showSoon||e.status==='ready')});
var TOPICS=TOPICS_ALL.filter(function(t){return !t.hidden&&(!CFG.hideEmptyTopics||EXPS.some(function(e){return e.topic===t.id}))});
function isNew(e){if(!e.added)return false;var d=(Date.now()-new Date(e.added).getTime())/864e5;return d>=-0.1&&d<=CFG.newDays}

/* ---------- Hình minh hoạ (SVG, tự vẽ, không cần ảnh ngoài) ---------- */
var ICON=window.SITE_ICONS||{};
function svg(name){return '<svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">'+(ICON[name]||ICON['_mac-dinh']||'')+'</svg>'}

/* ---------- Tiện ích ---------- */
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d')}
function expsOf(id){return EXPS.filter(function(e){return e.topic===id})}
/* Ảnh đại diện: "image" có thể ghi KHÔNG đuôi file (trang tự thử .webp .jpg .jpeg .png) hoặc có đuôi.
   Nếu không tìm thấy ảnh thì giữ nguyên hình vẽ SVG bên dưới (không bao giờ để thẻ trống). */
var IMG_EXT=['webp','jpg','jpeg','png'],HAS_EXT=/\.(png|jpe?g|webp|gif|svg|avif)$/i;
function imgTag(base){
  var first=HAS_EXT.test(base)?base:base+'.'+IMG_EXT[0];
  return '<img src="'+esc(first)+'" data-base="'+esc(base)+'" data-i="0" alt="" loading="lazy">';
}
document.addEventListener('error',function(ev){
  var im=ev.target;if(!im||im.tagName!=='IMG'||!im.hasAttribute('data-base'))return;
  var base=im.getAttribute('data-base'),i=parseInt(im.getAttribute('data-i'),10)+1;
  if(HAS_EXT.test(base)||i>=IMG_EXT.length){im.remove();return}
  im.setAttribute('data-i',i);im.src=base+'.'+IMG_EXT[i];
},true);
function ready(e){return e.status==='ready'&&!!e.url}
/* Đường dẫn mở thí nghiệm; có "ver" thì gắn ?v=… để trình duyệt tải bản mới sau khi nâng cấp */
function link(e){return e.url+(e.ver?(e.url.indexOf('?')<0?'?':'&')+'v='+encodeURIComponent(e.ver):'')}
var nReady=EXPS.filter(ready).length;

/* ---------- Dựng giao diện ---------- */
var state={q:'',pick:null};
function card(e){
  var t=topicOf[e.topic],ok=ready(e);
  var pic=ok?svg(e.icon||e.topic)+(e.image?imgTag(e.image):''):'';
  var inner='<div class="thumb'+(ok?'':' empty')+'" style="--h:'+t.hue+'">'+pic+
    '<span class="tag">'+esc(t.name)+'</span>'+
    (ok?(e.tag?'<span class="badge ok">'+esc(e.tag)+'</span>':''):'<span class="badge">Sắp ra mắt</span>')+(isNew(e)&&ok?'<span class="new">Mới</span>':'')+'</div>'+
    '<div class="cbody"><h3>'+esc(e.title)+'</h3><p>'+esc(e.desc)+'</p>'+
    '<div class="go">'+(ok?'Mở thí nghiệm <span>→</span>':'Đang xây dựng')+'</div></div>';
  return ok?'<a class="card" style="--h:'+t.hue+'" href="'+esc(link(e))+'">'+inner+'</a>'
           :'<div class="card soon" style="--h:'+t.hue+'">'+inner+'</div>';
}
function renderNav(route){
  var h='<a class="home" href="#/" '+(route==='home'?'aria-current="page"':'')+'>'+
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>'+
    '<span class="t">Trang chủ</span></a>';
  GROUPS.forEach(function(g,gi){
    var gl=TOPICS.filter(function(t){return t.group===gi});if(!gl.length)return;
    h+='<h2>'+esc(g)+'</h2>';
    gl.forEach(function(t){
      var n=expsOf(t.id).filter(ready).length;
      h+='<a href="#/chu-de/'+t.id+'" style="--h:'+t.hue+'" '+(route===t.id?'aria-current="page"':'')+'>'+
        '<span class="dot"></span><span class="t">'+esc(t.name)+'</span>'+
        '<span class="n'+(n?' on':'')+'" title="'+(n?n+' thí nghiệm sẵn sàng':'Chưa có thí nghiệm sẵn sàng')+'">'+(n||'·')+'</span></a>';
    });
  });
  $('nav').innerHTML=h;
  $('sideFoot').innerHTML='Số màu xanh là số thí nghiệm đã sẵn sàng trong chủ đề.<br><a href="#/bao-tri" style="text-decoration:underline">Bảo trì</a>';
}
function renderHome(){
  if(!state.pick){
    var r=EXPS.filter(ready),s=EXPS.filter(function(e){return !ready(e)});
    state.pick=shuffle(r).concat(shuffle(s)).slice(0,CFG.randomCount).map(function(e){return e.id});
  }
  var byId={};EXPS.forEach(function(e){byId[e.id]=e});
  var stats='<span class="chip"><b>'+nReady+'</b> thí nghiệm sẵn sàng</span>'+
    (EXPS.length-nReady?'<span class="chip"><b>'+(EXPS.length-nReady)+'</b> sắp ra mắt</span>':'')+
    '<span class="chip"><b>'+TOPICS.length+'</b> chủ đề</span>';
  $('topStats').innerHTML=HOME.showStats?stats:'';
  var h='<section class="hero hero-home"><h1>'+esc(HOME.title)+'</h1>'+
    (HOME.intro?'<p>'+esc(HOME.intro)+'</p>':'')+
    (HOME.showStats?'<div class="stats in-hero">'+stats+'</div>':'')+'</section>'+
    '<div class="sec-head"><h2>'+esc(HOME.randomTitle)+'</h2>'+
    '<button class="btn" id="shuf" type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>'+esc(HOME.shuffleLabel)+'</button></div>'+
    '<div class="grid">'+state.pick.map(function(id){return card(byId[id])}).join('')+'</div>';
  $('view').innerHTML=h;
  $('shuf').onclick=function(){state.pick=null;renderHome()};
}
function renderTopic(id){
  var t=topicOf[id];if(!t){location.hash='#/';return}
  var list=expsOf(id).slice().sort(function(a,b){return ready(b)-ready(a)}),n=list.filter(ready).length;
  $('view').innerHTML='<section class="hero" style="--h:'+t.hue+'">'+
    '<div class="crumb"><a href="#/">Trang chủ</a> / '+esc(GROUPS[t.group])+'</div>'+
    '<h1>'+esc(t.name)+'</h1><p>'+esc(t.desc)+'</p>'+
    '<div class="stats"><span class="chip"><b>'+n+'</b> sẵn sàng</span><span class="chip"><b>'+(list.length-n)+'</b> sắp ra mắt</span></div></section>'+
    (list.length?'<div class="grid">'+list.map(card).join('')+'</div>':
     '<div class="empty"><b>Chưa có thí nghiệm nào</b>Chủ đề này đang được xây dựng.</div>');
}
function renderSearch(q){
  var nq=norm(q),res=EXPS.filter(function(e){var t=topicOf[e.topic];return norm(e.title+' '+e.desc+' '+t.name).indexOf(nq)>=0});
  res.sort(function(a,b){return ready(b)-ready(a)});
  $('view').innerHTML='<section class="hero"><h1>Kết quả tìm kiếm</h1><p>'+res.length+' thí nghiệm khớp với “'+esc(q)+'”.</p></section>'+
    (res.length?'<div class="grid">'+res.map(card).join('')+'</div>':
     '<div class="empty"><b>Không tìm thấy</b>Thử từ khoá khác, hoặc chọn một chủ đề ở danh mục bên trái.</div>');
}

/* ---------- Trang bảo trì: mở bằng index.html#/bao-tri ---------- */
function slug(s){return norm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
var OK_ID=/^[a-z0-9]+(-[a-z0-9]+)*$/,OK_URL=/^[a-z0-9][a-z0-9\-\/.]*$/;
var STL={ready:'Hiển thị',soon:'Sắp ra mắt',hidden:'Ẩn'};
function renderMaint(){
  var issues=[],seen={};
  ALL.forEach(function(e){
    var nm='“'+(e.title||e.id||'?')+'”';
    if(!e.id)issues.push('Thiếu id: '+nm);else{if(seen[e.id])issues.push('Trùng id: '+e.id);seen[e.id]=1}
    if(!topicOf[e.topic])issues.push(nm+' trỏ tới chủ đề không tồn tại: '+e.topic);
    if(['ready','soon','hidden'].indexOf(e.status)<0)issues.push(nm+' có status lạ: '+e.status+' (chỉ dùng ready, soon, hidden)');
    if(e.status==='ready'&&!e.url)issues.push(nm+' đặt ready nhưng chưa có url');
    if(e.id&&!OK_ID.test(e.id))issues.push(nm+': id “'+e.id+'” không đúng quy ước (chỉ chữ thường không dấu, số, dấu gạch ngang)');
    if(e.url&&!/^https?:/.test(e.url)&&!OK_URL.test(e.url))issues.push(nm+': đường dẫn “'+e.url+'” có chữ hoa, dấu cách hoặc dấu tiếng Việt, dễ lỗi trên máy chủ Linux');
    if(e.url&&e.id&&e.url!=='thi-nghiem/'+e.id+'.html')issues.push(nm+': đường dẫn nên là thi-nghiem/'+e.id+'.html (tên file trùng id) để dễ quản lý');
    if(e.url&&/^\//.test(e.url))issues.push(nm+': đường dẫn bắt đầu bằng “/” sẽ hỏng khi đặt trang trong thư mục con; hãy dùng đường dẫn tương đối');
    if(e.icon&&!ICON[e.icon])issues.push(nm+' dùng icon “'+e.icon+'” nhưng chưa có hình này trong data/hinh-dai-dien.js');
  });
  TOPICS_ALL.forEach(function(t){if(!OK_ID.test(t.id))issues.push('Chủ đề “'+t.name+'”: id “'+t.id+'” không đúng quy ước đặt tên');if(!ICON[t.id])issues.push('Chủ đề “'+t.name+'” chưa có hình trong data/hinh-dai-dien.js (đang dùng hình mặc định)')});
  var http=/^https?:/.test(location.protocol);
  var rows=ALL.map(function(e,i){
    var t=topicOf[e.topic];
    return '<tr><td>'+esc(e.title||'')+'<br><code>'+esc(e.id||'')+'</code></td><td>'+esc(t?t.name:'? '+e.topic)+'</td>'+
      '<td><span class="st st-'+esc(e.status)+'">'+esc(STL[e.status]||e.status||'?')+'</span></td>'+
      '<td><code>'+esc(e.url||'—')+'</code></td><td id="lk'+i+'">'+(e.url&&e.status!=='hidden'?(http?'…':'<span class="muted">chưa kiểm tra</span>'):'—')+'</td>'+
      '<td id="im'+i+'">'+(e.image?(http?'…':'<span class="muted">chưa kiểm tra</span>'):'<span class="muted">hình vẽ</span>')+'</td></tr>'
  }).join('');
  var topicOpts=TOPICS_ALL.map(function(t){return '<option value="'+esc(t.id)+'">'+esc(t.name)+'</option>'}).join('');
  $('view').innerHTML='<section class="hero"><div class="crumb"><a href="#/">Trang chủ</a> / Bảo trì</div><h1>Bảo trì danh mục</h1>'+
   '<p>Trang này chỉ để bạn kiểm tra và soạn dòng dữ liệu mới. Mọi thay đổi thật sự được lưu trong file <code>data/danh-muc.js</code>.</p></section>'+
   '<div class="sec-head"><h2>Kiểm tra dữ liệu</h2></div>'+
   (issues.length?'<ul class="issues">'+issues.map(function(s){return '<li>'+esc(s)+'</li>'}).join('')+'</ul>':'<p class="okmsg">Không phát hiện lỗi trong dữ liệu.</p>')+
   '<div class="sec-head"><h2>Tất cả thí nghiệm ('+ALL.length+')</h2></div>'+
   '<div class="tablewrap"><table class="mt"><thead><tr><th>Thí nghiệm</th><th>Chủ đề</th><th>Trạng thái</th><th>Đường dẫn</th><th>Liên kết</th><th>Ảnh</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
   (http?'':'<p class="note2">Kiểm tra liên kết tự động chỉ chạy khi trang được mở qua máy chủ web (http/https), không chạy khi mở trực tiếp bằng cách bấm đúp file.</p>')+
   '<div class="sec-head"><h2>Soạn dòng cho thí nghiệm mới</h2></div>'+
   '<form class="gen" id="gen" autocomplete="off">'+
    '<label>Tên thí nghiệm<input id="gTitle" placeholder="Ví dụ: Con lắc đơn"></label>'+
    '<label>Chủ đề<select id="gTopic">'+topicOpts+'</select></label>'+
    '<label class="wide">Mô tả ngắn<input id="gDesc" placeholder="Một câu mô tả"></label>'+
    '<label>Mã thí nghiệm = tên file (chữ thường, không dấu)<input id="gFile" placeholder="con-lac-don"></label>'+
    '<label>Trạng thái<select id="gStatus"><option value="ready">Hiển thị (ready)</option><option value="soon">Sắp ra mắt (soon)</option><option value="hidden">Ẩn (hidden)</option></select></label>'+
   '</form><pre class="snip" id="snip"></pre>'+
   '<button class="btn" id="copy" type="button">Sao chép dòng này</button> <span class="muted" id="copied"></span>'+
   '<p class="note2">Dán dòng vừa sao chép vào cuối mảng <code>"experiments"</code> trong <code>data/danh-muc.js</code> (nhớ có dấu phẩy ngăn cách với dòng trước đó), rồi lưu file và tải lại trang chủ.</p>';
  function snip(){
    var title=$('gTitle').value.trim()||'Tên thí nghiệm',folder=slug($('gFile').value)||slug(title),st=$('gStatus').value;
    var o={id:folder||'ma-thi-nghiem',topic:$('gTopic').value,title:title,desc:$('gDesc').value.trim()||'Mô tả ngắn.',status:st};
    if(st!=='soon'){o.url='thi-nghiem/'+folder+'.html';o.ver='1';o.image='anh/'+folder}
    o.added=new Date().toISOString().slice(0,10);
    $('snip').textContent=JSON.stringify(o)+',';
  }
  $('gen').addEventListener('input',snip);snip();
  $('copy').onclick=function(){var t=$('snip').textContent;
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){$('copied').textContent='Đã sao chép.'},function(){
      var r=document.createRange();r.selectNodeContents($('snip'));var s=getSelection();s.removeAllRanges();s.addRange(r);$('copied').textContent='Hãy nhấn Ctrl+C để sao chép.'})};
  if(http)ALL.forEach(function(e,i){
    if(!e.image)return;
    var list=HAS_EXT.test(e.image)?[e.image]:IMG_EXT.map(function(x){return e.image+'.'+x}),k=0;
    (function next(){fetch(list[k],{method:'HEAD'}).then(function(r){
      if(r.ok){$('im'+i).innerHTML='<span class="good">✓ '+esc(list[k].split('/').pop())+'</span>'}
      else if(++k<list.length)next();else $('im'+i).innerHTML='<span class="muted">chưa có ảnh, đang dùng hình vẽ</span>'},
      function(){$('im'+i).innerHTML='<span class="bad">✗ lỗi</span>'})})();
  });
  if(http)ALL.forEach(function(e,i){
    if(!e.url||e.status==='hidden')return;
    fetch(e.url,{method:'HEAD'}).then(function(r){$('lk'+i).innerHTML=r.ok?'<span class="good">✓ có file</span>':'<span class="bad">✗ không tìm thấy ('+r.status+')</span>'},
      function(){$('lk'+i).innerHTML='<span class="bad">✗ lỗi</span>'})});
}

function route(){
  $('topStats').innerHTML='';
  var m=location.hash.match(/^#\/chu-de\/([\w-]+)/),cur=m?m[1]:'home';
  renderNav(cur);
  if(location.hash==='#/bao-tri'){renderNav('');renderMaint();document.body.classList.remove('menu-open');return}
  if(state.q.trim()){renderSearch(state.q.trim())}
  else if(cur==='home')renderHome();else renderTopic(cur);
  document.body.classList.remove('menu-open');
}
window.addEventListener('hashchange',function(){state.q='';$('q').value='';route();window.scrollTo(0,0)});
$('q').addEventListener('input',function(){state.q=this.value;route()});
$('menuBtn').addEventListener('click',function(){document.body.classList.toggle('menu-open')});
$('scrim').addEventListener('click',function(){document.body.classList.remove('menu-open')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')document.body.classList.remove('menu-open')});
$('themeBtn').addEventListener('click',function(){
  var r=document.documentElement,dark=r.getAttribute('data-theme')?r.getAttribute('data-theme')==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  r.setAttribute('data-theme',dark?'light':'dark');
});
route();
})();
