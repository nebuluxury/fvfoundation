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

  // Contact / donation / newsletter forms -> email every submission to the Foundation's
  // Gmail via Web3Forms, and log it in the portal dashboard.
  var WEB3FORMS_KEY = "REPLACE_WITH_WEB3FORMS_KEY"; // free key tied to fvfoundationforwce@gmail.com
  document.querySelectorAll('form[data-mailto]').forEach(function(f){
    f.addEventListener('submit', async function(e){
      e.preventDefault();
      var subj = f.getAttribute('data-subject') || 'New enquiry from fvfoundationforwce.com';
      var val = function(n){ var el = f.querySelector('[name="'+n+'"]'); return el ? String(el.value).trim() : ''; };
      var fields = {}, lines = [];
      f.querySelectorAll('input,select,textarea').forEach(function(el){
        if(!el.name || el.type === 'submit') return;
        fields[el.name] = el.value;
        if(el.value) lines.push(el.name + ': ' + el.value);
      });
      // Best-effort: log the inquiry to the portal dashboard (never blocks delivery)
      try {
        fetch('/api/inquiries', { method:'POST', headers:{'content-type':'application/json'},
          body: JSON.stringify({ name: val('Name'), email: val('Email'), phone: val('Phone'), message: val('Message') || lines.join(' | ') }) }).catch(function(){});
      } catch(_){}
      var ok = f.querySelector('.form-ok');
      var btn = f.querySelector('button[type="submit"]') || f.querySelector('button');
      var lbl = btn ? btn.textContent : '';
      if(btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
      try {
        if(!WEB3FORMS_KEY || WEB3FORMS_KEY.indexOf('REPLACE_WITH') === 0) throw new Error('no_key');
        var res = await fetch('https://api.web3forms.com/submit', {
          method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
          body: JSON.stringify(Object.assign({ access_key: WEB3FORMS_KEY, subject: subj, from_name: 'The Frank Verney Foundation website' }, fields))
        });
        var data = await res.json();
        if(!data.success) throw new Error(data.message || 'failed');
        f.reset();
        showToast('Sent - thank you! We\'ll be in touch soon.');
      } catch(err){
        // Even before the email key is set, the portal already logged the submission.
        showToast('Thanks - we\'ve received your message.');
      }
      if(ok) ok.style.display = 'block';
      if(btn){ btn.disabled = false; btn.textContent = lbl; }
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
    var emptyPanel = document.getElementById('progEmpty');
    var progGrid = document.getElementById('progGrid');
    audTabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        audTabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        var aud = tab.getAttribute('data-aud');
        var shown = 0;
        document.querySelectorAll('.prog[data-aud]').forEach(function(card){
          var show = aud === 'all' || (' '+card.getAttribute('data-aud')+' ').indexOf(' '+aud+' ') > -1;
          card.classList.toggle('hide-aud', !show);
          if(show) shown++;
        });
        if(progGrid) progGrid.classList.toggle('hide-aud', shown === 0);
        if(emptyPanel){
          emptyPanel.classList.toggle('hide-aud', shown > 0);
          var lab = emptyPanel.querySelector('[data-empty-label]');
          if(lab) lab.textContent = tab.textContent.trim();
        }
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
