'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const ar = document.documentElement.lang === 'ar';
const t = (en, arabic) => ar ? arabic : en;
const content = window.CREOVO;
const track = (event, data={}) => {
  // Consent-gated, intentionally inactive until a production consent manager is connected.
  if(window.creovoAnalyticsConsent === true) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event,...data});
  }
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const productHTML = product => `<button class="product" data-product="${product.id}" aria-label="${escapeHTML(t('View '+product.name,product.ar))}"><div class="product-photo"><img src="/assets/${product.image}" width="800" height="800" alt="${escapeHTML(product.alt)}" loading="lazy" decoding="async"><span class="badge">${ar?'قائمة تجريبية':product.tag}</span></div><div class="product-title"><h3>${escapeHTML(ar?product.ar:product.name)}</h3><span class="product-arrow" aria-hidden="true">↗</span></div><p>${escapeHTML(ar?product.descriptionAr:product.description)}</p></button>`;
let category = 'all';
function renderProducts() {
  const container = $('#products'); if(!container) return;
  const query = ($('#menu-search')?.value || '').trim().toLowerCase();
  const selected = content.products.filter(p => (category==='all'||p.category===category) && `${p.name} ${p.ar} ${p.description}`.toLowerCase().includes(query));
  const shown = !$('#menu-search') && category==='all' ? selected.slice(0,3) : selected;
  container.innerHTML = shown.length ? shown.map(productHTML).join('') : `<p class="empty-state">${t('No matches yet. Try “coffee” or choose another category.','لا توجد نتائج. جرّب البحث عن القهوة أو اختر فئة أخرى.')}</p>`;
}
$$('[data-category]').forEach(button => button.addEventListener('click',()=>{
  category=button.dataset.category;
  $$('[data-category]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  renderProducts();track('menu_category_select',{category});
}));
$('#menu-search')?.addEventListener('input',renderProducts);
renderProducts();
if(location.pathname.includes('/menu/')) track('menu_view');
function showBranch(id) {
  const branch=content.branches.find(b=>b.id===id);if(!branch) return;
  $$('[data-branch]').forEach(b=>{b.classList.toggle('active',b.dataset.branch===id);b.setAttribute('aria-pressed',String(b.dataset.branch===id));});
  const preview=$('#branch-preview'); if(preview) preview.innerHTML=`<img src="/assets/${branch.image}" width="900" height="600" loading="lazy" alt="${t('Illustrative photography for this café concept','صورة توضيحية لفكرة المقهى')}"><div class="branch-overlay"><div><p>${t('BRANCH CONCEPT','فكرة الفرع')} ${branch.number}</p><h3>${ar?branch.ar:branch.name}</h3></div><a href="${ar?'/ar':''}/locations/${branch.id}/">${t('Explore the space','اكتشف المكان')} ↗</a></div>`;
}
if($('#branch-list')) {
  $('#branch-list').innerHTML=content.branches.map(b=>`<button class="branch-row" data-branch="${b.id}" aria-pressed="false"><span class="branch-number">${b.number}</span><span><h3>${ar?b.ar:b.name}</h3><p>${ar?'فكرة فرع · التفاصيل قريباً':b.subtitle+' · Sample branch'}</p></span><span aria-hidden="true">↗</span></button>`).join('');
  showBranch(content.branches[0].id);
}
$('#branch-search')?.addEventListener('input',e=>{
  const query=e.target.value.trim().toLowerCase(); let found=0;
  $$('.branch-card').forEach(card=>{card.hidden=!card.textContent.toLowerCase().includes(query);if(!card.hidden) found++;});
  $('#branch-search-status').textContent=found?t(`${found} branch concepts`,`${found} أفكار للفروع`):t('No branches match your search.','لا توجد فروع مطابقة.');
});
const dialog=$('#dialog');let previousFocus;
function openDialog(html) { previousFocus=document.activeElement;$('#dialog-content').innerHTML=html;dialog.showModal();document.body.style.overflow='hidden'; }
function closeDialog(){dialog.close();}
dialog?.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus();});
$('.close-dialog')?.addEventListener('click',closeDialog);
dialog?.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog();}});
function openProduct(id){
 const p=content.products.find(p=>p.id===id);if(!p)return;track('product_view',{product_id:id});
 openDialog(`<img src="/assets/${p.image}" alt="${escapeHTML(p.alt)}"><p class="eyebrow">${t('A TASTE OF CREOVO · SAMPLE MENU','مذاق كريوفو · قائمة تجريبية')}</p><h2 id="dialog-title">${ar?p.ar:p.name}</h2><p>${ar?p.descriptionAr:p.detail}</p><p><strong>${t('Price: to be confirmed','السعر: يُحدد لاحقاً')}</strong></p><p>${t(p.allergens,'سيتم تأكيد المكونات ومسببات الحساسية.')} ${t('Dietary suitability and branch availability have not been verified.','لم يتم تأكيد الملاءمة الغذائية أو التوفر في الفروع.')}</p>`);
}
function openAction(action,branchId=''){
 if(action!=='reserve')return;track('reservation_click',{branch_id:branchId||'unselected'});
 openDialog(`<p class="eyebrow">${t('MAKE IT A CREOVO MOMENT','لحظة كريوفو')}</p><h2 id="dialog-title">${t('A table for your moment.','طاولة للحظتك.')}</h2><p>${t('This is a template preview. No reservation will be sent. Choose your preferences to explore the experience.','هذه معاينة تجريبية. لن يتم إرسال حجز. اختر تفضيلاتك لاستكشاف التجربة.')}</p><form id="action-form" class="form-fields"><label>${t('Choose a café concept','اختر فكرة المقهى')}<select name="branch" required><option value="">${t('Select a branch','اختر الفرع')}</option>${content.branches.map(b=>`<option value="${b.id}" ${branchId===b.id?'selected':''}>${ar?b.ar:b.name}</option>`).join('')}</select></label>${`<label>${t('Preferred date','التاريخ المفضل')}<input type="date" name="date" min="${new Date().toLocaleDateString('en-CA')}" required></label><label>${t('Your party','عدد الضيوف')}<select name="guests"><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select></label>`}<button type="submit" class="button">${t('Preview next step','معاينة الخطوة التالية')} ↗</button><p id="action-status" role="status"></p></form>`);
 $('#action-form').addEventListener('submit',e=>{e.preventDefault();const branch=content.branches.find(b=>b.id===new FormData(e.target).get('branch'));$('#action-status').className='status';$('#action-status').textContent=t(`${branch.name} selected. A reservation provider and verified opening hours must be connected before launch. Nothing has been submitted.`,`تم اختيار ${branch.ar}. يجب ربط مزود الخدمة وتأكيد التوفر قبل الإطلاق. لم يتم إرسال أي شيء.`);});
}
document.addEventListener('click',e=>{
 const product=e.target.closest('[data-product]');if(product)openProduct(product.dataset.product);
 const branch=e.target.closest('[data-branch]');if(branch){showBranch(branch.dataset.branch);track('branch_select',{branch_id:branch.dataset.branch});}
 const action=e.target.closest('[data-action]');if(action)openAction(action.dataset.action,action.dataset.branchId);
});
const toggle=$('.nav-toggle');toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#nav').classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle){toggle.setAttribute('aria-expanded','false');$('#nav').classList.remove('open');}});
$('#newsletter')?.addEventListener('submit',e=>{e.preventDefault();$('#newsletter-status').textContent=t('A little preview of what’s to come. Signup is not connected yet; your email has not been stored.','هذه معاينة فقط. الاشتراك غير متصل بعد، ولم يتم حفظ بريدك الإلكتروني.');});
$$('.demo-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();$('.form-status',form).textContent=t('Your preview is ready. This form is not connected to a team yet; no inquiry has been sent or stored.','المعاينة جاهزة. النموذج غير متصل بالفريق بعد. لم يتم إرسال أو حفظ أي استفسار.');}));
if($('#year'))$('#year').textContent=new Date().getFullYear();
