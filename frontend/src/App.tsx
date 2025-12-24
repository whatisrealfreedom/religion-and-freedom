import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chapter from './pages/Chapter';
import Resources from './pages/Resources';
import Critics from './pages/Critics';
import LocaleLayout from './i18n/LocaleLayout';
import ScrollToTop from './components/ScrollToTop';

// Component to handle root redirect based on saved locale or default to 'fa'
function RootRedirect() {
  const savedLocale = localStorage.getItem('freedom-locale');
  const defaultLocale = (savedLocale === 'en' || savedLocale === 'fa') ? savedLocale : 'fa';
  return <Navigate to={`/${defaultLocale}`} replace />;
}

// Component to handle 404/fallback redirects
function FallbackRedirect() {
  const savedLocale = localStorage.getItem('freedom-locale');
  const defaultLocale = (savedLocale === 'en' || savedLocale === 'fa') ? savedLocale : 'fa';
  return <Navigate to={`/${defaultLocale}`} replace />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Redirect root to default locale (fa) or saved locale */}
        <Route path="/" element={<RootRedirect />} />

        {/* Locale-prefixed routes: /fa/... and /en/... */}
        {/* Note: React Router v6 doesn't support regex in path, so we validate in LocaleLayout */}
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<Home />} />
          <Route path="chapter/:id" element={<Chapter />} />
          <Route path="resources" element={<Resources />} />
          <Route path="critics" element={<Critics />} />
        </Route>

        {/* Fallback for any unmatched routes */}
        <Route path="*" element={<FallbackRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
