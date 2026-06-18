/* ====================================================================
   غياث عبد الرزاق — موقع شخصي لمهندس تصميم ميكانيكي
   ملف جافاسكريبت — أقل قدر ممكن من الكود، فقط للوظائف الضرورية:
   1) قائمة الموبايل
   2) زر العودة للأعلى
   3) تأثير ظهور بسيط عند التمرير (Intersection Observer)
   لا توجد مكتبات خارجية. الكود مُحسَّن للأداء (Event Delegation + Passive Listeners)
   ==================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1) قائمة التنقل في الموبايل
     ---------------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var primaryNav = document.getElementById('primary-nav');
  var navOverlay = document.getElementById('nav-overlay');

  function setNavOpen(isOpen) {
    if (!primaryNav || !navToggle) return;

    primaryNav.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    document.body.classList.toggle('nav-open', isOpen);

    if (navOverlay) {
      navOverlay.classList.toggle('is-visible', isOpen);
      navOverlay.hidden = !isOpen;
      navOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      setNavOpen(!primaryNav.classList.contains('is-open'));
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        setNavOpen(false);
      });
    }

    primaryNav.addEventListener('click', function (event) {
      if (event.target.classList.contains('nav-link')) {
        setNavOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 992) {
        setNavOpen(false);
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     2) زر العودة للأعلى
     ---------------------------------------------------------------- */
  var backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    var toggleBackToTop = function () {
      if (window.scrollY > 420) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    };

    /* passive: true لتحسين أداء التمرير */
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     3) تأثير ظهور بسيط عند التمرير باستخدام Intersection Observer
        (أداء أعلى بكثير من مستمعي scroll التقليديين)
     ---------------------------------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* احتياط: إن لم يدعم المتصفح Intersection Observer، يتم إظهار كل العناصر فوراً */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ----------------------------------------------------------------
     تحديث سنة حقوق النشر في التذييل تلقائياً
     ---------------------------------------------------------------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
