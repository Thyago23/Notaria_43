import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateBookingPDF } from '../utils/pdfGenerator';
import { apiClient } from '../api/client';
import { TRAMITES_DATA } from '../data/tramites';

const TramiteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tramite, setTramite] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_email: '',
    fecha: '',
    hora: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('ID de trámite inválido');
      setLoading(false);
      return;
    }

    const localTramite = TRAMITES_DATA.find((tramite) => tramite.id === id);

    if (!localTramite) {
      setError('Trámite no encontrado');
      setLoading(false);
      return;
    }

    setTramite(localTramite);
    setLoading(false);

    apiClient
      .get('/tramites')
      .then((response) => {
        const backendTramite = response.data.data.find((item: any) => item.nombre === localTramite.nombre);
        if (backendTramite) {
          setTramite((prev: any) => (prev ? { ...prev, backendId: backendTramite.id } : prev));
        }
      })
      .catch((fetchError) => {
        console.error('Error cargando IDs de trámite:', fetchError);
      });
  }, [id]);

  const [showBookingForm, setShowBookingForm] = useState(false);

  const getMinDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  };

  const getAvailableHours = () => {
    const slots = [];
    for (let h = 8; h < 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        const totalMin = h * 60 + m;
        if (totalMin >= 12 * 60 + 30 && totalMin < 14 * 60) continue;
        const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        slots.push(label);
      }
    }
    return slots;
  };

  const getFilteredHours = () => {
    const allSlots = getAvailableHours();
    if (!formData.fecha) return allSlots;

    const today = new Date();
    const selectedDate = new Date(formData.fecha + 'T00:00:00');
    const isToday = selectedDate.toDateString() === today.toDateString();

    if (!isToday) return allSlots;

    const nowMin = today.getHours() * 60 + today.getMinutes() + 30;
    return allSlots.filter(slot => {
      const [h, m] = slot.split(':').map(Number);
      return h * 60 + m > nowMin;
    });
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setFormData({ ...formData, fecha: '', hora: '' });
      return;
    }
    const selected = new Date(value + 'T00:00:00');
    const day = selected.getDay();
    if (day === 0 || day === 6) {
      alert('Por favor seleccione un día de Lunes a Viernes.');
      return;
    }
    setFormData({ ...formData, fecha: value, hora: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (!formData.fecha || !formData.hora) {
      setBookingError('Seleccione una fecha y hora válida.');
      return;
    }

    if (!tramite.backendId) {
      setBookingError('No se pudo obtener el identificador del trámite. Intente nuevamente.');
      return;
    }

    try {
      const response = await apiClient.post('/turnos/guest', {
        tramiteId: tramite.backendId,
        fecha: formData.fecha,
        horaInicio: formData.hora,
        clienteNombre: formData.cliente_nombre,
        clienteEmail: formData.cliente_email,
        notas: '',
      });

      generateBookingPDF({
        cliente_nombre: formData.cliente_nombre,
        cliente_email: formData.cliente_email,
        tramite_nombre: tramite.nombre,
        fecha_hora: `${formData.fecha}T${formData.hora}`,
        turnoId: response.data.data.id,
      });

      setBookingSuccess(true);
    } catch (submitError) {
      console.error('Error reservando turno:', submitError);
      const message = (submitError as any)?.message || 'Error al reservar cita...';
      setBookingError(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-lg text-gray-700">Cargando trámite...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={() => navigate('/booking')} className="text-primary hover:underline">
          Volver a la lista de trámites
        </button>
      </div>
    );
  }

  if (!tramite) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Trámite no encontrado</h2>
        <button onClick={() => navigate('/booking')} className="text-primary hover:underline">
          Volver a la lista de trámites
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
      <button
        onClick={() => navigate('/booking')}
        className="text-gray-500 hover:text-[#8cc550] mb-6 flex items-center transition-colors font-medium text-sm"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a Trámites
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-dark p-8 md:px-12 text-white">
          <span className="text-[#8cc550] font-medium text-sm tracking-wider uppercase mb-2 block">
            {tramite.categoria || tramite.descripcion || 'Trámite'}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">{tramite.nombre}</h1>
        </div>

        <div className="p-8 md:p-12">
          {bookingSuccess ? (
            <div className="animate-fadeIn text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Cita Reservada con Éxito!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Su comprobante en PDF se ha descargado automáticamente. Por favor, guárdelo y preséntelo el día de su cita junto con los requisitos.
              </p>
              <button
                onClick={() => navigate('/booking')}
                className="bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-8 rounded transition-colors inline-flex items-center"
              >
                Volver a la lista de trámites
              </button>
            </div>
          ) : !showBookingForm ? (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-[#8cc550]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Requisitos Necesarios
              </h2>

              <ul className="space-y-4 mb-10 text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-200">
                {tramite.requisitos.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-3 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="text-sm text-gray-500 mb-4">¿Cuenta con todos los requisitos necesarios para este trámite?</p>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full md:w-auto bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-8 rounded transition-colors text-center inline-block"
                >
                  Continuar para Reservar Cita
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Agendar Cita</h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Ver requisitos nuevamente
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                {bookingError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-2">
                    <p className="text-red-700 text-sm">{bookingError}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.cliente_nombre}
                    onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#8cc550] outline-none transition-shadow"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.cliente_email}
                    onChange={(e) => setFormData({ ...formData, cliente_email: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#8cc550] outline-none transition-shadow"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    required
                    min={getMinDate()}
                    value={formData.fecha}
                    onChange={handleFechaChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#8cc550] outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                  <select
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    disabled={!formData.fecha}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#8cc550] outline-none transition-shadow disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">
                      {formData.fecha ? 'Seleccione una hora' : 'Primero seleccione una fecha'}
                    </option>
                    {getFilteredHours().map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {formData.fecha && getFilteredHours().length === 0 && (
                    <p className="text-red-500 text-xs mt-1">
                      No hay horarios disponibles para hoy. Seleccione otro día.
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-4">
                    Al confirmar, se generará un comprobante en PDF de su cita. Deberá presentarlo junto con todos los requisitos el día asignado.
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-4 rounded-md transition-colors shadow-sm"
                  >
                    Confirmar Reserva y Descargar Comprobante
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TramiteDetail;