const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const page = document.body.dataset.page;

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header?.classList.toggle("nav-open", isOpen);
    document.body.classList.toggle("nav-lock", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      header?.classList.remove("nav-open");
      document.body.classList.remove("nav-lock");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
  link.classList.add("is-active");
});

const revealItems = document.querySelectorAll(".reveal");
const aboveFoldReveals = document.querySelectorAll(
  ".home-hero .reveal, .page-hero .reveal, .hobby-hero .reveal"
);

aboveFoldReveals.forEach((item) => item.classList.add("is-visible"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      observer.observe(item);
    }
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
