/* Tweaks controller for the Helping Hands redesign.
   Single source of truth for `dir` (A/B/C) and `warmth`.
   Applies to <body data-dir data-warmth> and keeps the
   bottom switcher buttons in sync. */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dir": "b",
  "warmth": "warm"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply to <body> + sync the floating switcher
  useEffect(() => {
    document.body.dataset.dir = t.dir;
    document.body.dataset.warmth = t.warmth;
    document.querySelectorAll(".switcher button[data-dir]").forEach((b) => {
      b.classList.toggle("on", b.dataset.dir === t.dir);
    });
  }, [t.dir, t.warmth]);

  // let the vanilla switcher drive direction
  useEffect(() => {
    window.__setDir = (d) => setTweak("dir", d);
  }, [setTweak]);

  return (
    <TweaksPanel>
      <TweakSection label="Direction" />
      <TweakRadio
        label="Layout"
        value={t.dir}
        options={[{ value: "a", label: "Classic" }, { value: "b", label: "Warm" }, { value: "c", label: "Skyline" }]}
        onChange={(v) => setTweak("dir", v)}
      />
      <TweakSection label="Accent warmth" />
      <TweakRadio
        label="Earth tone"
        value={t.warmth}
        options={[{ value: "cool", label: "Cool" }, { value: "subtle", label: "Subtle" }, { value: "warm", label: "Warm" }]}
        onChange={(v) => setTweak("warmth", v)}
      />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById("tweaks-root"));
root.render(<TweaksApp />);
