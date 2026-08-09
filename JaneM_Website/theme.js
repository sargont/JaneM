(function initialiseJaneMTheme() {
  const storageKey = "janem-theme-preference";
  const choices = ["auto", "light", "dark"];
  const root = document.documentElement;

  function readPreference() {
    try {
      const saved = localStorage.getItem(storageKey);
      return choices.includes(saved) ? saved : "auto";
    } catch (_) {
      return "auto";
    }
  }

  function isEvening() {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  }

  function resolve(preference) {
    return preference === "auto" ? (isEvening() ? "dark" : "light") : preference;
  }

  function apply(preference, persist) {
    const safePreference = choices.includes(preference) ? preference : "auto";
    const resolved = resolve(safePreference);
    root.dataset.theme = resolved;
    root.dataset.themePreference = safePreference;
    root.style.colorScheme = resolved;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = resolved === "dark" ? "#0f0d0b" : "#15120f";
    if (persist) {
      try { localStorage.setItem(storageKey, safePreference); } catch (_) {}
    }
    document.dispatchEvent(new CustomEvent("janemthemechange", { detail: { preference: safePreference, resolved } }));
    return { preference: safePreference, resolved };
  }

  let state = apply(readPreference(), false);
  window.JaneMTheme = { get: () => ({ ...state }), set: (preference) => { state = apply(preference, true); return { ...state }; } };

  function mountControl() {
    const nav = document.querySelector(".site-nav");
    if (!nav || nav.querySelector("[data-theme-picker]")) return;
    const picker = document.createElement("div");
    picker.className = "theme-picker";
    picker.dataset.themePicker = "";
    picker.innerHTML = '<button class="theme-trigger" type="button" aria-expanded="false" aria-controls="theme-menu" aria-label="Choose website appearance"><span class="theme-trigger__icon" aria-hidden="true">◐</span><span class="theme-trigger__text">Theme</span></button><div class="theme-menu" id="theme-menu" hidden><p>Appearance</p><button type="button" data-theme-choice="auto"><span>Auto</span><small>Dark after 6pm</small></button><button type="button" data-theme-choice="light"><span>Light</span><small>Always light</small></button><button type="button" data-theme-choice="dark"><span>Dark</span><small>Always dark</small></button></div>';
    const cta = nav.querySelector(".nav-cta");
    nav.insertBefore(picker, cta || null);
    const trigger = picker.querySelector(".theme-trigger");
    const menu = picker.querySelector(".theme-menu");

    function paintControl() {
      const current = window.JaneMTheme.get();
      picker.querySelectorAll("[data-theme-choice]").forEach((button) => {
        const active = button.dataset.themeChoice === current.preference;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      trigger.dataset.resolvedTheme = current.resolved;
      trigger.title = `Appearance: ${current.preference === "auto" ? `Auto (${current.resolved})` : current.preference}`;
    }

    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", () => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      trigger.setAttribute("aria-expanded", String(opening));
    });
    picker.querySelectorAll("[data-theme-choice]").forEach((button) => button.addEventListener("click", () => {
      state = apply(button.dataset.themeChoice, true);
      paintControl();
      closeMenu();
      window.JaneMAnalytics?.track("theme_changed", state);
    }));
    document.addEventListener("click", (event) => { if (!picker.contains(event.target)) closeMenu(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
    document.addEventListener("janemthemechange", paintControl);
    paintControl();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountControl, { once: true });
  else mountControl();

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) state = apply(readPreference(), false);
  });
  window.setInterval(() => {
    if (state.preference === "auto") state = apply("auto", false);
  }, 60000);
}());
