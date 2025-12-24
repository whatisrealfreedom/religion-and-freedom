import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chapter from './pages/Chapter';
import Resources from './pages/Resources';
import Critics from './pages/Critics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLocale } from './i18n/LocaleProvider';

function App() {
  const { locale } = useLocale();
  return (
    <Router>
      <div
        className={
          locale === 'en'
            ? 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50'
            : 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'
        }
      >
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter/:id" element={<Chapter />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/critics" element={<Critics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
