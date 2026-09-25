import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import TramiteDetail from './pages/TramiteDetail';
import CancelTurno from './pages/CancelTurno';
import LoginAdmin from './pages/LoginAdmin';
import Dashboard from './pages/Dashboard';
import AdminHome from './pages/AdminHome';
import AdminTramites from './pages/AdminTramites';
import AdminAsignacion from './pages/AdminAsignacion';
import Abogados from './pages/Abogados';
import SobreNosotros from './pages/SobreNosotros';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';
import PoliticaCookies from './pages/PoliticaCookies';
import PoliticaReembolsos from './pages/PoliticaReembolsos';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AdminDashboardLayout from './components/layout/AdminDashboardLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import ErrorBoundary from './components/layout/ErrorBoundary';

function ConditionalFooter() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Footer />;
}

function ConditionalNavbar() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Navbar />;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <ConditionalNavbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/abogados" element={<Abogados />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
                <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
                <Route path="/politica-cookies" element={<PoliticaCookies />} />
                <Route path="/politica-reembolsos" element={<PoliticaReembolsos />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/tramites/:id" element={<TramiteDetail />} />
                <Route path="/cancelar" element={<CancelTurno />} />
                <Route path="/login" element={<LoginAdmin />} />
                
                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<AdminHome />} />
                  <Route path="citas" element={<Dashboard />} />
                  <Route path="tramites" element={<AdminTramites />} />
                  <Route path="asignacion" element={<AdminAsignacion />} />
                </Route>
              </Routes>
            </main>
            <ConditionalFooter />
            <CookieBanner />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
