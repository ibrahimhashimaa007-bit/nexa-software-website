'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');navigation.classList.remove('open');menu.focus();
  }
});
const dialog = document.querySelector('#screenshot-dialog');
document.querySelectorAll('[data-screenshot]').forEach(button => button.addEventListener('click', () => dialog?.showModal()));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
const content = {
  collect: {label:'START WITH A LINK',link:'youtube.com/@yourchannel',title:'One video, or the bigger picture.',description:'Paste a video link, add a batch of links or load an available profile list. Your selected platform keeps the input clear.'},
  choose: {label:'DOWNLOAD WHAT MATTERS',link:'Selected videos → Download selected',title:'Your collection. Your selection.',description:'Select the items you want from the loaded list. Follow their progress in the queue, retry failed items and skip valid files you already have.'},
  organize: {label:'SAVE THE VIDEO. KEEP THE CONTEXT.',link:'Video + description.txt → batch.zip',title:'A place for every finished file.',description:'Keep available titles and descriptions beside your videos. Enable automatic ZIP to package the completed batch, with your original files retained.'}
};
const tabs = Array.from(document.querySelectorAll('[data-tab]'));
function selectTab(button) {
  tabs.forEach(tab => {const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
  const entry=content[button.dataset.tab];
  document.querySelector('#feature-label').textContent=entry.label;
  document.querySelector('#sample-link').textContent=entry.link;
  document.querySelector('#feature-title').textContent=entry.title;
  document.querySelector('#feature-description').textContent=entry.description;
  document.querySelector('#feature-panel').setAttribute('aria-labelledby',button.id);
}
tabs.forEach((button,index)=>{
  button.addEventListener('click',()=>selectTab(button));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowDown'||event.key==='ArrowRight') next=(index+1)%tabs.length;
    if(event.key==='ArrowUp'||event.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=tabs.length-1;
    if(next!==undefined){event.preventDefault();selectTab(tabs[next]);tabs[next].focus();}
  });
});
let toastTimer;
function toast(message){const element=document.querySelector('#toast');element.textContent=message;element.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>element.classList.remove('visible'),3500);}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  try { await navigator.clipboard.writeText(button.dataset.copy); toast('SHA256 checksum copied.'); }
  catch { toast('Copy is unavailable here. Select the checksum text to copy it.'); }
}));
