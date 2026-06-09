import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import TramiteDetail from './pages/TramiteDetail';
import LoginAdmin from './pages/LoginAdmin';
import Dashboard from './pages/Dashboard';
import Abogados from './pages/Abogados';
import SobreNosotros from './pages/SobreNosotros';
import Footer from './components/layout/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AdminDashboardLayout from './components/layout/AdminDashboardLayout';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="citas" element={<Dashboard />} />
                <Route path="tramites" element={<Dashboard />} />
                <Route path="asignacion" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
