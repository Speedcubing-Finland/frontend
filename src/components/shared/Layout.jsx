import Navbar from './Navbar';
import Footer from './Footer';
import Title from './Title';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Map routes to titles
  const pageTitles = {
    '/': 'Speedcubing Finland',
    '/competitions': 'Kilpailut',
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
      {/* Only show title banner on non-home pages */}
      {!isHomePage && <Title>{currentTitle}</Title>}
      
      {/* Full-width container for homepage, constrained for other pages */}
      <div className={isHomePage ? 'main-container-full' : 'main-container'}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Layout;
