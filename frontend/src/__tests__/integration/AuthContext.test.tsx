import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';

vi.mock('../../api/client', () => ({
  apiClient: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="user-status">{user ? `Logged in as ${user.nombres}` : 'Logged out'}</span>
      <button onClick={() => login({ cedula: '1712345678', password: 'secretPassword' } as any)}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext Integration & Security Test', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides logged out state initially when localStorage is empty', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged out');
  });

  it('stores token and user in localStorage upon successful login', async () => {
    (apiClient.post as any).mockResolvedValueOnce({
      data: {
        data: {
          user: { id: '1', nombres: 'Administrador', role: 'ADMINISTRATIVO' },
          token: 'mock_jwt_token_admin_123',
        },
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Administrador');
    });
    expect(localStorage.getItem('auth_token')).toBe('mock_jwt_token_admin_123');
    expect(localStorage.getItem('auth_user')).toContain('Administrador');
  });

  it('removes credentials from localStorage on logout', async () => {
    localStorage.setItem('auth_token', 'sample_token');
    localStorage.setItem('auth_user', JSON.stringify({ id: '1', nombres: 'Test', role: 'ADMINISTRATIVO' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Test');
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged out');
    });
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
  });

  it('handles corrupted localStorage JSON gracefully without crashing', () => {
    localStorage.setItem('auth_token', 'sample_token');
    localStorage.setItem('auth_user', 'invalid_json_{{');

    expect(() => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    }).not.toThrow();
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged out');
  });
});
