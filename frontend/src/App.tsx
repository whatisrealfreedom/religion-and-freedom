import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chapter from './pages/Chapter';
import Resources from './pages/Resources';
import Critics from './pages/Critics';
import { useLocale } from './i18n/LocaleProvider';
import LocaleLayout from './i18n/LocaleLayout';

function App() {
  const { locale } = useLocale();
  return (
    <Router>
      <Routes>
        {/* Redirect root to current locale */}
        <Route path="/" element={<Navigate to={`/${locale}`} replace />} />

        {/* Locale-prefixed routes: /fa/... and /en/... */}
        <Route path="/:locale(en|fa)" element={<LocaleLayout />}>
          <Route index element={<Home />} />
          <Route path="chapter/:id" element={<Chapter />} />
          <Route path="resources" element={<Resources />} />
          <Route path="critics" element={<Critics />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={`/${locale}`} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
