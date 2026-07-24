import { siteConfig, gmailComposeUrl } from '../data/siteConfig';
import Lanyard from '../components/Lanyard';

export default function ContactPage() {
  return (
    <section
      className="relative flex flex-1 min-h-[min(88vh,900px)] items-center gap-10 max-lg:flex-col max-lg:gap-6"
      aria-label="Contact"
    >
      <div className="flex-1 flex flex-col justify-center max-w-xl">
        <p className="m-0 font-mono text-[11px] font-light tracking-[0.3em] uppercase text-accent">
          Get in touch
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-text">
          Contact
        </h1>

        <dl className="mt-10 flex flex-col gap-7">
          <div>
            <dt className="font-mono text-[10px] tracking-[2px] uppercase text-text-dim">Email</dt>
            <dd className="mt-1.5 m-0">
              <a
                href={gmailComposeUrl(siteConfig.email)}
                target="_blank"
                rel="noreferrer noopener"
                className="text-lg font-medium text-text no-underline transition-colors duration-200 hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] tracking-[2px] uppercase text-text-dim">Location</dt>
            <dd className="mt-1.5 m-0 text-lg font-medium text-text">
              Barcelona, Spain <span className="text-text-subtle">— Europe</span>
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[10px] tracking-[2px] uppercase text-text-dim">Socials</dt>
            <dd className="mt-2.5 m-0 flex flex-wrap gap-x-6 gap-y-2">
              {siteConfig.socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="font-mono text-xs tracking-[1.5px] uppercase text-text-nav no-underline transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative flex-1 w-full h-[min(88vh,900px)] max-lg:h-[560px]">
        <Lanyard
          position={[0, 0, 11]}
          fov={22}
          gravity={[0, -40, 0]}
          frontImage="/images/lanyard-front.jpg"
          backImage="/images/lanyard-front.jpg"
          imageFit="cover"
          lanyardImage="/images/lanyard-band.svg"
        />
      </div>
    </section>
  );
}
