const $root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Theme toggle. The initial theme is set by the inline script in <head>. */
const $themeToggle = document.querySelector("[data-theme-toggle]");

function setTheme(theme) {
  $root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage is blocked in some private windows; the toggle still works for this visit.
  }
  syncThemeChrome();
}

function syncThemeChrome() {
  const next = $root.dataset.theme === "dark" ? "light" : "dark";
  const pageColour = getComputedStyle(document.body).backgroundColor;

  if ($themeToggle) {
    $themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
  }
  document.querySelectorAll('meta[name="theme-color"]').forEach(($meta) => {
    $meta.setAttribute("content", pageColour);
  });
}

if ($themeToggle) {
  syncThemeChrome();
  $themeToggle.addEventListener("click", () => {
    const next = $root.dataset.theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => setTheme(next));
  });
}

/* Local time in Bengaluru, next to the location in the hero. */
const $clock = document.querySelector("[data-clock]");

if ($clock) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  const tick = () => {
    $clock.textContent = `${formatter.format(new Date())} IST`;
  };
  tick();
  setInterval(tick, 30_000);
}

/* Copy the email address. */
const $copy = document.querySelector("[data-copy]");

if ($copy) {
  const $copyLabel = $copy.querySelector("[data-copy-label]");
  $copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText($copy.dataset.copy);
    $copyLabel.textContent = "Copied";
    setTimeout(() => {
      $copyLabel.textContent = "Copy";
    }, 1600);
  });
}

/* Mark the nav link of the section currently in view. */
const $navLinks = [...document.querySelectorAll("[data-nav] a")];

if ($navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $navLinks.forEach(($link) => {
          if ($link.getAttribute("href") === `#${entry.target.id}`) {
            $link.setAttribute("aria-current", "true");
          } else {
            $link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  $navLinks.forEach(($link) => {
    const $section = document.querySelector($link.getAttribute("href"));
    if ($section) observer.observe($section);
  });
}

/* Cards light up under the pointer. */
if (matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card").forEach(($card) => {
    $card.addEventListener("pointermove", (event) => {
      const box = $card.getBoundingClientRect();
      $card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      $card.style.setProperty("--my", `${event.clientY - box.top}px`);
    });
  });
}
