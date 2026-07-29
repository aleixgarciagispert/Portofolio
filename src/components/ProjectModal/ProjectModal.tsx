import { useEffect, useState } from 'react';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const TRANSITION_MS = 220;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsVisible(false);
    window.setTimeout(onClose, TRANSITION_MS);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gallery = [project.coverImage, ...(project.images ?? [])].filter(
    (src): src is string => Boolean(src),
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={requestClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-bg-elevated shadow-2xl transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/90 hover:text-white hover:bg-black/70 transition-colors"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            &times;
          </span>
        </button>

        {gallery.length > 0 && (
          <div className="flex gap-1 overflow-x-auto snap-x snap-mandatory border-b border-border">
            {gallery.map((src, index) => (
              <img
                key={src + index}
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-48 w-full shrink-0 snap-center object-cover"
              />
            ))}
          </div>
        )}

        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="project-modal-title" className="m-0 text-lg font-normal tracking-[0.01em]">
              {project.title}
            </h2>
            <span className="font-mono text-[11px] font-light text-text-dim shrink-0">
              {project.year}
            </span>
          </div>

          <p className="mt-2 text-sm font-light leading-[1.6] text-text-subtle">
            {project.description}
          </p>

          {project.overview && (
            <p className="mt-3 text-sm font-light leading-[1.6] text-text-subtle">
              {project.overview}
            </p>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {project.highlights.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm font-light leading-[1.5] text-text-subtle"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-frontend" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          <div className="font-mono text-[10px] font-light tracking-[1px] mt-3 uppercase text-frontend">
            {project.tags.join(' · ')}
          </div>

          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 rounded border border-frontend px-4 py-2 font-mono text-[11px] tracking-[1px] uppercase text-frontend hover:bg-frontend hover:text-bg-elevated transition-colors"
            >
              View Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
