
// Expand the mobile navigation at the top; compact it after the reader scrolls.
(()=>{let scheduled=false;const update=()=>{document.body.classList.toggle('nav-compact',window.scrollY>48);scheduled=false;};window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;window.requestAnimationFrame(update);}}, {passive:true});update();})();
/* HALCYON front-end. Secrets are never shipped in this file. */
const STORAGE_THEME = 'halcyon-theme';
const body = document.body;
const root = document.documentElement;
const iconSun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>';
const iconMoon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 15.4A8.2 8.2 0 0 1 8.6 3.7 8.3 8.3 0 1 0 20.3 15.4Z"/></svg>';
let userChoseTheme = false;
function applyTheme(theme, save = false) {
  const next = theme === 'dark' ? 'dark' : 'light';
  body.dataset.theme = next;
  root.dataset.theme = next;
  root.style.colorScheme = next;
  document.querySelectorAll('#theme-toggle,#article-theme-toggle').forEach(button => {
    button.innerHTML = next === 'dark' ? iconSun : iconMoon;
    button.setAttribute('aria-label', next === 'dark' ? '切换浅色主题' : '切换深色主题');
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = next === 'dark' ? '#121212' : '#fbfbfa';
  if (save) { try { localStorage.setItem(STORAGE_THEME, next); userChoseTheme = true; } catch {} }
}
try {
  const savedTheme = localStorage.getItem(STORAGE_THEME);
  applyTheme(savedTheme || 'light');
  userChoseTheme = Boolean(savedTheme);
} catch { applyTheme('light'); }
document.querySelectorAll('#theme-toggle,#article-theme-toggle').forEach(button => button.addEventListener('click', () => applyTheme(body.dataset.theme === 'dark' ? 'light' : 'dark', true)));
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { if (!userChoseTheme) applyTheme(event.matches ? 'dark' : 'light'); }); } catch {}

/* Source SVG from the provided clawd-home-scroll.html; animation names remain source-compatible. */
const CLAWD_BASE = "\n      \n      <ellipse class=\"sh\" cx=\"180\" cy=\"249\" rx=\"78\" ry=\"7\"/>\n      <g class=\"all\"><g transform=\"translate(68 100) scale(1.6)\"><g class=\"br\">\n        <rect class=\"f\" x=\"35\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"f\" x=\"50\" y=\"70\" width=\"10\" height=\"20\"/>\n        <rect class=\"f\" x=\"80\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"f\" x=\"95\" y=\"70\" width=\"10\" height=\"20\"/>\n        <g transform=\"translate(20 35)\"><g class=\"al\"><rect class=\"f\" x=\"-20\" y=\"-10\" width=\"20\" height=\"20\"/></g></g>\n        <g transform=\"translate(120 35)\"><g class=\"ar\"><rect class=\"f\" x=\"0\" y=\"-10\" width=\"20\" height=\"20\"/></g></g>\n        <rect class=\"f\" x=\"20\" y=\"0\" width=\"100\" height=\"70\"/>\n        <rect class=\"e ey\" x=\"45\" y=\"20\" width=\"10\" height=\"20\"/><rect class=\"e ey\" x=\"85\" y=\"20\" width=\"10\" height=\"20\"/>\n      </g></g></g>\n      <g class=\"bub\"><path class=\"bubb\" d=\"M272 50H326a10 10 0 0 1 10 10V86a10 10 0 0 1-10 10H292L276 112 278 96H272a10 10 0 0 1-10-10V60a10 10 0 0 1 10-10Z\"/><circle class=\"bd\" style=\"animation-delay:0s\" cx=\"286\" cy=\"73\" r=\"4.5\"/><circle class=\"bd\" style=\"animation-delay:0.15s\" cx=\"299\" cy=\"73\" r=\"4.5\"/><circle class=\"bd\" style=\"animation-delay:0.3s\" cx=\"312\" cy=\"73\" r=\"4.5\"/></g>\n      <g class=\"dzw\"><g transform=\"translate(180 92) scale(1 .3)\"><g class=\"dz\">\n        <g transform=\"translate(90 0)\"><use class=\"st\" href=\"#s4\" transform=\"scale(1.6)\"/></g>\n        <g transform=\"translate(-45 78)\"><use class=\"st\" href=\"#s4\" transform=\"scale(1.6)\"/></g>\n        <g transform=\"translate(-45 -78)\"><use class=\"st\" href=\"#s4\" transform=\"scale(1.6)\"/></g>\n      </g></g></g>\n      <g fill=\"#e5586e\">\n        <g transform=\"translate(130 92) scale(1.5)\"><path class=\"hr\" style=\"--w:0s\" d=\"M0 8C-14-2-10-14 0-6 10-14 14-2 0 8Z\"/></g>\n        <g transform=\"translate(180 84) scale(1.8)\"><path class=\"hr\" style=\"--w:.2s\" d=\"M0 8C-14-2-10-14 0-6 10-14 14-2 0 8Z\"/></g>\n        <g transform=\"translate(230 92) scale(1.5)\"><path class=\"hr\" style=\"--w:.4s\" d=\"M0 8C-14-2-10-14 0-6 10-14 14-2 0 8Z\"/></g>\n      </g>\n      <g transform=\"translate(250 84) scale(1)\"><path class=\"zz\" style=\"--w:0s\" d=\"M0 0H12L0 14H12\"/></g><g transform=\"translate(268 68) scale(1.15)\"><path class=\"zz\" style=\"--w:0.3s\" d=\"M0 0H12L0 14H12\"/></g><g transform=\"translate(288 50) scale(1.3)\"><path class=\"zz\" style=\"--w:0.6s\" d=\"M0 0H12L0 14H12\"/></g>\n      <g transform=\"translate(276 100)\"><g class=\"bg\"><rect x=\"-4\" y=\"-34\" width=\"8\" height=\"24\" rx=\"3\"/><circle r=\"4.5\"/></g></g>\n      <g class=\"cfg\"></g>\n    ";
const CONFETTI = Array.from({length:14}, (_,i) => {
  const colors = ['#d97757','#6a9bcc','#788c5d','#e5586e','#c9a227'];
  const angle = (-170 + i * (160 / 13)) * Math.PI / 180;
  const radius = 90 + (i % 4) * 22;
  return `<rect class="cf" x="176" y="120" width="8" height="5" rx="1" fill="${colors[i%colors.length]}" style="--x:${Math.round(Math.cos(angle)*radius)}px;--y:${Math.round(Math.sin(angle)*radius+34)}px"/>`;
}).join('');
function clawdSvg() { return `<svg class="clawd-art" viewBox="0 0 360 300" role="img" aria-label="Clawd" tabindex="-1">${CLAWD_BASE.replace('<g class="cfg"></g>', `<g>${CONFETTI}</g>`)}</svg>`; }
const homeMount = document.getElementById('home-clawd');
homeMount.innerHTML = clawdSvg();
const ACTIONS = [['wave',1.3],['jump',1],['spin',1.2],['flip',1.1],['dance',1.4],['dizzy',1.4],['love',1.4],['sleep',1.7],['wow',1.1],['nope',1],['tada',1.3]];
let deck = [], nextAction = 0, currentTimer = 0, idleTimer = 0;
function reshuffle() { deck = [...ACTIONS.keys()]; for (let i=deck.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; } nextAction = 0; }
function playOn(mount, name, duration, done) {
  if (!mount) { done?.(); return; }
  window.clearTimeout(mount._clawdTimer);
  const svg = mount.querySelector('svg');
  if (!svg) { done?.(); return; }
  svg.removeAttribute('data-a'); void svg.getBoundingClientRect(); svg.style.setProperty('--d', `${duration}s`); svg.setAttribute('data-a', name);
  mount._clawdTimer = window.setTimeout(() => { svg.removeAttribute('data-a'); done?.(); }, duration * 1000 + 70);
}
const homeMascotHint=document.getElementById('clawd-interaction-hint');
const ACTION_LABELS={wave:'挥手',jump:'跳起来',spin:'转圈',flip:'翻跟头',dance:'跳舞',dizzy:'转晕了',love:'比心',sleep:'打瞌睡',wow:'惊讶',nope:'摇头',tada:'撒彩纸'};
let homeActionLabelTimer=0;
function playNextHomeAction() {
  window.clearTimeout(idleTimer);
  if (nextAction >= deck.length) reshuffle();
  const [name, duration] = ACTIONS[deck[nextAction++]];
  playOn(homeMount, name, duration);
  if(homeMascotHint){homeMascotHint.textContent=`Clawd 正在${ACTION_LABELS[name]}；再点一次试试`;
    window.clearTimeout(homeActionLabelTimer);
    homeActionLabelTimer=window.setTimeout(()=>{homeMascotHint.textContent='点一下 Clawd，看看它会做什么';},duration*1000+120);}
}
function resetHomeIdle() { window.clearTimeout(idleTimer); idleTimer = window.setTimeout(() => { playNextHomeAction(); resetHomeIdle(); }, 11000); }
reshuffle();
homeMount.setAttribute('aria-describedby','clawd-interaction-hint');
resetHomeIdle();
homeMount.addEventListener('click', () => { playNextHomeAction(); resetHomeIdle(); });
homeMount.addEventListener('pointerdown',()=>homeMount.classList.add('is-pointer-active'));
['pointerup','pointercancel','pointerleave'].forEach(type=>homeMount.addEventListener(type,()=>homeMount.classList.remove('is-pointer-active')));
homeMount.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playNextHomeAction(); resetHomeIdle(); } });

const backToTop = document.getElementById('back-to-top');
let backHideTimer=0, backPinned=false;
function updateTopButton() {
  const y = window.scrollY; backToTop.classList.toggle('at-top', y < 12);
  if (y > 500) { backToTop.classList.add('visible'); window.clearTimeout(backHideTimer); backHideTimer=window.setTimeout(()=>{if(!backPinned)backToTop.classList.remove('visible');},2000); }
  else { backToTop.classList.remove('visible'); window.clearTimeout(backHideTimer); }
}
window.addEventListener('scroll', updateTopButton, {passive:true});
['mouseenter','touchstart','focusin'].forEach(evt=>backToTop.addEventListener(evt,()=>{backPinned=true;backToTop.classList.add('visible');window.clearTimeout(backHideTimer)}));
['mouseleave','touchend','focusout'].forEach(evt=>backToTop.addEventListener(evt,()=>{backPinned=false;updateTopButton()}));
backToTop.addEventListener('click',()=>{
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { window.scrollTo(0,0); return; }
  const start=window.scrollY, began=performance.now(), duration=600;
  const tick=now=>{const p=Math.min(1,(now-began)/duration),e=1-Math.pow(1-p,3);window.scrollTo(0,start*(1-e));if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);
});

const postGrid=document.getElementById('post-grid'), collectionArt=document.getElementById('collection-art'), postStatus=document.getElementById('post-status');
const categoryFilter=document.getElementById('category-filter');
const postSearch=document.getElementById('post-search'), postSearchInput=document.getElementById('post-search-input'), postSearchClear=document.getElementById('post-search-clear'), postSearchStatus=document.getElementById('post-search-status');
let lastPostsRefresh=0;
let posts=[], activeCategory='', activeSearch='', postsApiHealthy=true;
const sectionLinks=[...document.querySelectorAll('[data-nav]')];
const menuToggle=document.getElementById('menu-toggle');
const menuPanel=document.getElementById('menu-panel');
function closeMenu(){if(menuPanel){menuPanel.hidden=true;}if(menuToggle){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','打开导航菜单');}}
menuToggle?.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'关闭导航菜单':'打开导航菜单');if(menuPanel)menuPanel.hidden=!open;});
menuPanel?.querySelectorAll('a,button').forEach(item=>item.addEventListener('click',()=>closeMenu()));
document.addEventListener('click',event=>{if(menuPanel&&!menuPanel.hidden&&!event.target.closest('.site-header'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
function updateSiteStats(){
  const visible=posts.filter(post=>post.published===true);
  const categories=new Set(visible.map(post=>String(post.category||'').trim()).filter(Boolean));
  const postCount=document.getElementById('stat-post-count');
  const categoryCount=document.getElementById('stat-category-count');
  if(postCount)postCount.textContent=String(visible.length);
  if(categoryCount)categoryCount.textContent=String(categories.size);
}

function markActiveSection(id){sectionLinks.forEach(link=>link.classList.toggle('is-active',link.dataset.nav===id));}
const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)markActiveSection(visible.target.id);},{rootMargin:'-20% 0px -60% 0px',threshold:[0,.2,.45,.7]});
['home','posts','about'].forEach(id=>{const el=document.getElementById(id);if(el)sectionObserver.observe(el)});
function scrollToSection(id){const target=document.getElementById(id);if(!target)return;target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});history.replaceState(null,'',`#${id}`);markActiveSection(id);}
function showCategoryFilter(event){event.preventDefault();if(categoryFilter){categoryFilter.hidden=false;renderCategories();}scrollToSection('posts');}
document.querySelectorAll('[data-category-entry]').forEach(link=>link.addEventListener('click',showCategoryFilter));
document.querySelectorAll('.menu-link').forEach(link=>link.addEventListener('click',event=>{if(link.hasAttribute('data-category-entry'))return;const id=link.dataset.nav;if(!id)return;event.preventDefault();scrollToSection(id);}));
const searchEntry=document.querySelector('[data-search-entry]');
searchEntry?.addEventListener('click',event=>{event.preventDefault();const target=document.getElementById('posts');target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});history.replaceState(null,'','#posts');markActiveSection('posts');postSearch.hidden=false;window.setTimeout(()=>postSearchInput?.focus({preventScroll:true}),220);});
postSearchInput?.addEventListener('input',()=>{activeSearch=postSearchInput.value.trim();renderPosts();});
postSearchClear?.addEventListener('click',()=>{activeSearch='';if(postSearchInput)postSearchInput.value='';renderPosts();postSearchInput?.focus({preventScroll:true});});
function formatDate(value){
  if(!value)return '';
  const raw=String(value).trim();
  // Article front matter uses YYYY-MM-DD calendar dates, not UTC instants.
  // Parse date-only values in local time so America/Los_Angeles never shifts them back a day.
  const dateOnly=raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date=dateOnly?new Date(Number(dateOnly[1]),Number(dateOnly[2])-1,Number(dateOnly[3])):new Date(raw);
  if(Number.isNaN(date.getTime()))return '';
  return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric'}).format(date);
}
function renderPostCard(post,index){const card=document.createElement('button');card.type='button';card.className='post-card';card.setAttribute('aria-label',post.title||'打开文章');const excerpt=String(post.excerpt||post.content||'').replace(/[#*`>_]/g,' ').replace(/\s+/g,' ').trim().slice(0,150);const date=formatDate(post.publishedAt||post.updatedAt||post.createdAt);const category=String(post.category||'').trim();card.innerHTML=`<span class="post-card-top">${category?`<span class="post-card-category">${escapeHTML(category)}</span>`:''}<time class="post-card-date">${escapeHTML(date)}</time></span><strong class="post-card-title">${escapeHTML(post.title||'')}</strong>${excerpt?`<span class="post-card-excerpt">${escapeHTML(excerpt)}${excerpt.length>=150?'…':''}</span>`:''}`;card.addEventListener('click',()=>openArticle(post.slug));return card;}
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function renderPosts(){postGrid.replaceChildren();const query=activeSearch.toLocaleLowerCase('zh-CN');const shown=posts.filter(p=>p.published&&(!activeCategory||String(p.category||'').trim()===activeCategory)&&(!query||`${p.title||''} ${p.excerpt||''} ${p.category||''} ${(p.tags||[]).join(' ')} ${p.content||''}`.toLocaleLowerCase('zh-CN').includes(query)));shown.forEach((post,index)=>postGrid.appendChild(renderPostCard(post,index)));if(collectionArt)collectionArt.classList.toggle('is-hidden',shown.length>0);postStatus.replaceChildren();postStatus.hidden=shown.length>0;if(!shown.length){if(activeSearch){postStatus.textContent='没有找到匹配的文章，请换一个关键词。';postStatus.hidden=false;}else if(!postsApiHealthy){const text=document.createElement('span');text.textContent='内容暂时无法加载。';const retry=document.createElement('button');retry.type='button';retry.className='status-retry';retry.textContent='重新加载';retry.addEventListener('click',()=>loadPosts());postStatus.append(text,retry);postStatus.hidden=false;}else{postStatus.textContent=activeCategory?'这个分类下还没有文章。':'这里还没有文章。等你写下第一篇，内容就会出现在这里。';postStatus.hidden=false;}}if(postSearchStatus){postSearchStatus.hidden=!activeSearch;postSearchStatus.textContent=activeSearch?`找到 ${shown.length} 篇文章`:'';}}
function renderCategories(){
  if(!categoryFilter)return;
  categoryFilter.replaceChildren();
  const categories=[...new Set(posts.filter(p=>p.published).map(p=>String(p.category||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
  const addButton=(label,value)=>{
    const button=document.createElement('button');button.type='button';button.className='category-chip'+(activeCategory===value?' is-active':'');button.textContent=label;button.setAttribute('aria-pressed',String(activeCategory===value));
    button.addEventListener('click',()=>{activeCategory=value;renderCategories();renderPosts();});
    categoryFilter.appendChild(button);
  };
  if(!categories.length){const message=document.createElement('p');message.className='category-empty';message.textContent='还没有分类。给文章填写 category 字段后，这里会自动整理。';categoryFilter.appendChild(message);return;}
  addButton('全部文章','');
  categories.forEach(category=>addButton(category,category));
}
async function loadPosts(options={}){
  try{
    const controller=new AbortController();
    const timeout=window.setTimeout(()=>controller.abort(),8000);
    let response;
    try{response=await fetch('/data/posts.json',{headers:{'Accept':'application/json'},signal:controller.signal,cache:'no-store'});}
    finally{window.clearTimeout(timeout);}
    if(!response.ok)throw new Error(`文章列表加载失败（${response.status}）`);
    const payload=await response.json();
    posts=Array.isArray(payload.posts)?payload.posts.filter(post=>post&&post.published===true&&post.title&&post.slug&&typeof post.content==='string'):[];
    postsApiHealthy=true;
  }catch(error){
    posts=[];postsApiHealthy=false;
    if(!options.quiet)console.warn('HALCYON article index could not be loaded:',error?.message||error);
  }
  lastPostsRefresh=Date.now();
  renderPosts();renderCategories();updateSiteStats();
  return postsApiHealthy;
}
// Refresh published articles when a visitor returns to the tab and every minute while visible.
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'&&Date.now()-lastPostsRefresh>15000)loadPosts({quiet:true});
});
window.setInterval(()=>{
  if(document.visibilityState==='visible')loadPosts({quiet:true});
},60000);

function markdownToSafeHTML(markdown){
  const esc=escapeHTML(String(markdown||'').replace(/\r\n?/g,'\n'));
  const lines=esc.split('\n'),out=[];let paragraph=[],list=[],code=false,codeLines=[];
  const flushP=()=>{if(paragraph.length){out.push(`<p>${paragraph.join('<br>')}</p>`);paragraph=[];}};
  const flushList=()=>{if(list.length){out.push('<ul>'+list.map(x=>`<li>${inlineMarkdown(x)}</li>`).join('')+'</ul>');list=[];}};
  const inlineMarkdown=s=>s.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" rel="nofollow noopener noreferrer" target="_blank">$1</a>');
  for(const line of lines){if(line.startsWith('```')){flushP();flushList();if(code){out.push(`<pre><code>${codeLines.join('\n')}</code></pre>`);codeLines=[];code=false;}else code=true;continue;}if(code){codeLines.push(line);continue;}if(!line.trim()){flushP();flushList();continue;}if(/^#{1,3}\s/.test(line)){flushP();flushList();const n=line.match(/^#+/)[0].length;out.push(`<h${n}>${inlineMarkdown(line.replace(/^#{1,3}\s/,''))}</h${n}>`);continue;}if(/^&gt;\s?/.test(line)){flushP();flushList();out.push(`<blockquote>${inlineMarkdown(line.replace(/^&gt;\s?/,''))}</blockquote>`);continue;}if(/^[-*]\s/.test(line)){flushP();list.push(line.replace(/^[-*]\s/,''));continue;}flushList();paragraph.push(inlineMarkdown(line));}
  flushP();flushList();if(codeLines.length)out.push(`<pre><code>${codeLines.join('\n')}</code></pre>`);return out.join('\n');
}
const articleLayer=document.getElementById('article-layer'),articlePage=document.getElementById('article-page'),articleInner=document.getElementById('article-inner');
const twikooContainer=document.getElementById('twikoo-container');
const commentSection=document.getElementById('comment-section');
let currentPost=null, twikooLoadId=0;
function closeArticle(){articleRequestId++;twikooLoadId++;articleLayer.classList.remove('is-open');articleLayer.setAttribute('aria-hidden','true');body.style.overflow='';commentSection.hidden=true;clearCommentSubmitState(false);window.setTimeout(()=>{if(!articleLayer.classList.contains('is-open')){twikooContainer.replaceChildren();articleLayer.hidden=true;}},650);}
let articleRequestId=0;
async function openArticle(slug,{retry=false}={}){
  const listedPost=posts.find(p=>p.slug===slug&&p.published);
  if(!listedPost)return;
  const requestId=++articleRequestId;
  currentPost=listedPost;
  const alreadyOpen=articleLayer.classList.contains('is-open');
  articleLayer.hidden=false;
  articleLayer.classList.add('is-open');
  articleLayer.setAttribute('aria-hidden','false');
  articleLayer.scrollTop=0;
  articlePage.focus({preventScroll:true});
  body.style.overflow='hidden';
  if(!alreadyOpen&&!retry)history.pushState({article:slug},'',`#article/${encodeURIComponent(slug)}`);
  articleInner.replaceChildren();
  commentSection.hidden=true;
  const loading=document.createElement('div');
  loading.className='article-load-state';
  loading.textContent='正在加载文章…';
  articleInner.appendChild(loading);
  twikooContainer.replaceChildren();
  try{
    let post=null;
    if(typeof listedPost.content==='string')post=listedPost;
    else throw new Error('文章正文缺失，请重新构建网站。');
    if(requestId!==articleRequestId||!articleLayer.classList.contains('is-open'))return;
    currentPost=post;
    articleInner.innerHTML=`<div class="article-kicker">${formatDate(post.publishedAt||post.updatedAt||post.createdAt)||'HALCYON · 文章'}</div><h1 class="article-title">${escapeHTML(post.title)}</h1><div class="article-body">${markdownToSafeHTML(post.content)}</div>`;
    commentSection.hidden=false;
    startComments(post);
  }catch(error){
    if(requestId!==articleRequestId||!articleLayer.classList.contains('is-open'))return;
    const state=document.createElement('div');
    state.className='article-load-state article-load-error';
    state.textContent='文章暂时无法加载，请检查网络后重试。';
    const retryButton=document.createElement('button');
    retryButton.type='button';
    retryButton.className='status-retry';
    retryButton.textContent='重新加载';
    retryButton.addEventListener('click',()=>openArticle(slug,{retry:true}));
    articleInner.replaceChildren(state,retryButton);
    twikooContainer.replaceChildren();
    console.error('HALCYON article load failed:',error);
  }
}
document.getElementById('article-back').addEventListener('click',()=>{if(history.state?.article)history.back();else{closeArticle();window.scrollTo({top:document.getElementById('posts').offsetTop,behavior:'smooth'});}});
window.addEventListener('popstate',()=>{if(articleLayer.classList.contains('is-open'))closeArticle();});
let twikooScriptPromise=null;
const TWIKOO_SCRIPT_URLS=[
  'https://cdn.jsdelivr.net/npm/twikoo@2.0.15/dist/twikoo.min.js',
  'https://unpkg.com/twikoo@2.0.15/dist/twikoo.min.js'
];
function loadTwikooLibrary(){
  if(window.twikoo)return Promise.resolve(window.twikoo);
  if(twikooScriptPromise)return twikooScriptPromise;
  twikooScriptPromise=(async()=>{
    let lastError;
    for(const src of TWIKOO_SCRIPT_URLS){
      try{
        await new Promise((resolve,reject)=>{
          const script=document.createElement('script');
          script.src=src;script.async=true;script.crossOrigin='anonymous';
          script.onload=()=>window.twikoo?resolve():reject(new Error('Twikoo library did not initialize'));
          script.onerror=()=>{script.remove();reject(new Error('Twikoo library failed to load'));};
          document.head.appendChild(script);
        });
        if(window.twikoo)return window.twikoo;
      }catch(error){lastError=error;}
    }
    throw lastError||new Error('Twikoo library unavailable');
  })().catch(error=>{twikooScriptPromise=null;throw error;});
  return twikooScriptPromise;
}
function commentStatus(message,retry=false){
  twikooContainer.replaceChildren();
  const state=document.createElement('div');state.className='comment-service-state';state.textContent=message;
  twikooContainer.appendChild(state);
  if(retry){const button=document.createElement('button');button.type='button';button.className='status-retry';button.textContent='重新连接';button.addEventListener('click',()=>startComments(currentPost));twikooContainer.appendChild(button);}
}
function startComments(post){
  const callId=++twikooLoadId;currentPost=post;twikooContainer.replaceChildren();
  clearCommentSubmitState(false);
  commentStatus('正在连接评论服务…');
  loadTwikooLibrary().then(()=>{if(callId===twikooLoadId)initComments(post,callId);}).catch(error=>{
    console.error('Twikoo library failed to load:',error);
    if(callId===twikooLoadId)commentStatus('评论服务暂时无法连接。',true);
  });
}
function initComments(post,callId){
  if(callId!==twikooLoadId||!window.twikoo)return;
  twikooContainer.replaceChildren();
  try{
    const ready=window.twikoo.init({
      envId:`${location.origin}/api/twikoo`,
      el:'#twikoo-container',
      path:`/posts/${post.slug}`,
      lang:'zh-CN',
      onCommentLoaded:()=>{if(callId===twikooLoadId)finishCommentSubmit()},
    });
    Promise.resolve(ready).then(()=>{
      if(callId===twikooLoadId)observeCommentSubmit();
    }).catch(error=>{
      console.error('Twikoo initialization failed:',error);
      if(callId===twikooLoadId)commentStatus('评论服务初始化失败。',true);
    });
  }catch(error){
    console.error('Twikoo initialization failed:',error);
    if(callId===twikooLoadId)commentStatus('评论服务初始化失败。',true);
  }
}

/* The supplied comment mascot SVGs retain their original accent colors and motion. */
const SD="<svg class=\"raw\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 300\" role=\"img\" aria-label=\"Clawd \u6b63\u5728\u53d1\u9001\u8bc4\u8bba\uff1a\u6298\u7eb8\u98de\u673a\u5e76\u6254\u51fa\u53bb\"><style>\n.clawd-send-fill{fill:var(--clawd-body,#D97757)}\n.clawd-send-eye{fill:var(--clawd-eye,#1F1E1D)}\n.clawd-send-blink{transform-box:fill-box;transform-origin:center;animation:clawd-send-blink 4.6s infinite}\n@keyframes clawd-send-blink{0%,89%,95%,100%{transform:scaleY(1)}92%{transform:scaleY(.1)}}\n\n.clawd-send-shadow{fill:var(--clawd-muted,#8A8272);opacity:.28}\n.clawd-send-tilt{transform-box:fill-box;transform-origin:50% 100%;animation:clawd-send-tilt 4.5s ease-in-out infinite}\n@keyframes clawd-send-tilt{0%,10%{transform:rotate(0)}30%{transform:rotate(-3.5deg)}39%{transform:rotate(3deg)}55%,100%{transform:rotate(0)}}\n.clawd-send-breathe{transform-box:fill-box;transform-origin:50% 100%;animation:clawd-send-breathe 2.2s ease-in-out infinite}\n@keyframes clawd-send-breathe{0%,100%{transform:scale(1.008,.99)}50%{transform:scale(.992,1.01)}}\n.clawd-send-throw{animation:clawd-send-throw 4.5s infinite}\n@keyframes clawd-send-throw{0%{transform:rotate(-10deg)}8%{transform:rotate(-10deg);animation-timing-function:ease-in-out}30%{transform:rotate(45deg);animation-timing-function:linear}38%{transform:rotate(-55deg);animation-timing-function:ease-out}50%,100%{transform:rotate(-10deg)}}\n.clawd-send-lcounter{animation:clawd-send-lcounter 4.5s ease-in-out infinite}\n@keyframes clawd-send-lcounter{0%,10%{transform:rotate(0)}30%{transform:rotate(22deg)}40%{transform:rotate(-8deg)}55%,100%{transform:rotate(0)}}\n.clawd-send-look{animation:clawd-send-look 4.5s ease-in-out infinite}\n@keyframes clawd-send-look{0%,8%{transform:translate(0,0)}14%,30%{transform:translate(4px,3px)}40%,72%{transform:translate(6px,-7px)}88%,100%{transform:translate(0,0)}}\n.clawd-send-handplane{transform-box:fill-box;transform-origin:center;animation:clawd-send-pop 4.5s ease-out infinite;opacity:1}\n@keyframes clawd-send-pop{0%,2%{opacity:0;transform:scale(.2)}8%{opacity:1;transform:scale(1.15)}11%,37%{opacity:1;transform:scale(1)}37.1%,100%{opacity:0;transform:scale(1)}}\n.clawd-send-paper{fill:var(--clawd-paper,#FFFAF0);stroke:#3D3929;stroke-width:1.4;stroke-linejoin:round}\n.clawd-send-paper2{fill:#E6D9BF;stroke:#3D3929;stroke-width:1.4;stroke-linejoin:round}\n.clawd-send-fly{opacity:0;animation:clawd-send-fly 4.5s linear infinite}\n@keyframes clawd-send-fly{0%,36.9%{transform:translate(232.8px,140.9px) rotate(-42deg) scale(1.56);opacity:0}37.00%{transform:translate(232.8px,140.9px) rotate(-57.9deg) scale(1.56);opacity:1.00}40.21%{transform:translate(245.0px,124.8px) rotate(-47.5deg) scale(1.50);opacity:1.00}43.43%{transform:translate(256.8px,113.8px) rotate(-38.1deg) scale(1.45);opacity:1.00}46.64%{transform:translate(268.4px,105.7px) rotate(-32.5deg) scale(1.39);opacity:1.00}49.86%{transform:translate(279.7px,98.8px) rotate(-31.4deg) scale(1.34);opacity:1.00}53.07%{transform:translate(290.6px,91.9px) rotate(-33.6deg) scale(1.28);opacity:1.00}56.29%{transform:translate(301.1px,84.4px) rotate(-37.7deg) scale(1.23);opacity:1.00}59.50%{transform:translate(311.0px,76.0px) rotate(-42.4deg) scale(1.17);opacity:1.00}62.71%{transform:translate(320.3px,66.9px) rotate(-46.8deg) scale(1.11);opacity:1.00}65.93%{transform:translate(328.7px,57.3px) rotate(-50.5deg) scale(1.06);opacity:1.00}69.14%{transform:translate(336.2px,47.8px) rotate(-53.5deg) scale(1.00);opacity:1.00}72.36%{transform:translate(342.4px,38.9px) rotate(-55.8deg) scale(0.95);opacity:0.97}75.57%{transform:translate(347.3px,31.5px) rotate(-57.4deg) scale(0.89);opacity:0.65}78.79%{transform:translate(350.7px,26.2px) rotate(-58.4deg) scale(0.84);opacity:0.32}82.00%{transform:translate(352.0px,24.0px) rotate(-58.8deg) scale(0.78);opacity:0.00}100%{opacity:0}}\n.clawd-send-reveal{fill:none;stroke:#fff;stroke-width:12;stroke-dasharray:100;stroke-dashoffset:100;animation:clawd-send-reveal 4.5s linear infinite}\n@keyframes clawd-send-reveal{0%,36.9%{stroke-dashoffset:100}37.00%{stroke-dashoffset:100.0}40.21%{stroke-dashoffset:88.0}43.43%{stroke-dashoffset:78.7}46.64%{stroke-dashoffset:70.3}49.86%{stroke-dashoffset:62.2}53.07%{stroke-dashoffset:54.5}56.29%{stroke-dashoffset:47.0}59.50%{stroke-dashoffset:39.1}62.71%{stroke-dashoffset:31.9}65.93%{stroke-dashoffset:23.8}69.14%{stroke-dashoffset:16.9}72.36%{stroke-dashoffset:10.1}75.57%{stroke-dashoffset:5.2}78.79%{stroke-dashoffset:1.8}82.00%{stroke-dashoffset:0.0}100%{stroke-dashoffset:0}}\n.clawd-send-trail{fill:none;stroke:var(--clawd-body,#D97757);stroke-width:3;stroke-linecap:round;stroke-dasharray:.1 9;opacity:.8;animation:clawd-send-trailfade 4.5s linear infinite}\n@keyframes clawd-send-trailfade{0%,82%{opacity:.8}96%,100%{opacity:0}}\n.clawd-send-typing{opacity:0;animation:clawd-send-typing 4.5s ease-out infinite;transform-box:fill-box;transform-origin:50% 100%}\n@keyframes clawd-send-typing{0%,3%{opacity:0;transform:scale(.6)}8%,31%{opacity:1;transform:scale(1)}36%,100%{opacity:0;transform:scale(.8)}}\n.clawd-send-bubble-box{fill:var(--clawd-bubble,#fff);stroke:#3D3929;stroke-width:2.5;stroke-linejoin:round}\n.clawd-send-dot{fill:#3D3929;animation:clawd-send-dot .9s ease-in-out infinite}\n@keyframes clawd-send-dot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}\n@media (prefers-reduced-motion: reduce){*{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important}}</style><ellipse class=\"clawd-send-shadow\" cx=\"141\" cy=\"245\" rx=\"76\" ry=\"7\"/><defs><mask id=\"clawd-send-mask\"><path class=\"clawd-send-reveal\" pathLength=\"100\" d=\"M233 141 C265 90 300 110 352 24\"/></mask></defs><path class=\"clawd-send-trail\" mask=\"url(#clawd-send-mask)\" d=\"M233 141 C265 90 300 110 352 24\"/><g transform=\"translate(50 120) scale(1.3)\"><g class=\"clawd-send-tilt\"><g class=\"clawd-send-breathe\"><rect class=\"clawd-send-fill\" x=\"35\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"clawd-send-fill\" x=\"50\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"clawd-send-fill\" x=\"80\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"clawd-send-fill\" x=\"95\" y=\"70\" width=\"10\" height=\"20\"/><g transform=\"translate(20 35)\"><g class=\"clawd-send-lcounter\"><rect class=\"clawd-send-fill\" x=\"-20\" y=\"-10\" width=\"20\" height=\"20\"/></g></g><g transform=\"translate(120 35)\"><g class=\"clawd-send-throw\"><rect class=\"clawd-send-fill\" x=\"0\" y=\"-10\" width=\"20\" height=\"20\"/><g transform=\"translate(28 0)\"><g class=\"clawd-send-handplane\"><g transform=\"scale(1.2)\"><path class=\"clawd-send-paper\" d=\"M14 0 L-10 -9 L-4 0Z\"/><path class=\"clawd-send-paper2\" d=\"M14 0 L-4 0 L-10 9Z\"/></g></g></g></g></g><rect class=\"clawd-send-fill\" x=\"20\" y=\"0\" width=\"100\" height=\"70\"/><g class=\"clawd-send-look\"><rect class=\"clawd-send-eye clawd-send-blink\" x=\"45\" y=\"20\" width=\"10\" height=\"20\"/><rect class=\"clawd-send-eye clawd-send-blink\" x=\"85\" y=\"20\" width=\"10\" height=\"20\"/></g></g></g></g><g class=\"clawd-send-typing\"><path class=\"clawd-send-bubble-box\" d=\"M64 50 H122 a10 10 0 0 1 10 10 V76 a10 10 0 0 1 -10 10 H104 L98 100 L94 86 H64 a10 10 0 0 1 -10 -10 V60 a10 10 0 0 1 10 -10Z\"/><circle class=\"clawd-send-dot\" cx=\"74\" cy=\"68\" r=\"4\" style=\"animation-delay:0s\"/><circle class=\"clawd-send-dot\" cx=\"93\" cy=\"68\" r=\"4\" style=\"animation-delay:0.15s\"/><circle class=\"clawd-send-dot\" cx=\"112\" cy=\"68\" r=\"4\" style=\"animation-delay:0.3s\"/></g><g class=\"clawd-send-fly\"><path class=\"clawd-send-paper\" d=\"M14 0 L-10 -9 L-4 0Z\"/><path class=\"clawd-send-paper2\" d=\"M14 0 L-4 0 L-10 9Z\"/></g></svg>",ST="<svg class=\"raw\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 300\" role=\"img\" aria-label=\"Clawd \u5f00\u5fc3\u8df3\u8d77\u6765\uff1a\u8bc4\u8bba\u5df2\u53d1\u9001\"><style>\n.clawd-sent-fill{fill:var(--clawd-body,#D97757)}\n.clawd-sent-eye{fill:var(--clawd-eye,#1F1E1D)}\n.clawd-sent-blink{transform-box:fill-box;transform-origin:center;animation:clawd-sent-blink 4.6s infinite}\n@keyframes clawd-sent-blink{0%,89%,95%,100%{transform:scaleY(1)}92%{transform:scaleY(.1)}}\n\n.clawd-sent-shadow{fill:var(--clawd-muted,#8A8272);transform-box:fill-box;transform-origin:center;opacity:.28;animation:clawd-sent-shadow 2.6s .15s both,clawd-sent-shadow-idle 2.4s 2.8s ease-in-out infinite}\n@keyframes clawd-sent-shadow{0%,100%{transform:scaleX(1);opacity:.28}30%{transform:scaleX(.55);opacity:.14}50%{transform:scaleX(1.05)}70%{transform:scaleX(.8);opacity:.2}82%{transform:scaleX(1.02)}}\n@keyframes clawd-sent-shadow-idle{0%,100%{transform:scaleX(1);opacity:.28}50%{transform:scaleX(.9);opacity:.2}}\n.clawd-sent-jump{transform-box:fill-box;transform-origin:50% 100%;animation:clawd-sent-jump 2.6s .15s both}\n@keyframes clawd-sent-jump{0%{transform:translateY(0) scale(1,1)}10%{transform:translateY(0) scale(1.07,.88);animation-timing-function:ease-out}30%{transform:translateY(-46px) scale(.95,1.08);animation-timing-function:ease-in}50%{transform:translateY(0) scale(1.08,.88);animation-timing-function:ease-out}70%{transform:translateY(-20px) scale(.97,1.05);animation-timing-function:ease-in}82%{transform:translateY(0) scale(1.05,.93)}92%{transform:translateY(0) scale(.99,1.01)}100%{transform:translateY(0) scale(1,1)}}\n.clawd-sent-idle{animation:clawd-sent-idle 2.4s 2.8s ease-in-out infinite}\n@keyframes clawd-sent-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}\n.clawd-sent-raise-l{animation:clawd-sent-raise-l .5s .1s cubic-bezier(.3,1.6,.5,1) both}\n@keyframes clawd-sent-raise-l{from{transform:rotate(0)}to{transform:rotate(60deg)}}\n.clawd-sent-raise-r{animation:clawd-sent-raise-r .5s .1s cubic-bezier(.3,1.6,.5,1) both}\n@keyframes clawd-sent-raise-r{from{transform:rotate(0)}to{transform:rotate(-60deg)}}\n.clawd-sent-flap-l{animation:clawd-sent-flap-l .7s .7s ease-in-out infinite alternate}\n@keyframes clawd-sent-flap-l{from{transform:rotate(0)}to{transform:rotate(12deg)}}\n.clawd-sent-flap-r{animation:clawd-sent-flap-r .7s 1.05s ease-in-out infinite alternate}\n@keyframes clawd-sent-flap-r{from{transform:rotate(0)}to{transform:rotate(-12deg)}}\n.clawd-sent-eyes-n{animation:clawd-sent-hide .1s .35s both}\n@keyframes clawd-sent-hide{to{opacity:0}}\n.clawd-sent-eyes-h{opacity:0;animation:clawd-sent-show .1s .35s both;fill:none;stroke:var(--clawd-eye,#1F1E1D);stroke-width:8;stroke-linejoin:miter}\n@keyframes clawd-sent-show{to{opacity:1}}\n.clawd-sent-conf{opacity:0;animation:clawd-sent-conf 1.9s ease-out both}\n@keyframes clawd-sent-conf{0%{opacity:0;transform:translate(0,0) rotate(0)}8%{opacity:1}50%{opacity:1;transform:translate(var(--dx),var(--dy)) rotate(calc(var(--r)*.5))}100%{opacity:0;transform:translate(var(--dx),calc(var(--dy) + 90px)) rotate(var(--r))}}\n.clawd-sent-badge{transform-box:fill-box;transform-origin:center;animation:clawd-sent-badge .55s .95s both}\n@keyframes clawd-sent-badge{0%{transform:scale(0)}60%{transform:scale(1.18)}100%{transform:scale(1)}}\n.clawd-sent-badge-bg{fill:var(--clawd-ok,#6FA85F)}\n.clawd-sent-ring{fill:none;stroke:var(--clawd-ok,#6FA85F);stroke-width:3;transform-box:fill-box;transform-origin:center;opacity:0;animation:clawd-sent-ring .8s 1.1s ease-out both}\n@keyframes clawd-sent-ring{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.9)}}\n.clawd-sent-check{fill:none;stroke:#fff;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:100;stroke-dashoffset:100;animation:clawd-sent-check .4s 1.3s ease-out both}\n@keyframes clawd-sent-check{to{stroke-dashoffset:0}}\n.clawd-sent-heart{fill:#E9806A;opacity:0;animation:clawd-sent-heart 3.2s ease-out infinite}\n@keyframes clawd-sent-heart{0%{opacity:0;transform:translateY(0) scale(.4)}15%{opacity:1;transform:translateY(-8px) scale(1.1)}100%{opacity:0;transform:translateY(-62px) scale(1)}}\n@media (prefers-reduced-motion: reduce){*{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important}}</style><ellipse class=\"clawd-sent-shadow\" cx=\"180\" cy=\"250\" rx=\"74\" ry=\"7\"/><g transform=\"translate(82 120) scale(1.4)\"><g class=\"clawd-sent-jump\"><g class=\"clawd-sent-idle\"><rect class=\"clawd-sent-fill\" x=\"35\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"clawd-sent-fill\" x=\"50\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"clawd-sent-fill\" x=\"80\" y=\"70\" width=\"10\" height=\"20\"/><rect class=\"clawd-sent-fill\" x=\"95\" y=\"70\" width=\"10\" height=\"20\"/><g transform=\"translate(20 35)\"><g class=\"clawd-sent-raise-l\"><g class=\"clawd-sent-flap-l\"><rect class=\"clawd-sent-fill\" x=\"-20\" y=\"-10\" width=\"20\" height=\"20\"/></g></g></g><g transform=\"translate(120 35)\"><g class=\"clawd-sent-raise-r\"><g class=\"clawd-sent-flap-r\"><rect class=\"clawd-sent-fill\" x=\"0\" y=\"-10\" width=\"20\" height=\"20\"/></g></g></g><rect class=\"clawd-sent-fill\" x=\"20\" y=\"0\" width=\"100\" height=\"70\"/><g class=\"clawd-sent-eyes-n\"><rect class=\"clawd-sent-eye clawd-sent-blink\" x=\"45\" y=\"20\" width=\"10\" height=\"20\"/><rect class=\"clawd-sent-eye clawd-sent-blink\" x=\"85\" y=\"20\" width=\"10\" height=\"20\"/></g><g class=\"clawd-sent-eyes-h\"><path d=\"M43 39 L50 22 L57 39\"/><path d=\"M83 39 L90 22 L97 39\"/></g></g></g></g><g transform=\"translate(180 112)\"><rect class=\"clawd-sent-conf\" x=\"-3.5\" y=\"-3.5\" width=\"7\" height=\"7\" fill=\"#D97757\" style=\"--dx:-46px;--dy:-108px;--r:163deg;animation-delay:0.88s\"/><rect class=\"clawd-sent-conf\" x=\"-3.5\" y=\"-3.5\" width=\"7\" height=\"7\" fill=\"#E8A87C\" style=\"--dx:-106px;--dy:-73px;--r:442deg;animation-delay:0.78s\"/><rect class=\"clawd-sent-conf\" x=\"-2.5\" y=\"-5.5\" width=\"5\" height=\"11\" fill=\"#6FA85F\" style=\"--dx:-17px;--dy:-114px;--r:-442deg;animation-delay:0.79s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#8BB8E8\" style=\"--dx:17px;--dy:-44px;--r:141deg;animation-delay:0.89s\"/><rect class=\"clawd-sent-conf\" x=\"-3.5\" y=\"-3.5\" width=\"7\" height=\"7\" fill=\"#F0C75E\" style=\"--dx:20px;--dy:-88px;--r:514deg;animation-delay:0.85s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#C4623F\" style=\"--dx:-95px;--dy:-86px;--r:44deg;animation-delay:0.82s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#D97757\" style=\"--dx:82px;--dy:-106px;--r:88deg;animation-delay:0.80s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#E8A87C\" style=\"--dx:-105px;--dy:-63px;--r:70deg;animation-delay:0.80s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#6FA85F\" style=\"--dx:47px;--dy:-86px;--r:-201deg;animation-delay:0.89s\"/><rect class=\"clawd-sent-conf\" x=\"-3.5\" y=\"-3.5\" width=\"7\" height=\"7\" fill=\"#8BB8E8\" style=\"--dx:-36px;--dy:-100px;--r:-346deg;animation-delay:0.79s\"/><rect class=\"clawd-sent-conf\" x=\"-2.5\" y=\"-5.5\" width=\"5\" height=\"11\" fill=\"#F0C75E\" style=\"--dx:-52px;--dy:-80px;--r:-169deg;animation-delay:0.81s\"/><rect class=\"clawd-sent-conf\" x=\"-2.5\" y=\"-5.5\" width=\"5\" height=\"11\" fill=\"#C4623F\" style=\"--dx:125px;--dy:-111px;--r:-88deg;animation-delay:0.80s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#D97757\" style=\"--dx:-3px;--dy:-117px;--r:182deg;animation-delay:0.85s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#E8A87C\" style=\"--dx:98px;--dy:-95px;--r:211deg;animation-delay:0.84s\"/><rect class=\"clawd-sent-conf\" x=\"-2.5\" y=\"-5.5\" width=\"5\" height=\"11\" fill=\"#6FA85F\" style=\"--dx:77px;--dy:-114px;--r:-439deg;animation-delay:0.84s\"/><rect class=\"clawd-sent-conf\" x=\"-4.5\" y=\"-2.5\" width=\"9\" height=\"5\" fill=\"#8BB8E8\" style=\"--dx:43px;--dy:-115px;--r:218deg;animation-delay:0.85s\"/></g><g transform=\"translate(300 74)\"><circle class=\"clawd-sent-ring\" r=\"26\"/><g class=\"clawd-sent-badge\"><circle class=\"clawd-sent-badge-bg\" r=\"26\"/><path class=\"clawd-sent-check\" pathLength=\"100\" d=\"M-11 1 L-4 8 L11 -8\"/></g></g><g transform=\"translate(138 116)\"><path class=\"clawd-sent-heart\" style=\"animation-delay:2.4s\" d=\"M0 5 C-9 -1 -7 -9 0 -4 C7 -9 9 -1 0 5Z\"/></g><g transform=\"translate(222 116)\"><path class=\"clawd-sent-heart\" style=\"animation-delay:3.1s\" d=\"M0 5 C-9 -1 -7 -9 0 -4 C7 -9 9 -1 0 5Z\"/></g><g transform=\"translate(180 116)\"><path class=\"clawd-sent-heart\" style=\"animation-delay:3.8s\" d=\"M0 5 C-9 -1 -7 -9 0 -4 C7 -9 9 -1 0 5Z\"/></g><g transform=\"translate(250 116)\"><path class=\"clawd-sent-heart\" style=\"animation-delay:4.5s\" d=\"M0 5 C-9 -1 -7 -9 0 -4 C7 -9 9 -1 0 5Z\"/></g></svg>"
const commentMount=document.getElementById('comment-clawd');
const commentActions=[['type',1.2],['wait',1.6],['tada',1.3],['jump',1],['love',1.4],['dance',1.4],['wave',1.3],['sleep',1.7]];
let commentDeck=[],commentIndex=0,commentIdleTimer=0,commentAutoStarted=false,commentSubmitListenerAttached=false,commentSubmitState='idle',commentSubmitTimer=0;
function shuffleCommentDeck(){commentDeck=[...commentActions.keys()];for(let i=commentDeck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[commentDeck[i],commentDeck[j]]=[commentDeck[j],commentDeck[i]];}commentIndex=0;}
function setCommentMascot(html){commentMount.innerHTML=html;const svg=commentMount.querySelector('svg');if(svg){svg.style.width='116px';svg.style.maxWidth='100%';}}
function commentMascotAction(resetIdle=true){if(commentIndex>=commentDeck.length)shuffleCommentDeck();const [name,duration]=commentActions[commentDeck[commentIndex++]];setCommentMascot(clawdSvg());playOn(commentMount,name,duration);if(resetIdle)resetCommentIdle();}
function resetCommentIdle(){window.clearTimeout(commentIdleTimer);commentIdleTimer=window.setTimeout(()=>{commentIdleTimer=0;if(commentSubmitState==='idle')commentMascotAction(false);},90000);}
function clearCommentSubmitState(resetMascot=true){window.clearTimeout(commentSubmitTimer);commentSubmitState='idle';if(resetMascot&&commentMount){setCommentMascot(clawdSvg());resetCommentIdle();}}
function finishCommentSubmit(){if(commentSubmitState!=='sending')return;commentSubmitState='success-pending';window.clearTimeout(commentSubmitTimer);commentSubmitTimer=window.setTimeout(()=>{if(commentSubmitState!=='success-pending')return;commentSubmitState='celebrating';setCommentMascot(ST);window.clearTimeout(commentIdleTimer);commentSubmitTimer=window.setTimeout(()=>{if(commentSubmitState!=='celebrating')return;commentSubmitState='idle';setCommentMascot(clawdSvg());playOn(commentMount,'tada',1.3,()=>{setCommentMascot(clawdSvg());resetCommentIdle();});},4800);},4500);}
function beginCommentSubmit(){window.clearTimeout(commentSubmitTimer);window.clearTimeout(commentIdleTimer);commentSubmitState='sending';setCommentMascot(SD);commentSubmitTimer=window.setTimeout(()=>{if(commentSubmitState==='sending'||commentSubmitState==='success-pending')clearCommentSubmitState(true);},20000);}
function observeCommentSubmit(){if(!commentSubmitListenerAttached){twikooContainer.addEventListener('click',e=>{const button=e.target.closest('.tk-submit');if(button&&!button.disabled)beginCommentSubmit();},true);commentSubmitListenerAttached=true;}}
commentMount.addEventListener('click',()=>{if(!commentAutoStarted){shuffleCommentDeck();commentAutoStarted=true;}commentMascotAction();});setCommentMascot(clawdSvg());shuffleCommentDeck();resetCommentIdle();


// Load the Markdown-authored article index generated during the build.
loadPosts();
