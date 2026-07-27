import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/layout/Footer';

describe('Footer Component Unit Test', () => {
  it('renders footer information, copyright and links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(/Notaría 43/i)).toBeInTheDocument();
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
  });
});
