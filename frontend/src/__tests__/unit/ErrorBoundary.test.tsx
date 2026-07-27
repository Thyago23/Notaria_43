import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from '../../components/layout/ErrorBoundary';

const ProblematicComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test Crash Error');
  }
  return <div>Componente Normal Funcionando</div>;
};

describe('ErrorBoundary Component QA Test', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn(); // Suppress expected React error logging during test
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Componente Normal Funcionando')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('¡Vaya! Algo salió mal')).toBeInTheDocument();
    expect(screen.getByText(/Hemos detectado un error inesperado/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Crash Error/i)).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom Error UI</div>}>
        <ProblematicComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
  });
});
