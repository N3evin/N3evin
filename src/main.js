(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const header = $(".site-header");
  const btn = $(".menu-btn");
  const nav = $("#site-nav");

  // Menu toggle
  const setMenu = (open) => {
    if (!btn) return;
    btn.setAttribute("aria-expanded", String(open));
    header.classList.toggle("menu-open", open);
  };
  if (btn) {
    btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        btn.focus();
      }
    });
  }

  // Header scrolled state
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  // Scroll reveal
  const items = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("in"));

  // Active nav: section at upper-middle
  const links = $$("#site-nav a").filter((a) => a.getAttribute("href").startsWith("/#"));
  const secs = $$("main section");
  if ($("#about") && "IntersectionObserver" in window) {
    const so = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) =>
            e.target.id && a.getAttribute("href") === "/#" + e.target.id
              ? a.setAttribute("aria-current", "true")
              : a.removeAttribute("aria-current")
          );
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    secs.forEach((s) => so.observe(s));
  }

  const y = $("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
