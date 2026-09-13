/* GovHelm site behaviour: theme toggle, primary nav dropdowns, mobile menu.
   Progressive enhancement only — every page works with JavaScript disabled. */
(function () {
  'use strict';

  /* ---- colour theme ---------------------------------------------------- */
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  function currentTheme() {
    var stored = null;
    try { stored = localStorage.getItem('govhelm-theme'); } catch (e) {}
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('govhelm-theme', next); } catch (e) {}
      toggle.setAttribute('aria-label',
        next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  /* ---- primary navigation dropdowns ------------------------------------ */
  var dropdowns = [].slice.call(document.querySelectorAll('.has-dd'));

  function closeAll(except) {
    dropdowns.forEach(function (item) {
      if (item === except) return;
      item.querySelector('.nav-btn').setAttribute('aria-expanded', 'false');
      item.querySelector('.dd').hidden = true;
    });
  }

  dropdowns.forEach(function (item) {
    var btn = item.querySelector('.nav-btn');
    var panel = item.querySelector('.dd');

    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      closeAll(item);
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
    });

    // Deliberately click-to-open rather than hover-to-open: hover opening makes
    // the button's own click read as "close", and it is no use on touch.
    item.addEventListener('focusout', function (event) {
      if (!item.contains(event.relatedTarget)) {
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.has-dd')) closeAll(null);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var open = document.querySelector('.nav-btn[aria-expanded="true"]');
    closeAll(null);
    if (open) open.focus();
    closeMobile();
  });

  /* ---- mobile menu ------------------------------------------------------ */
  var menuBtn = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-nav');

  function closeMobile() {
    if (!menuBtn || !menu || menu.hidden) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      menuBtn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.hidden = open;
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) closeMobile();
    });
  }
})();
