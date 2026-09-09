import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cgiProjects } from '../data/cgiProjects';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

// px of vertical scroll consumed per slide transition
const TRANSITION_PX = 900;

// ─────────────────────────────────────────────
//  Root page
// ─────────────────────────────────────────────
export default function CgiReelPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef    = useRef<HTMLDivElement>(null);

  const slides: Array<{ id: string; type: 'intro' | 'project' | 'end'; project?: Project; index?: number }> = [
    { id: 'intro', type: 'intro' },
    ...cgiProjects.map((p, i) => ({ id: p.id, type: 'project' as const, project: p, index: i })),
    { id: 'end', type: 'end' },
  ];

  useEffect(() => {
    const panels = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      panels.slice(1).forEach((panel, i) => {
        const inner = panel.querySelector<HTMLElement>('.slide-inner');
        const img   = panel.querySelector<HTMLElement>('img');

        const st: ScrollTrigger.Vars = {
          trigger: containerRef.current,
          start: () => `top+=${i * TRANSITION_PX} top`,
          end:   () => `top+=${(i + 1) * TRANSITION_PX} top`,
          scrub: 1.6,
        };

        const tl = gsap.timeline({ scrollTrigger: st });

        // 1. Clip-path curtain wipe from bottom
        tl.fromTo(
          panel,
          { clipPath: 'inset(100% 0px 0px 0px)' },
          { clipPath: 'inset(0% 0px 0px 0px)', ease: 'power3.inOut' },
          0
        );

        // 2. Content settles down into place (parallax feel)
        if (inner) {
          tl.fromTo(
            inner,
            { y: 80 },
            { y: 0, ease: 'power2.out' },
            0
          );
        }

        // 3. Image zooms out as it enters (Ken Burns inverse)
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.1 },
            { scale: 1, ease: 'power1.out' },
            0
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Mouse-following cursor circle
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const totalHeight = slides.length * TRANSITION_PX + window.innerHeight;

  return (
    <div className="bg-black" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", cursor: 'none' }}>
      {/* ── Mouse-following scroll cursor ── */}
      <div
        ref={cursorRef}
        aria-hidden
        className="fixed z-[90] pointer-events-none flex items-center justify-center rounded-full border border-white/30"
        style={{
          width: 80,
          height: 80,
          top: -40,
          left: -40,
          backdropFilter: 'invert(0.08)',
        }}
      >
        <span className="text-white/60 text-[8px] tracking-[2.5px] uppercase">Scroll</span>
      </div>

      {/* ── Film grain ── */}
      {/* <FilmGrain /> */}

      {/* ── Letterbox bars ── */}
      <div aria-hidden className="fixed top-0 left-0 right-0 z-[70]" style={{ height: '11vh', background: '#000' }} />
      <div aria-hidden className="fixed bottom-0 left-0 right-0 z-[70]" style={{ height: '11vh', background: '#000' }} />

      {/* ── Nav (inside top bar) ── */}
      <nav className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between px-8"
        style={{ height: '11vh' }}>
        <Link
          to="/"
          className="text-white/40 hover:text-white/90 transition-colors duration-300 text-[9px] tracking-[2.5px] uppercase"
        >
          ← Home
        </Link>
        <span className="text-white/20 text-[8px] tracking-[5px] uppercase">3D · Environments</span>
        <span className="text-white/25 text-[9px] tracking-[2px]">{cgiProjects.length} works</span>
      </nav>

      {/* ── Scroll container ── */}
      <div ref={containerRef} style={{ height: totalHeight }} className="relative">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="fixed left-0 right-0"
            style={{
              top: '11vh',
              bottom: '11vh',
              zIndex: i + 1,
            }}
          >
            {slide.type === 'intro' && <IntroSlide />}
            {slide.type === 'project' && slide.project && (
              <ProjectSlide
                project={slide.project}
                index={slide.index!}
                total={cgiProjects.length}
              />
            )}
            {slide.type === 'end' && <EndSlide />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Film grain
// ─────────────────────────────────────────────
function FilmGrain() {
  return (
    <>
      <svg width="0" height="0" className="fixed" aria-hidden>
        <filter id="cgi-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        aria-hidden
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          opacity: 0.055,
          filter: 'url(#cgi-grain)',
          mixBlendMode: 'screen',
          background: '#888',
        }}
      />
    </>
  );
}
void FilmGrain;

// ─────────────────────────────────────────────
//  Intro slide
// ─────────────────────────────────────────────
function IntroSlide() {
  return (
    <div className="slide-inner w-full h-full bg-neutral-950 flex flex-col justify-end pb-12 px-12 relative overflow-hidden">
      {/* subtle texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(31,224,208,0.04) 0%, transparent 70%)' }}
      />
      <p className="text-white/20 text-[9px] tracking-[5px] uppercase mb-5">Selected Works · 3D Environments</p>
      <h1
        className="text-white font-light leading-[1.0] m-0 italic"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
      >
        Scroll<br />to begin
      </h1>
      <div className="mt-10 flex items-center gap-4">
        <div className="w-12 h-px bg-white/15" />
        <span className="text-white/15 text-[8px] tracking-[4px] uppercase">Scroll down</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Project slide
// ─────────────────────────────────────────────
interface ProjectSlideProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectSlide({ project, index, total }: ProjectSlideProps) {
  const titleLines = project.title.split('\n');

  return (
    // Film gate outer — black padding creates the mask frame around the image
    <div
      className="slide-inner w-full h-full bg-black relative"
      style={{ padding: '6px 10px' }}
    >
      {/* Inner viewport — the actual "projection screen" */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Thin frame border on top of everything */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
        />

      {/* ── Background: video or image ── */}
      {project.coverVideo ? (
        <>
          {project.coverVideo.endsWith('.mp4') ? (
            <video
              src={project.coverVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.9) saturate(1)' }}
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 overflow-hidden"
              style={{ filter: 'brightness(0.9) saturate(1)' }}
            >
              <iframe
                src={project.coverVideo}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '177.78vh',
                  height: '56.25vw',
                  minWidth: '100%',
                  minHeight: '100%',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )}
          {/* Fallback image shown until video loads */}
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover -z-10"
              style={{ filter: 'brightness(0.9) saturate(1)' }}
            />
          )}
        </>
      ) : project.coverImage ? (
        <img
          src={project.coverImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.9) saturate(1)' }}
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" />
      )}

      {/* ── Gradient overlays ── */}
      {/* bottom-left burn for text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.0) 70%)',
        }}
      />
      {/* bottom strip */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '45%', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
      />
      {/* right-side subtle vignette for quotes */}
      <div
        className="absolute top-0 right-0 bottom-0"
        style={{ width: '35%', background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 100%)' }}
      />

      {/* ── TOP LEFT: year + meta + badge ── */}
      <div className="absolute top-6 left-10 flex flex-col gap-2">
        <span className="text-white/50 text-[11px] tracking-[1px]">{project.year}</span>
        {project.meta && (
          <span className="text-white/25 text-[8px] tracking-[2px] uppercase leading-relaxed max-w-[260px]">
            {project.meta}
          </span>
        )}
        {project.badge && (
          <div className="mt-1">
            <LaurelBadge text={project.badge} />
          </div>
        )}
      </div>

      {/* ── RIGHT: quotes ── */}
      {project.quotes && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-0 w-[220px]">
          {project.quotes.map((q, qi) => (
            <div key={qi}>
              {qi > 0 && <div className="w-full h-px bg-white/10 my-4" />}
              <div className="text-right">
                {qi === 0 && (
                  <p className="text-white/20 text-[7px] tracking-[3px] uppercase mb-1.5">
                    Next viewing
                  </p>
                )}
                <p
                  className="text-white m-0 leading-[1.2]"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                  }}
                >
                  {q.split('\n').map((line, li) => (
                    <span key={li}>{line}{li < q.split('\n').length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── BOTTOM LEFT: title + metadata ── */}
      <div className="absolute bottom-8 left-10 max-w-[55%]">
        {/* counter */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[#1fe0d0]/50 text-[8px] tracking-[3px] uppercase">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="w-8 h-px bg-white/15" />
        </div>

        {/* main title */}
        <h2
          className="m-0 text-white font-light leading-[1.0] italic"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            letterSpacing: '-0.01em',
          }}
        >
          {titleLines.map((line, li) => (
            <span key={li}>
              {line}
              {li < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>

        {/* director / meta row */}
        <div className="mt-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-[7.5px] tracking-[2.5px] uppercase">Artist</span>
            <span className="text-white/50 text-[7.5px] tracking-[1.5px] uppercase">
              Aleix Garcia Gispert
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-[7.5px] tracking-[2.5px] uppercase">Category</span>
            <span className="text-white/50 text-[7.5px] tracking-[1.5px] uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* tags row */}
        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[#1fe0d0]/40 text-[7px] tracking-[1.5px] uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* artstation link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 mt-6 text-white/20 hover:text-white/70 transition-colors duration-300 text-[8px] tracking-[2px] uppercase"
          >
            <span>View on ArtStation</span>
            <span>↗</span>
          </a>
        )}
      </div>
      </div>{/* end inner viewport */}
    </div>
  );
}

// ─────────────────────────────────────────────
//  End slide
// ─────────────────────────────────────────────
function EndSlide() {
  return (
    <div className="slide-inner w-full h-full bg-black flex flex-col items-center justify-center gap-5">
      <div className="w-px h-14 bg-white/10" />
      <span className="text-white/15 text-[8px] tracking-[5px] uppercase">End of reel</span>
      <div className="w-px h-14 bg-white/10" />
      <Link
        to="/"
        className="text-[#1fe0d0]/30 hover:text-[#1fe0d0]/80 transition-colors duration-300 text-[9px] tracking-[2.5px] uppercase"
      >
        ← Return home
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Laurel badge SVG
// ─────────────────────────────────────────────
function LaurelBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* left laurel */}
      <svg width="22" height="30" viewBox="0 0 22 30" fill="none" className="opacity-40">
        <path d="M11 2 C6 6, 2 10, 2 15 C2 20, 5 24, 8 26" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M11 2 C8 7, 6 10, 7 14" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M11 7 C8 10, 5 13, 5 17" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M11 12 C8 14, 5 17, 5 21" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M11 17 C8 19, 6 22, 7 25" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M8 26 C9 27, 10 28, 11 28" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>

      <div className="flex flex-col items-center">
        <span className="text-white/35 text-[7px] tracking-[2px] uppercase leading-tight text-center">
          {text.split('·').map((part, i) => (
            <span key={i} className="block">{part.trim()}</span>
          ))}
        </span>
      </div>

      {/* right laurel (mirrored) */}
      <svg width="22" height="30" viewBox="0 0 22 30" fill="none" className="opacity-40 scale-x-[-1]">
        <path d="M11 2 C6 6, 2 10, 2 15 C2 20, 5 24, 8 26" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M11 2 C8 7, 6 10, 7 14" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M11 7 C8 10, 5 13, 5 17" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M11 12 C8 14, 5 17, 5 21" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M11 17 C8 19, 6 22, 7 25" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        <path d="M8 26 C9 27, 10 28, 11 28" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
