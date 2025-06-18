import { Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import Home from './pages/home';
import { Toaster } from './components/ui/sonner';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try native scroll restoration first
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Fallback for browsers that don't support scrollRestoration
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <main className="flex grow flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Toaster />
    </div>
  );
}

export default App;
