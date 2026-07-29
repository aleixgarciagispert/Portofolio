import { useEffect, useRef } from 'react';
import './PixelCard.css';

class Pixel {
  width: number; height: number; ctx: CanvasRenderingContext2D;
  x: number; y: number; color: string; speed: number;
  size: number; sizeStep: number; minSize: number;
  maxSizeInteger: number; maxSize: number; delay: number;
  counter: number; counterStep: number;
  isIdle: boolean; isReverse: boolean; isShimmer: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width; this.height = canvas.height; this.ctx = context;
    this.x = x; this.y = y; this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    this.size = 0; this.sizeStep = Math.random() * 0.4; this.minSize = 0.5;
    this.maxSizeInteger = 2; this.maxSize = this.rand(this.minSize, this.maxSizeInteger);
    this.delay = delay; this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false; this.isReverse = false; this.isShimmer = false;
  }

  rand(min: number, max: number) { return Math.random() * (max - min) + min; }

  draw() {
    const o = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + o, this.y + o, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer(); else this.size += this.sizeStep;
    this.draw();
  }

  disappear() {
    this.isShimmer = false; this.counter = 0;
    if (this.size <= 0) { this.isIdle = true; return; }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

function effectiveSpeed(value: number, reduced: boolean) {
  if (value <= 0 || reduced) return 0;
  if (value >= 100) return 0.1;
  return value * 0.001;
}

const VARIANTS: Record<string, { gap: number; speed: number; colors: string }> = {
  frontend: { gap: 7,  speed: 35, colors: '#ff003c,#cc002e,#4d0012' },
  cgi:      { gap: 7,  speed: 30, colors: '#1fe0d0,#0fb8aa,#064d47' },
  default:  { gap: 8,  speed: 25, colors: '#333333,#1f1f1f,#111111' },
};

interface PixelCardProps {
  variant?: string;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function PixelCard({
  variant = 'default', gap, speed, colors, noFocus = false,
  className = '', style, as: Tag = 'div', href, target, rel, onClick, children,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const timePrevRef = useRef(performance.now());
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  const cfg = VARIANTS[variant] ?? VARIANTS.default;
  const fGap    = gap    ?? cfg.gap;
  const fSpeed  = speed  ?? cfg.speed;
  const fColors = colors ?? cfg.colors;

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext('2d')!;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    canvasRef.current.style.width  = `${w}px`;
    canvasRef.current.style.height = `${h}px`;

    const cols = fColors.split(',');
    const pxs: Pixel[] = [];
    for (let x = 0; x < w; x += fGap) {
      for (let y = 0; y < h; y += fGap) {
        const color = cols[Math.floor(Math.random() * cols.length)];
        const dist  = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2);
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, effectiveSpeed(fSpeed, reduced), reduced ? 0 : dist));
      }
    }
    pixelsRef.current = pxs;
  };

  const doAnimate = (fn: 'appear' | 'disappear') => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fn));
    const now = performance.now();
    const passed = now - timePrevRef.current;
    if (passed < 1000 / 60) return;
    timePrevRef.current = now - (passed % (1000 / 60));
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    let allIdle = true;
    for (const px of pixelsRef.current) { px[fn](); if (!px.isIdle) allIdle = false; }
    if (allIdle) cancelAnimationFrame(animationRef.current);
  };

  const play = (fn: 'appear' | 'disappear') => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(fn));
  };

  useEffect(() => {
    initPixels();
    const obs = new ResizeObserver(initPixels);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => { obs.disconnect(); cancelAnimationFrame(animationRef.current); };
  }, [fGap, fSpeed, fColors]);

  const props: Record<string, unknown> = {
    ref: containerRef,
    className: `pixel-card ${className}`,
    style,
    onMouseEnter: () => play('appear'),
    onMouseLeave: () => play('disappear'),
    onFocus:  noFocus ? undefined : (e: React.FocusEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) play('appear'); },
    onBlur:   noFocus ? undefined : (e: React.FocusEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) play('disappear'); },
    tabIndex: noFocus ? -1 : 0,
  };
  if (href) { props.href = href; props.target = target; props.rel = rel; }
  if (onClick) { props.onClick = onClick; }

  return (
    <Tag {...props}>
      <canvas className="pixel-canvas" ref={canvasRef} />
      {children}
    </Tag>
  );
}
