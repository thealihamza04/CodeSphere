import { useEffect } from "react";
import PropTypes from "prop-types";

const BulletItem = ({ text, variant = "default" }) => (
  <li className="flex items-start gap-3">
    <div className={`mt-1.5 size-1.5 rounded-full shrink-0 ${variant === "avoid" ? "bg-red-400/40" : "bg-primary"}`} />
    <span className={`text-[14px] font-bold leading-relaxed ${variant === "avoid" ? "text-red-400/50 line-through" : "text-base-content/70"}`}>
      {text}
    </span>
  </li>
);

BulletItem.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "avoid"]),
};

const TagChip = ({ label, variant = "default" }) => {
  const variants = {
    default: "border-base-300 bg-base-200 text-base-content/70",
    primary: "border-primary/20 bg-primary/5 text-primary",
    danger: "border-red-400/20 bg-red-500/5 text-red-400/80",
    tag: "border-base-300 bg-base-200 text-base-content",
  };

  return (
    <span className={`px-4 py-2 border rounded-2xl font-mono text-[12px] font-bold ${variants[variant]}`}>
      {label}
    </span>
  );
};

TagChip.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "primary", "danger", "tag"]),
};

const SectionCard = ({ title, children }) => (
  <section className="space-y-4">
    <div className="p-8 rounded-[2rem] bg-base-200/50 border border-base-300">
      <h4 className="text-[10px] uppercase font-black tracking-wider text-primary mb-6">{title}</h4>
      {children}
    </div>
  </section>
);

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const StyleSheet = ({ style, onClose }) => {
  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    if (style) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [style]);

  if (!style) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40" onClick={onClose}>
      <div
        data-lenis-prevent
        className="flex flex-col w-full h-full max-w-lg gap-10 p-8 overflow-y-auto border-l shadow-2xl md:p-10 bg-base-100 border-base-300 custom-scrollbar animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Style Guide</p>
            <h2 className="text-4xl font-black leading-none tracking-tight md:text-5xl">{style.style}</h2>
          </div>
          <button
            className="transition-transform duration-300 border btn btn-md btn-circle btn-ghost border-base-300 hover:rotate-90"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {/* Intensity */}
          <p className="text-lg italic font-bold leading-snug tracking-tight md:text-xl text-base-content/80">
            &ldquo;{style.intensity}&rdquo;
          </p>

          {/* Palette Tendency */}
          <SectionCard title="Palette Tendency">
            <p className="text-[14px] font-medium text-base-content/70 leading-relaxed">{style.palette_tendency}</p>
          </SectionCard>

          {/* Best For */}
          {style.best_for && (
            <SectionCard title="Best For">
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold text-base-content/40 mb-3">Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {style.best_for.industries?.map((t, i) => (
                      <TagChip key={i} label={t} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-base-content/40 mb-3">Brand Personality</p>
                  <div className="flex flex-wrap gap-2">
                    {style.best_for.brand_personality?.map((t, i) => (
                      <TagChip key={i} label={t} variant="primary" />
                    ))}
                  </div>
                </div>
                {style.best_for.avoid_for && (
                  <div>
                    <p className="text-[11px] font-semibold text-red-400/60 mb-3">Avoid For</p>
                    <div className="flex flex-wrap gap-2">
                      {style.best_for.avoid_for.map((t, i) => (
                        <TagChip key={i} label={t} variant="danger" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {/* Motion */}
          {style.motion && (
            <SectionCard title="Motion">
              <ul className="space-y-4">
                {Object.entries(style.motion).map(([key, vals]) => (
                  <li key={key}>
                    <p className={`text-[11px] font-black uppercase tracking-wider mb-2 ${key === "avoid" ? "text-red-400/60" : "text-base-content/40"}`}>
                      {key}
                    </p>
                    <ul className="space-y-2">
                      {vals.map((v, i) => (
                        <BulletItem key={i} text={v} variant={key === "avoid" ? "avoid" : "default"} />
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* Typography */}
          {style.typography && (
            <SectionCard title="Typography">
              <div className="space-y-5">
                {style.typography.feel && (
                  <div>
                    <p className="text-[11px] font-semibold text-base-content/40 mb-2">Feel</p>
                    <ul className="space-y-2">
                      {style.typography.feel.map((v, i) => (
                        <BulletItem key={i} text={v} />
                      ))}
                    </ul>
                  </div>
                )}
                {style.typography.avoid && (
                  <div>
                    <p className="text-[11px] font-semibold text-red-400/60 mb-2">Avoid</p>
                    <ul className="space-y-2">
                      {style.typography.avoid.map((v, i) => (
                        <BulletItem key={i} text={v} variant="avoid" />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {/* Tags */}
          {style.tags && (
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                {style.tags.map((t, i) => (
                  <div key={i} className="px-6 py-3 border border-base-300 rounded-2xl bg-base-200 text-base-content font-mono text-[12px] font-black shadow-sm">
                    #{t}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

StyleSheet.propTypes = {
  style: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default StyleSheet;
