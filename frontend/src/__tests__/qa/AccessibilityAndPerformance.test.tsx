import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from '../../pages/Home';
import Booking from '../../pages/Booking';
import LoginAdmin from '../../pages/LoginAdmin';
import { AuthProvider } from '../../context/AuthContext';

describe('Accessibility (a11y) & Performance QA Test Suite', () => {
  describe('Accessibility Compliance', () => {
    it('ensures Home page images have valid alt text attributes', () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')?.trim()).not.toBe('');
      });
    });

    it('ensures Booking page input has descriptive placeholder or label for screen readers', () => {
      render(
        <BrowserRouter>
          <Booking />
        </BrowserRouter>
      );
      const searchInput = screen.getByPlaceholderText(/Buscar trámite/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('ensures LoginAdmin form inputs are accessible', () => {
      render(
        <AuthProvider>
          <BrowserRouter>
            <LoginAdmin />
          </BrowserRouter>
        </AuthProvider>
      );
      const cedulaInput = screen.getByPlaceholderText(/cédula/i);
      const passInput = screen.getByPlaceholderText(/contraseña/i);
      expect(cedulaInput).toBeInTheDocument();
      expect(passInput).toBeInTheDocument();
    });
  });

  describe('Performance & Memory Benchmark', () => {
    it('renders complex catalog (Booking) within performance budget (< 300ms in jsdom)', () => {
      const start = performance.now();
      render(
        <BrowserRouter>
          <Booking />
        </BrowserRouter>
      );
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(300);
    });

    it('renders Home landing page within performance budget (< 300ms in jsdom)', () => {
      const start = performance.now();
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(300);
    });
  });
});
