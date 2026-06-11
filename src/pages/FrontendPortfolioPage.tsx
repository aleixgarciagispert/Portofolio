import { frontendProjects } from '../data/site';
import PortfolioPageLayout from './PortfolioPageLayout';

export default function FrontendPortfolioPage() {
  return <PortfolioPageLayout theme="frontend" projects={frontendProjects} />;
}
