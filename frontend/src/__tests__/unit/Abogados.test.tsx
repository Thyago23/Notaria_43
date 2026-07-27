import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Abogados from '../../pages/Abogados';

describe('Abogados Page Unit Test', () => {
  it('renders staff members and their roles', () => {
    render(
      <BrowserRouter>
        <Abogados />
      </BrowserRouter>
    );
    expect(screen.getByText(/Nuestro/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Equipo Profesional/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Mgs. Dr. Fernando Iván Castro Salazar/i)).toBeInTheDocument();
    expect(screen.getByText(/Notario Principal/i)).toBeInTheDocument();
  });
});
