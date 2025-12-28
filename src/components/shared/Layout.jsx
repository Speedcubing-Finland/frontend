import Navbar from './Navbar';
import Footer from './Footer';
import Title from './Title';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  
  // Pages that have their own hero sections (don't show old title banner)
  const pagesWithHero = ['/', '/competitions'];
  const hasOwnHero = pagesWithHero.includes(location.pathname);

  // Map routes to titles (for pages without custom hero)
  const pageTitles = {
    '/contact': 'Ota yhteyttä',
    '/join': 'Jäseneksi',
    '/info': 'Tietoa',
    '/admin': 'Admin Panel',
  };

  // Get the title based on the current route
  const currentTitle = pageTitles[location.pathname] || 'Page';

  return (
    <>
      <Navbar />
      {/* Only show title banner on pages without their own hero */}
      {!hasOwnHero && <Title>{currentTitle}</Title>}
      
      {/* Full-width container for pages with hero, constrained for others */}
      <div className={hasOwnHero ? 'main-container-full' : 'main-container'}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Layout;
