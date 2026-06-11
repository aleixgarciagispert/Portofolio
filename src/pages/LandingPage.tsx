import { siteConfig } from '../data/siteConfig';

export default function LandingPage() {
  return (
    <section
      className="relative flex flex-col items-center justify-center flex-1 min-h-[min(70vh,640px)] px-4 overflow-hidden"
      aria-label="Home"
    >
      <div className="relative z-[1] w-[min(320px,60vw)] h-[min(320px,60vw)] flex items-center justify-center">
        <div
          className="absolute w-[88%] h-[88%] rounded-full border border-[rgba(255,0,60,0.4)] shadow-[0_0_40px_rgba(255,0,60,0.12)]"
          aria-hidden="true"
        />
        <div className="relative w-[62%] h-[95%] flex items-end justify-center overflow-hidden [mask-image:linear-gradient(180deg,#000_70%,transparent_100%)]">
          <img
            src="/images/hero-reference.png"
            alt=""
            className="w-full h-full object-cover object-top grayscale contrast-[1.05] opacity-[0.85]"
          />
        </div>
      </div>

      <p className="relative z-[1] m-0 mt-3.5 font-mono text-[11px] font-light tracking-[0.3em] uppercase text-text-dim">
        {siteConfig.firstName}{' '}
        <span className="text-text-subtle">{siteConfig.lastName}</span>
      </p>

      {siteConfig.availableForWork && (
        <p className="relative z-[1] flex items-center gap-2 mt-5 font-mono text-[10px] font-light tracking-[3px] uppercase text-text-dim">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]"
            aria-hidden="true"
          />
          Available for work
        </p>
      )}
    </section>
  );
}
