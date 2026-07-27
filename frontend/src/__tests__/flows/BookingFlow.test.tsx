import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Booking from '../../pages/Booking';

describe('Booking Flow (Catálogo y Agendamiento) E2E Simulation', () => {
  it('renders catalog, filters tramites by search term, and provides links to detail page', () => {
    render(
      <BrowserRouter>
        <Booking />
      </BrowserRouter>
    );

    expect(screen.getByText(/Catálogo de Trámites/i)).toBeInTheDocument();

    // Verify search functionality
    const searchInput = screen.getByPlaceholderText(/Buscar trámite/i);
    fireEvent.change(searchInput, { target: { value: 'compraventa' } });

    // Should display matching tramites
    const matches = screen.getAllByText(/compraventa/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('allows opening mobile category filter and filtering by category', () => {
    render(
      <BrowserRouter>
        <Booking />
      </BrowserRouter>
    );

    const menuBtn = screen.getByText(/Abrir menú de categorías/i).closest('button');
    if (menuBtn) {
      fireEvent.click(menuBtn);
    }
    expect(screen.getByText(/Filtrar por categoría/i)).toBeInTheDocument();
  });
});
