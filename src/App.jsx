import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import ScrollToTop from './components/shared/ScrollToTop';
import './index.css';

import Home from './pages/Home';
import Competitions from './pages/Competitions';
import Contact from './pages/Contact';
import Join from './pages/Join';
import Admin from './pages/Admin';
import Info from './pages/Info';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Ensure this is included */}
      <Routes>
        {/* All routes use Layout for common structure */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="competitions" element={<Competitions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="join" element={<Join />} />
          <Route path="info" element={<Info />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
