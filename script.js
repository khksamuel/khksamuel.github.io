// Mobile menu toggle
document
  .getElementById("mobile-menu-btn")
  .addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });

// Close mobile menu when a nav link is clicked
document.querySelectorAll("#mobile-menu a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.add("hidden");
  });
});

// Smooth scroll for all anchor links (skip bare # placeholders)
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Typing animation
(function () {
  const roles = [
    "Junior Software Engineer",
    "Full-Stack Developer",
    "Cloud & AWS Engineer",
    "Robotics & AI Engineer",
  ];
  const el = document.getElementById("typing-text");
  if (!el) return;
  let roleIdx = 0,
    charIdx = 0,
    deleting = false;
  function tick() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }
  setTimeout(tick, 600);
})();

// Active nav link highlight using IntersectionObserver (replaces scroll listener)
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          const isActive = link.getAttribute("href") === "#" + id;
          link.classList.toggle("text-white", isActive);
          link.classList.toggle("text-gray-400", !isActive);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
document.querySelectorAll("section[id]").forEach(function (section) {
  observer.observe(section);
});

// About 2 — live scrolling source code preview
(function () {
  var pre = document.getElementById("about2-code");
  var viewport = document.getElementById("about2-viewport");
  if (!pre || !viewport) return;

  // Read the live source directly from the DOM (works on file:// and http://)
  var source = document.documentElement.outerHTML;
  // Redact analytics IDs in the visual preview only.
  source = source.replace(/G-[A-Z0-9]+/g, "G-XXXXXXXXXX");
  pre.textContent = source;

  var pos = 0;
  var speed = 0.4; // px per frame
  var running = false;

  function step() {
    if (!running) return;
    pos += speed;
    if (pos >= pre.scrollHeight - viewport.clientHeight) {
      pos = 0; // seamless loop
    }
    viewport.scrollTop = pos;
    requestAnimationFrame(step);
  }

  // Start only when the element is visible
  var startObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !running) {
          running = true;
          requestAnimationFrame(step);
        } else if (!entry.isIntersecting) {
          running = false;
        }
      });
    },
    { threshold: 0.1 },
  );
  startObserver.observe(viewport);
})();

// About section scroll-reveal
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".about-reveal").forEach(function (el) {
  revealObserver.observe(el);
});
