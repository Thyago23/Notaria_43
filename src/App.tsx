import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import TramiteDetail from './pages/TramiteDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Abogados from './pages/Abogados';
import SobreNosotros from './pages/SobreNosotros';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/tramites/:id" element={<TramiteDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/abogados" element={<Abogados />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
