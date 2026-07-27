import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import SobreNosotros from '../../pages/SobreNosotros';

describe('SobreNosotros Page Unit Test', () => {
  it('renders institutional values and legal framework', () => {
    render(
      <BrowserRouter>
        <SobreNosotros />
      </BrowserRouter>
    );
    expect(screen.getByText(/¿Quiénes Somos?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sustento Constitucional/i)).toBeInTheDocument();
    expect(screen.getByText(/artículo 200 de la Constitución de la República del Ecuador/i)).toBeInTheDocument();
  });
});
