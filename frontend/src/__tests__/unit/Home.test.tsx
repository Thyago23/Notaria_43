import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from '../../pages/Home';

describe('Home Page Unit Test', () => {
  it('renders Hero section and booking CTA button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/¡La/i)).toBeInTheDocument();
    expect(screen.getByText(/Notaria 43/i)).toBeInTheDocument();
    expect(screen.getByText(/mejorará su vida!/i)).toBeInTheDocument();
    const ctas = screen.getAllByText(/¡Agenda tu cita ahora!/i);
    expect(ctas.length).toBeGreaterThan(0);
  });
});
