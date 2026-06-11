export type PortfolioTheme = 'frontend' | 'cgi';

export interface SocialLink {
  label: string;
  href: string;
}

export interface NavLinkItem {
  label: string;
  to: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  subtitle: string;
  location: string;
  locationCode: string;
  email: string;
  availableForWork: boolean;
  year: number;
  socialLinks: SocialLink[];
  navLinks: NavLinkItem[];
  brandLabel: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  year: number;
  tags: string[];
  category: string;
  aspectRatio: string;
  featured?: boolean;
  coverLabel?: string;
  link?: string;
}

export interface PortfolioSection {
  theme: PortfolioTheme;
  slug: string;
  label: string;
  shortLabel: string;
  sectionNumber: string;
  heading: string;
  description: string;
  techStack: string;
  filters: string[];
  contactCta: string;
  projectCount: number;
  yearRange: string;
}

export interface FilterOption {
  label: string;
  value: string;
}
