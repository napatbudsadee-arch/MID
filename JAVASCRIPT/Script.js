(function(){
  "use strict";

  /* ---------- 1) Smart Sticky Header : hide down / show up ---------- */
  var header = document.getElementById("header");
  var lastY = window.scrollY;
  var THRESHOLD = 8;          // กันการสั่นจาก scroll เล็กน้อย
  var ticking = false;

  function onScroll(){
    var y = window.scrollY;
    var delta = y - lastY;

    header.dataset.scrolled = y > 4;

    if (Math.abs(delta) > THRESHOLD) {
      // เลื่อนลง + พ้นระยะ header แล้วเท่านั้นถึงซ่อน
      header.dataset.hidden = (delta > 0 && y > header.offsetHeight * 2);
      lastY = y;
    }
    computeActive();
    updateSidebar();
    updateFab(y);
    ticking = false;
  }

  window.addEventListener("scroll", function(){
    if (!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
  }, {passive:true});

  /* ---------- 2) Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  burger.addEventListener("click", function(){
    var open = nav.dataset.open === "true";
    nav.dataset.open = String(!open);
    burger.setAttribute("aria-expanded", String(!open));
  });
  nav.addEventListener("click", function(e){
    if (e.target.tagName === "A" && window.innerWidth <= 768){
      nav.dataset.open = "false";
      burger.setAttribute("aria-expanded","false");
    }
  });

  /* ---------- 3) Scrollspy : IntersectionObserver ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll("#spy a"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = links.map(function(a){ return document.querySelector(a.getAttribute("href")); });
  var spy = document.getElementById("spy");
  var current = null;

  function setActive(id){
    if (id === current) return;
    current = id;
    links.forEach(function(a, i){
      var on = a.getAttribute("href") === "#" + id;
      a.setAttribute("aria-current", on ? "true" : "false");

    });
    navLinks.forEach(function(a){
      a.setAttribute("aria-current", a.getAttribute("href") === "#" + id ? "true" : "false");
    });
    updateFabLabel(id);
  }

  /* เส้นตัดสิน (Trigger Line) : 28% จากขอบบนของ viewport
     ใช้ตำแหน่งเดียวตัดสินทั้งขาขึ้นและขาลง จึงไม่มีอาการข้าม section */
  var LINE_RATIO = 0.28;

  function computeActive(){
    var line = header.offsetHeight + window.innerHeight * LINE_RATIO;
    var idx  = 0;

    // section สุดท้ายที่ "ขอบบน" ผ่านเส้นตัดสินไปแล้ว = section ที่กำลังอ่านอยู่
    for (var i = 0; i < sections.length; i++){
      if (!sections[i]) continue;
      if (sections[i].getBoundingClientRect().top <= line) idx = i;
    }

    // ถึงท้ายหน้าแล้วให้รายการสุดท้าย active เสมอ (section เตี้ยจะได้ไม่ถูกข้าม)
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) idx = sections.length - 1;

    setActive(sections[idx].id);
  }

  /* Overlay : โผล่เมื่อพ้นโซน Hero, จางหายเมื่อเลื่อนกลับขึ้นไป Hero */
  var sidebar = document.querySelector(".sidebar");
  var hero    = document.querySelector(".hero");

  function updateSidebar(){
    if (!sidebar || !hero) return;
    // ขอบล่างของ Hero พ้นใต้ header ไปแล้วหรือยัง
    var passedHero = hero.getBoundingClientRect().bottom <= header.offsetHeight + 24;
    sidebar.dataset.visible = String(passedHero);
  }

  window.addEventListener("resize", computeActive);
  window.addEventListener("load", computeActive);

  /* ---------- 4) Conditional Persistent CTA ---------- */
  var fab = document.getElementById("fab");
  var LABELS = {
    "overview":      "ดูผลงานของเรา",
    "work-machine":  "ขอใบเสนอราคา",
    "work-piping":   "ขอใบเสนอราคา",
    "work-design":   "ปรึกษาการออกแบบ",
    "work-heatpipe": "ขอประเมินการประหยัดพลังงาน",
    "contact":       "โทรหาทีมงานทันที"
  };
  function updateFabLabel(id){
    fab.textContent = LABELS[id] || "ติดต่อเรา";
    fab.setAttribute("href", id === "contact" ? "tel:+6600000000" : "#contact");
  }
  function updateFab(y){
    // โผล่เมื่อพ้น Hero, ซ่อนเมื่อถึงหน้าติดต่อ (มีปุ่มจริงอยู่แล้ว)
    var contact = document.getElementById("contact");
    var pastHero = y > window.innerHeight * 0.6;
    var atContact = contact.getBoundingClientRect().top < window.innerHeight * 0.75;
    fab.dataset.visible = String(pastHero && !atContact);
  }
  /* ---------- 5) Init : เรียกหลังประกาศตัวแปรครบทุกตัวแล้วเท่านั้น ---------- */
  computeActive();
  updateSidebar();
  updateFab(window.scrollY);
})();