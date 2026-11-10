// Day / Night toggle
// Renders the inner markup into every .dn-toggle button and wires up the switch.
// Fires a "dn-change" event with detail { night: boolean }.

(function () {
  const STARS = `
    <svg viewBox="0 0 360 144" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#fff">
        ${star(48, 46, 9)}${star(110, 62, 6)}${star(32, 112, 6)}
        ${star(156, 46, 5, 0.75)}${star(168, 100, 4, 0.5)}
      </g>
      <g fill="#9a9aa4">
        <circle cx="66" cy="22" r="1.2"/><circle cx="20" cy="70" r="1.6"/>
        <circle cx="126" cy="94" r="1.4"/><circle cx="64" cy="128" r="1"/>
        <circle cx="198" cy="64" r="1.2"/><circle cx="114" cy="126" r="1"/>
      </g>
    </svg>`;

  const CLOUDS = `
    <svg viewBox="0 0 360 144" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <g fill="#a9c3e6">
        <circle cx="340" cy="22" r="22"/><circle cx="318" cy="56" r="26"/>
        <circle cx="300" cy="96" r="26"/><circle cx="262" cy="114" r="22"/>
        <circle cx="228" cy="128" r="20"/>
      </g>
      <g fill="#cfdff3">
        <circle cx="360" cy="40" r="26"/><circle cx="336" cy="80" r="28"/>
        <circle cx="300" cy="118" r="26"/><circle cx="256" cy="132" r="22"/>
        <circle cx="210" cy="140" r="20"/><circle cx="172" cy="146" r="18"/>
      </g>
      <g fill="#eef3fb">
        <circle cx="366" cy="78" r="30"/><circle cx="338" cy="118" r="30"/>
        <circle cx="290" cy="140" r="26"/><circle cx="244" cy="150" r="24"/>
        <circle cx="196" cy="156" r="22"/><circle cx="150" cy="160" r="20"/>
        <circle cx="114" cy="164" r="18"/>
      </g>
    </svg>`;

  function star(x, y, r, o = 1) {
    // four-point sparkle
    const k = r * 0.22;
    return `<path opacity="${o}" d="M${x} ${y - r} Q${x + k} ${y - k} ${x + r} ${y} Q${x + k} ${y + k} ${x} ${y + r} Q${x - k} ${y + k} ${x - r} ${y} Q${x - k} ${y - k} ${x} ${y - r}Z"/>`;
  }

  function mount(btn) {
    if (btn.dataset.dnMounted) return;
    btn.dataset.dnMounted = "1";
    btn.setAttribute("role", "switch");
    if (!btn.hasAttribute("aria-checked")) btn.setAttribute("aria-checked", "false");
    if (!btn.hasAttribute("aria-label")) btn.setAttribute("aria-label", "Dark mode");
    btn.type = "button";
    btn.innerHTML = `
      <span class="dn-track">
        <span class="dn-halo" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span class="dn-stars">${STARS}</span>
        <span class="dn-clouds">${CLOUDS}</span>
        <span class="dn-knob" aria-hidden="true">
          <span class="dn-crater"></span><span class="dn-crater"></span><span class="dn-crater"></span>
        </span>
      </span>`;
    btn.addEventListener("click", () => {
      const night = btn.getAttribute("aria-checked") !== "true";
      btn.setAttribute("aria-checked", String(night));
      btn.dispatchEvent(new CustomEvent("dn-change", { bubbles: true, detail: { night } }));
    });
  }

  function init(root = document) {
    root.querySelectorAll(".dn-toggle").forEach(mount);
  }

  window.DayNightToggle = { init, mount };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init());
  else init();
})();
