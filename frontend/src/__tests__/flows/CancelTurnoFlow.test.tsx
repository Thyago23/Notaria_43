import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CancelTurno from '../../pages/CancelTurno';
import { apiClient } from '../../api/client';

vi.mock('../../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

describe('CancelTurno Flow E2E Simulation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('searches for a turno code and displays appointment details, allowing cancellation', async () => {
    const mockTurno = {
      id: 'TURNO-1234',
      status: 'PENDIENTE',
      fecha: '2026-08-01T00:00:00.000Z',
      horaInicio: '2026-08-01T14:00:00.000Z',
      horaFin: '2026-08-01T14:30:00.000Z',
      tramite: { nombre: 'Declaración Juramentada' },
    };

    (apiClient.get as any).mockResolvedValueOnce({ data: { data: mockTurno } });
    (apiClient.delete as any).mockResolvedValueOnce({ data: { success: true } });

    render(
      <BrowserRouter>
        <CancelTurno />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Ej. 12345678/i);
    const searchBtn = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'TURNO-1234' } });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText('Detalles de la Cita')).toBeInTheDocument();
      expect(screen.getByText('Declaración Juramentada')).toBeInTheDocument();
    });

    const cancelBtn = screen.getByText('Confirmar Cancelación');
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.getByText('¡Cita Cancelada Exitosamente!')).toBeInTheDocument();
    });
  });

  it('displays error message when turno code is invalid or not found', async () => {
    (apiClient.get as any).mockRejectedValueOnce({
      response: { data: { message: 'El turno TURNO-INVALIDO no existe' } },
    });

    render(
      <BrowserRouter>
        <CancelTurno />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Ej. 12345678/i);
    const searchBtn = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'TURNO-INVALIDO' } });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText('El turno TURNO-INVALIDO no existe')).toBeInTheDocument();
    });
  });
});
