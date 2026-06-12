import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import LandingPage from './pages/LandingPage';
import FrontendPortfolioPage from './pages/FrontendPortfolioPage';
import CgiReelPage from './pages/CgiReelPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="front-end" element={<FrontendPortfolioPage />} />
      </Route>
      <Route path="3d-environments" element={<CgiReelPage />} />
    </Routes>
  );
}
