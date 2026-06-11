import { Outlet } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import Logo from '../components/Logo';
import StaggeredMenu from '../components/StaggeredMenu';
import SocialLinks from '../components/SocialLinks';
import FaultyTerminal from '../components/FaultyTerminal';

export default function SiteLayout() {
  return (
    <div className="relative min-h-screen max-w-full overflow-x-hidden bg-bg text-text px-4 py-5 sm:px-6 md:px-10 md:py-8 grid grid-rows-[auto_1fr_auto]">
      {/* WebGL background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <FaultyTerminal
          scale={1.8}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.25}
          scanlineIntensity={0.4}
          glitchAmount={0.4}
          flickerAmount={0.3}
          noiseAmp={0.6}
          curvature={0}
          tint="#ff003c"
          mouseReact={false}
          brightness={0.12}
        />
      </div>

      <header className="relative z-[2] flex items-start justify-between">
        <Logo />
      </header>

      <StaggeredMenu items={siteConfig.navLinks} socialItems={siteConfig.socialLinks} />

      <main className="relative z-[1] flex flex-col justify-start min-h-0 py-4">
        <Outlet />
      </main>

      <footer className="relative z-[2] flex items-end justify-between gap-6 flex-wrap max-md:flex-col max-md:items-start">
        <div>
          <p className="m-0 text-lg font-semibold">{siteConfig.title}</p>
          <p className="mt-1 text-base font-medium text-text-subtle">{siteConfig.subtitle}</p>
          <p className="mt-2.5 font-mono text-[11px] tracking-[2px] text-text-dim">
            {siteConfig.location}{' '}
            <span className="text-accent">{siteConfig.locationCode}</span>
          </p>
        </div>
        <SocialLinks links={siteConfig.socialLinks} />
      </footer>
    </div>
  );
}
