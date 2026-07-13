import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiClient } from '../api/client';

const CancelTurno = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [turnoId, setTurnoId] = useState('');
  const [turnoData, setTurnoData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [searched, setSearched] = useState(false);

  // Handle QR code scan from URL parameter
  useEffect(() => {
    const idFromQR = searchParams.get('id');
    if (idFromQR) {
      setTurnoId(idFromQR);
      handleSearchFromQR(idFromQR);
    }
  }, [searchParams]);

  const handleSearchFromQR = async (id: string) => {
    setError('');
    setTurnoData(null);
    setSuccess(false);
    setSearched(true);
    setLoading(true);

    try {
      const response = await apiClient.get(`/turnos/public/${id}`);
      setTurnoData(response.data.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Turno no encontrado';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTurnoData(null);
    setSuccess(false);
    setSearched(true);

    if (!turnoId.trim()) {
      setError('Por favor ingrese el código de turno');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.get(`/turnos/public/${turnoId}`);
      setTurnoData(response.data.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Turno no encontrado';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!turnoData) return;

    setLoading(true);
    setError('');

    try {
      await apiClient.delete(`/turnos/public/${turnoId}`);
      setSuccess(true);
      setTurnoData(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cancelar el turno';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeDate: string) => {
    const date = new Date(timeDate);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const formatDate = (dateValue: string) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString('es-EC', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-light min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/booking')}
          className="text-gray-500 hover:text-[#8cc550] mb-4 sm:mb-6 flex items-center transition-colors font-medium text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a Trámites y Documentos
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-dark p-6 sm:p-8 md:px-12 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">Cancelar Cita</h1>
            <p className="mt-2 opacity-90 text-sm sm:text-base">Ingrese el código de turno de su comprobante PDF</p>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            {success ? (
              <div className="animate-fadeIn text-center py-6 sm:py-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">¡Cita Cancelada Exitosamente!</h2>
                <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                  Su cita ha sido cancelada y el horario está disponible para otros ciudadanos.
                </p>
                <button
                  onClick={() => navigate('/booking')}
                  className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-6 sm:px-8 rounded transition-colors inline-flex items-center w-full sm:w-auto"
                >
                  Agendar nueva cita
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código de Turno
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                      type="text"
                      value={turnoId}
                      onChange={(e) => setTurnoId(e.target.value)}
                      placeholder="Ej. 12345678-1234-5678-9012-345678901234"
                      className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#8cc550] outline-none transition-shadow uppercase text-sm"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    El código de turno se encuentra en su comprobante PDF
                  </p>
                </form>

                {error && searched && !turnoData && (
                  <div className="bg-slate-50 border-l-4 border-slate-500 p-4 mb-6">
                    <p className="text-slate-700 text-sm">{error}</p>
                  </div>
                )}

                {turnoData && (
                  <div className="animate-fadeIn">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Detalles de la Cita</h2>
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 mb-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Trámite:</span>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">{turnoData.tramite.nombre}</p>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Fecha:</span>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">{formatDate(turnoData.fecha)}</p>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Horario:</span>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {formatTime(turnoData.horaInicio)} - {formatTime(turnoData.horaFin)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm text-gray-500">Estado:</span>
                          <p className={`font-medium ${
                            turnoData.status === 'PENDIENTE' ? 'text-green-600' :
                            turnoData.status === 'CANCELADO' ? 'text-slate-600' :
                            'text-gray-600'
                          }`}>
                            {turnoData.status === 'PENDIENTE' ? 'Pendiente' :
                             turnoData.status === 'CANCELADO' ? 'Cancelado' :
                             turnoData.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    {turnoData.status === 'PENDIENTE' ? (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                          ¿Está seguro que desea cancelar esta cita? Esta acción no se puede deshacer.
                        </p>
                        <button
                          onClick={handleCancel}
                          disabled={loading}
                          className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Cancelando...' : 'Confirmar Cancelación'}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border-l-4 border-slate-500 p-4">
                        <p className="text-slate-700 text-sm">
                          {turnoData.status === 'CANCELADO' 
                            ? 'Este turno ya ha sido cancelado anteriormente.'
                            : 'Este turno ya fue atendido y no puede ser cancelado.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelTurno;
