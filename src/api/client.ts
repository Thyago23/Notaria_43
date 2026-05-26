import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

// Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);

// Axios instance for custom backend (colleague's database)
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // To be updated later
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data to use until backend is ready
export const MOCK_TRAMITES = [
  { id: '1', nombre: 'Escrituras', descripcion: 'Trámite de escrituración pública', requisitos: ['DNI', 'Minuta'] },
  { id: '2', nombre: 'Poderes', descripcion: 'Otorgamiento de poder notarial', requisitos: ['DNI', 'Datos del apoderado'] },
  { id: '3', nombre: 'Testamentos', descripcion: 'Elaboración de testamento', requisitos: ['DNI', 'Certificado médico'] },
];
