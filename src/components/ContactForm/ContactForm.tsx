import type { PortfolioTheme } from '../../types';

interface ContactFormProps {
  theme?: PortfolioTheme;
}

export default function ContactForm({ theme = 'frontend' }: ContactFormProps) {
  const isFrontend = theme === 'frontend';
  const focusBorder = isFrontend
    ? 'focus:border-[rgba(47,168,79,0.5)]'
    : 'focus:border-[rgba(31,224,208,0.5)]';
  const submitStyle = isFrontend
    ? 'bg-frontend text-[#0a0a0c]'
    : 'bg-cgi text-cgi-text-on';

  const fieldClass = `bg-bg-elevated border border-border rounded-[6px] px-4 py-3.5 text-text font-sans text-[15px] transition-colors duration-200 resize-y outline-none ${focusBorder}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <form className="flex flex-col gap-5 max-w-[480px]" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="font-mono text-[11px] tracking-[1.5px] text-text-subtle uppercase">
          Name
        </label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="font-mono text-[11px] tracking-[1.5px] text-text-subtle uppercase">
          Email
        </label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-mono text-[11px] tracking-[1.5px] text-text-subtle uppercase">
          Message
        </label>
        <textarea id="contact-message" name="message" rows={5} required className={fieldClass} />
      </div>
      <button
        type="submit"
        className={`self-start border-none cursor-pointer px-7 py-3.5 rounded-[6px] font-mono text-xs tracking-[1.5px] transition-[transform,opacity] duration-200 hover:-translate-y-0.5 ${submitStyle}`}
      >
        Send message →
      </button>
    </form>
  );
}
