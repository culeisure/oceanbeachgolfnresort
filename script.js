/* =========================================================
   오션비치 콘도회원권 신규 모집 랜딩 - 동작 스크립트
   인트로 / 스크롤 리빌 / 진행바 / 헤더 / 트래킹
   ========================================================= */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 콘텐츠 보호: 우클릭 차단 ---------- */
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  /* ---------- 1) 인트로 오버레이 (세션 첫 진입 1회) ---------- */
  (function () {
    var intro = document.getElementById("intro");
    if (!intro) return;

    var seen = false;
    try {
      seen = sessionStorage.getItem("oceanbeachIntro") === "1";
    } catch (e) {}

    if (seen || reduce) {
      intro.classList.add("is-done");
      window.setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 100);
      return;
    }

    try {
      sessionStorage.setItem("oceanbeachIntro", "1");
    } catch (e) {}

    document.documentElement.style.overflow = "hidden";
    window.setTimeout(function () {
      intro.classList.add("is-done");
      document.documentElement.style.overflow = "";
      window.setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 650);
    }, 1400);
  })();

  /* ---------- 1.5) 히어로 슬라이드 (오션비치 ↔ 이스트원) ---------- */
  (function () {
    var bgs = document.querySelectorAll(".lock__bg");
    var slides = document.querySelectorAll(".lock__slide");
    var dots = document.querySelectorAll(".lock__dots i");
    if (!slides.length || reduce) return;

    var idx = 0;
    var n = slides.length;

    /* 체류 시간: 진입 직후 오션비치 2.6초 → 이스트원 4.2초
       → 이후 오션비치 8초 / 이스트원 4.2초 반복 */
    var FIRST_HOLD = 2600;
    var HOLD = { 0: 8000, 1: 4200 };

    function show(target) {
      for (var i = 0; i < n; i++) {
        var on = i === target;
        if (bgs[i]) bgs[i].classList.toggle("is-on", on);
        slides[i].classList.toggle("is-on", on);
        if (dots[i]) dots[i].classList.toggle("is-on", on);
      }
    }
    function next(delay) {
      window.setTimeout(function () {
        idx = (idx + 1) % n;
        show(idx);
        next(HOLD[idx]);
      }, delay);
    }
    next(FIRST_HOLD);
  })();

  /* ---------- 2) 스크롤 리빌 (스태거) ---------- */
  (function () {
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.07 + "s";
      io.observe(el);
    });
  })();

  /* ---------- 3) 스크롤 진행바 + 헤더 고정 상태 ---------- */
  (function () {
    var bar = document.getElementById("progress");
    var head = document.getElementById("head");
    var lock = document.getElementById("lock");
    function onScroll() {
      var sc = window.scrollY || window.pageYOffset;
      if (bar) {
        var max =
          document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (sc / max) * 100 : 0) + "%";
      }
      // 히어로를 지난 뒤 헤더 등장
      if (head) {
        var gate = lock ? lock.offsetHeight - 80 : 12;
        head.classList.toggle("is-stuck", sc > gate);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  })();

  /* ---------- 4) 전환 트래킹 ----------
     GA4(G-EQ95RD28FD)로 전화/문자 클릭 이벤트 전송. */
  (function () {
    function sendEvent(name, params) {
      try {
        if (typeof gtag === "function") gtag("event", name, params);
        if (window.console && console.info) {
          console.info("[track]", name, params);
        }
      } catch (e) {}
    }
    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        sendEvent(el.getAttribute("data-track"), {
          position: el.getAttribute("data-track-pos") || "unknown",
          href: el.getAttribute("href") || ""
        });
      });
    });
  })();
})();
