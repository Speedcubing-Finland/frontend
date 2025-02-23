import Navbar from './Navbar';
import Footer from './Footer';
import Title from './Title';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

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
      <Title>{currentTitle}</Title>
      
      {/* Constrained main content */}
      <div className="main-container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Layout;
