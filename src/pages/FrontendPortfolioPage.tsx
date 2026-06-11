import { frontendProjects } from '../data/frontendProjects';
import PortfolioPageLayout from './PortfolioPageLayout';

export default function FrontendPortfolioPage() {
  return <PortfolioPageLayout theme="frontend" projects={frontendProjects} />;
}
