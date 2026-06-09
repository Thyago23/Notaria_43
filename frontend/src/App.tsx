import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import TramiteDetail from './pages/TramiteDetail';
import LoginAdmin from './pages/LoginAdmin';
import Dashboard from './pages/Dashboard';
import AdminHome from './pages/AdminHome';
import AdminTramites from './pages/AdminTramites';
import AdminAsignacion from './pages/AdminAsignacion';
import Abogados from './pages/Abogados';
import SobreNosotros from './pages/SobreNosotros';
import Footer from './components/layout/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AdminDashboardLayout from './components/layout/AdminDashboardLayout';
import ScrollToTop from './components/layout/ScrollToTop';

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
              <Route path="/booking" element={<Booking />} />
              <Route path="/tramites/:id" element={<TramiteDetail />} />
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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
