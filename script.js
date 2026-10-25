/* EventBook – منصة الفعاليات
   Shared behaviour: events data, rendering, search and filters, booking modal,
   toast, live clock, mobile menu and reveal animations. */

const EVENTS = [
  {
    id: "sea-nights",
    city: "جدة",
    title: "مهرجان ليالي البحر",
    sub: "Sea Nights",
    cat: "music",
    date: "من 1 أبريل إلى 27 مايو 2025",
    venue: "جدة – شارع الكورنيش",
    img: "images/sea-nights.jpeg",
    featured: true,
  },
  {
    id: "eva-jeddah",
    city: "جدة",
    title: "EVA جدة – ألعاب الواقع الافتراضي",
    cat: "fun",
    date: "25 مايو 2025",
    venue: "قاعة الملك عبد الله",
    img: "images/eva-jeddah.png",
    featured: true,
  },
  {
    id: "theatre",
    city: "جدة",
    title: "عرض مسرحي: ليلة في جدة",
    cat: "music",
    date: "29 يونيو 2025",
    venue: "مسرح الواجهة البحرية",
    img: "images/theatre.jpeg",
  },
  {
    id: "leap",
    city: "الرياض",
    title: "مؤتمر التقنية والابتكار LEAP",
    cat: "tech",
    date: "5 يوليو 2025",
    venue: "مركز المعارض الدولي - الرياض",
    img: "images/leap.png",
  },
  {
    id: "food",
    city: "جدة",
    title: "مهرجان أطعمة العالم",
    cat: "food",
    date: "10 يوليو 2025",
    venue: "حديقة الأمير ماجد - جدة",
    img: "images/food-festival.jpeg",
  },
  {
    id: "beach",
    city: "جدة",
    title: "Music on the Beach",
    sub: "حفلة شاطئية في جدة",
    cat: "music",
    date: "الخميس 10 أبريل",
    venue: "خليج سلمان – BOA Beach، جدة",
    img: "images/music-on-the-beach.jpeg",
  },
];

const CATEGORIES = {
  all: "الكل",
  music: "حفلات وعروض",
  tech: "مؤتمرات تقنية",
  food: "مهرجانات طعام",
  fun: "ترفيه",
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Toast ---------- */
function toast(message) {
  let el = $(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 3200);
}

/* ---------- Clock ---------- */
function updateClock() {
  const el = $("#current-date-time");
  if (!el) return;
  el.textContent = new Date().toLocaleString("ar-SA", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/* ---------- Event cards ---------- */
function eventCard(e) {
  return `
    <article class="event-card reveal" data-cat="${e.cat}">
      <div class="event-media">
        <span class="badge ${e.cat}">${CATEGORIES[e.cat]}</span>
        <img src="${e.img}" alt="${escapeHtml(e.title)}" loading="lazy" />
      </div>
      <div class="event-info">
        <h3>${escapeHtml(e.title)}${e.sub ? ` <small style="color:var(--muted);font-weight:600">· ${escapeHtml(e.sub)}</small>` : ""}</h3>
        <p class="meta">📅 ${escapeHtml(e.date)}</p>
        <p class="meta">📍 ${escapeHtml(e.venue)}</p>
        <div class="event-actions">
          <button class="btn sm" data-book="${e.id}">احجز الآن</button>
        </div>
      </div>
    </article>`;
}

function renderInto(selector, list) {
  const host = $(selector);
  if (!host) return;
  host.innerHTML = list.map(eventCard).join("");
  observeReveals();
}

/* ---------- Events page: search + filters ---------- */
function initEventsPage() {
  const grid = $("#events-grid");
  if (!grid) return;
  const search = $("#event-search");
  const empty = $("#empty");
  const chips = $("#filter-chips");
  let category = "all";

  chips.innerHTML = Object.entries(CATEGORIES)
    .map(([key, label]) => `<button class="chip${key === "all" ? " active" : ""}" data-cat="${key}">${label}</button>`)
    .join("");

  const params = new URLSearchParams(location.search);
  if (params.get("q")) search.value = params.get("q");
  if (CATEGORIES[params.get("cat")]) category = params.get("cat");
  $$(".chip", chips).forEach((c) => c.classList.toggle("active", c.dataset.cat === category));

  const apply = () => {
    const q = search.value.trim().toLowerCase();
    const list = EVENTS.filter(
      (e) =>
        (category === "all" || e.cat === category) &&
        (!q || `${e.title} ${e.sub || ""} ${e.venue} ${e.date}`.toLowerCase().includes(q))
    );
    renderInto("#events-grid", list);
    empty.classList.toggle("show", list.length === 0);
    $("#result-count").textContent = `${list.length} فعالية`;
  };

  chips.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".chip");
    if (!btn) return;
    category = btn.dataset.cat;
    $$(".chip", chips).forEach((c) => c.classList.toggle("active", c === btn));
    apply();
  });
  search.addEventListener("input", apply);
  apply();
}

/* ---------- Home page ---------- */
function initHome() {
  if (!$("#featured-grid")) return;
  renderInto("#featured-grid", EVENTS.filter((e) => e.featured));

  const cities = new Set(EVENTS.map((e) => e.city));
  $("#stat-events").textContent = EVENTS.length;
  $("#stat-types").textContent = Object.keys(CATEGORIES).length - 1;
  $("#stat-cities").textContent = cities.size;

  const form = $("#hero-search");
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const q = $("#hero-q").value.trim();
    location.href = "events.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
  });
  $$("[data-cat-link]").forEach((chip) =>
    chip.addEventListener("click", () => (location.href = `events.html?cat=${chip.dataset.catLink}`))
  );
}

/* ---------- Booking modal ---------- */
function initBooking() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `<div class="modal-card"><button class="close" aria-label="إغلاق">✕</button><div id="modal-body"></div></div>`;
  document.body.appendChild(modal);
  const body = $("#modal-body", modal);
  let current = null;
  let tickets = 1;

  const close = () => modal.classList.remove("open");

  const showForm = () => {
    tickets = 1;
    body.innerHTML = `
      <h3>احجز تذكرتك</h3>
      <p class="sub">${escapeHtml(current.title)} · ${escapeHtml(current.date)}</p>
      <form id="book-form" novalidate>
        <div class="form-row"><label for="b-name">الاسم الكامل</label><input id="b-name" required placeholder="اكتب اسمك" autocomplete="name" /></div>
        <div class="form-row"><label for="b-email">البريد الإلكتروني</label><input id="b-email" type="email" required placeholder="name@example.com" class="ltr" autocomplete="email" /></div>
        <div class="form-row"><label>عدد التذاكر</label>
          <div class="stepper"><button type="button" data-step="1" aria-label="زيادة">+</button><output id="b-count">1</output><button type="button" data-step="-1" aria-label="إنقاص">−</button></div>
        </div>
        <button class="btn" style="width:100%;margin-top:8px" type="submit">تأكيد الحجز</button>
      </form>`;
    $("#b-name").focus();
  };

  const showTicket = (name, count) => {
    const code = "EB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const saved = JSON.parse(localStorage.getItem("eventbook-bookings") || "[]");
    saved.push({ id: current.id, title: current.title, name, count, code, at: Date.now() });
    localStorage.setItem("eventbook-bookings", JSON.stringify(saved));
    body.innerHTML = `
      <div class="success-mark">✓</div>
      <h3 style="text-align:center">تم حجز التذكرة بنجاح!</h3>
      <p class="sub" style="text-align:center">أهلاً ${escapeHtml(name)}، هذه تذكرتك:</p>
      <div class="ticket">
        <small>EVENTBOOK TICKET</small>
        <h4>${escapeHtml(current.title)}</h4>
        <p class="meta" style="color:#fff;margin:2px 0">📅 ${escapeHtml(current.date)}</p>
        <p class="meta" style="color:#fff;margin:2px 0 14px">📍 ${escapeHtml(current.venue)}</p>
        <div class="row"><span>${count} ${count === 1 ? "تذكرة" : "تذاكر"}</span><span class="code">${code}</span></div>
      </div>
      <button class="btn ghost" style="width:100%" data-close>إغلاق</button>`;
    toast("تم حجز التذكرة بنجاح!");
  };

  document.addEventListener("click", (ev) => {
    const trigger = ev.target.closest("[data-book]");
    if (trigger) {
      current = EVENTS.find((e) => e.id === trigger.dataset.book);
      showForm();
      modal.classList.add("open");
      return;
    }
    if (ev.target === modal || ev.target.closest(".close") || ev.target.closest("[data-close]")) close();
    const step = ev.target.closest("[data-step]");
    if (step) {
      tickets = Math.min(10, Math.max(1, tickets + Number(step.dataset.step)));
      $("#b-count").textContent = tickets;
    }
  });
  document.addEventListener("keydown", (ev) => ev.key === "Escape" && close());

  // Deep link: events.html?book=<event-id> opens the booking dialog directly.
  const requested = EVENTS.find((e) => e.id === new URLSearchParams(location.search).get("book"));
  if (requested) {
    current = requested;
    showForm();
    modal.classList.add("open");
  }

  modal.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = $("#b-name").value.trim();
    const email = $("#b-email").value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      toast("فضلاً أدخل اسمك وبريداً إلكترونياً صحيحاً");
      return;
    }
    showTicket(name, tickets);
  });
}

/* ---------- Simple forms (newsletter / contact) ---------- */
function initForms() {
  $$("[data-toast-form]").forEach((form) =>
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const email = $("input[type=email]", form);
      if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        toast("فضلاً أدخل بريداً إلكترونياً صحيحاً");
        return;
      }
      if (form.dataset.mailto) {
        const name = ($("#c-name", form)?.value || "").trim();
        const msg = ($("#c-msg", form)?.value || "").trim();
        const subject = encodeURIComponent("رسالة من موقع منصة الفعاليات");
        const text = encodeURIComponent(`${msg}\n\n— ${name} (${email.value.trim()})`);
        location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${text}`;
      }
      toast(form.dataset.toastForm);
      form.reset();
    })
  );
}

/* ---------- Header: mobile menu + active link ---------- */
function initHeader() {
  const btn = $(".menu-btn");
  const nav = $("header nav");
  if (btn) btn.addEventListener("click", () => nav.classList.toggle("open"));
  const page = location.pathname.split("/").pop() || "index.html";
  $$("header nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === page));
}

/* ---------- Reveal on scroll ---------- */
let observer;
function observeReveals() {
  if (!("IntersectionObserver" in window)) return $$(".reveal").forEach((el) => el.classList.add("in"));
  observer = observer || new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); observer.unobserve(en.target); }
    }),
    { threshold: 0.12 }
  );
  $$(".reveal:not(.in)").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  updateClock();
  setInterval(updateClock, 1000);
  initHome();
  initEventsPage();
  initBooking();
  initForms();
  observeReveals();
});
