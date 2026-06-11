import { cgiProjects } from '../data/cgiProjects';
import PortfolioPageLayout from './PortfolioPageLayout';

export default function CgiPortfolioPage() {
  return <PortfolioPageLayout theme="cgi" projects={cgiProjects} />;
}
