import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '../../components/layout/Navbar';
import { AuthProvider } from '../../context/AuthContext';

describe('Navbar Component Unit Test', () => {
  it('renders Notaría 43 branding and navigation links', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/Notaria 43/i)).toBeInTheDocument();
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Sobre la notaría/i)).toBeInTheDocument();
    expect(screen.getByText(/Abogados/i)).toBeInTheDocument();
    expect(screen.getByText(/Trámites y documentos/i)).toBeInTheDocument();
    expect(screen.getByText(/ACCEDER/i)).toBeInTheDocument();
  });
});
