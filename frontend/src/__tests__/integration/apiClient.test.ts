import { describe, it, expect, beforeEach } from 'vitest';
import { apiClient } from '../../api/client';

describe('Axios API Client Security & Interceptor Test', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('injects Authorization Bearer token from localStorage into headers', async () => {
    localStorage.setItem('auth_token', 'test_secure_jwt_token_999');
    
    // Simulate request interceptor handler
    const interceptors = (apiClient.interceptors.request as any).handlers;
    expect(interceptors.length).toBeGreaterThan(0);
    
    const requestHandler = interceptors[0].fulfilled;
    const config = { headers: {} as Record<string, string> };
    const result = await requestHandler(config);
    
    expect(result.headers.Authorization).toBe('Bearer test_secure_jwt_token_999');
  });

  it('does not inject Authorization header if localStorage token is absent', async () => {
    const interceptors = (apiClient.interceptors.request as any).handlers;
    const requestHandler = interceptors[0].fulfilled;
    const config = { headers: {} as Record<string, string> };
    const result = await requestHandler(config);
    
    expect(result.headers.Authorization).toBeUndefined();
  });
});
