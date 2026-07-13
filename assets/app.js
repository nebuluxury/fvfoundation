/* The Frank Verney Foundation for Wildlife, Conservation & Education */
(async function(){
  // Inject the SVG icon sprite once
  try{
    const r = await fetch('assets/icons.svg');
    const t = await r.text();
    const d = document.createElement('div');
    d.style.display='none'; d.setAttribute('aria-hidden','true');
    d.innerHTML = t; document.body.insertBefore(d, document.body.firstChild);
  }catch(e){}
  init();
})();

function init(){
  // Mobile nav
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('mainnav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  // Highlight current page in nav
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('nav.main a').forEach(function(a){
    var href = a.getAttribute('href') || '';
    if(href === here || (here === 'index.html' && href === 'index.html')) a.classList.add('active');
  });

  // Contact + newsletter forms -> open the visitor's email app (no backend needed)
  document.querySelectorAll('form[data-mailto]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var to = f.getAttribute('data-mailto');
      var subj = f.getAttribute('data-subject') || 'Website enquiry';
      var lines = [];
      f.querySelectorAll('input,select,textarea').forEach(function(el){
        if(!el.name || el.type === 'submit') return;
        if(el.value) lines.push(el.name + ': ' + el.value);
      });
      // Best-effort: log the inquiry to the portal dashboard (no-op if backend absent)
      try {
        var val = function(n){ var el = f.querySelector('[name="'+n+'"]'); return el ? el.value : ''; };
        fetch('/api/inquiries', {
          method:'POST', headers:{'content-type':'application/json'},
          body: JSON.stringify({ name: val('Name'), email: val('Email'), phone: val('Phone'), message: val('Message') || lines.join(' | ') })
        }).catch(function(){});
      } catch(_){}
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subj) + '&body=' + body;
      var ok = f.querySelector('.form-ok');
      if(ok) ok.style.display = 'block';
      showToast('Thanks! Your email app is opening so you can hit send.');
    });
  });

  // Reveal-on-scroll (progressive; no effect if unsupported)
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.style.opacity=1; en.target.style.transform='none'; io.unobserve(en.target); }
      });
    }, {threshold:.12});
    document.querySelectorAll('[data-reveal]').forEach(function(el){
      el.style.opacity=0; el.style.transform='translateY(18px)';
      el.style.transition='opacity .6s ease, transform .6s ease';
      io.observe(el);
    });
  }

  // Footer year
  var y = document.getElementById('yr'); if(y) y.textContent = new Date().getFullYear();

  // Programs: filter by age group
  var audTabs = document.querySelectorAll('.aud-tab');
  if(audTabs.length){
    audTabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        audTabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        var aud = tab.getAttribute('data-aud');
        document.querySelectorAll('.prog[data-aud]').forEach(function(card){
          var show = aud === 'all' || (' '+card.getAttribute('data-aud')+' ').indexOf(' '+aud+' ') > -1;
          card.classList.toggle('hide-aud', !show);
        });
      });
    });
  }
}

function showToast(msg){
  var t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div'); t.id='toast'; t.className='toast';
    t.innerHTML = '<svg class="i"><use href="#i-check"/></svg><span></span>';
    document.body.appendChild(t);
  }
  t.querySelector('span').textContent = msg;
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 3800);
}
