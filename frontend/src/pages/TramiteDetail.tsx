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
    fecha_hora: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fecha_hora.includes('T')) {
      alert('Seleccione una fecha y hora válida.');
      return;
    }

    const [fecha, horaInicio] = formData.fecha_hora.split('T');

    if (!tramite.backendId) {
      alert('No se pudo obtener el identificador del trámite para reservar. Intente nuevamente más tarde.');
      return;
    }

    try {
      const response = await apiClient.post('/turnos/guest', {
        tramiteId: tramite.backendId,
        fecha,
        horaInicio,
        clienteNombre: formData.cliente_nombre,
        clienteEmail: formData.cliente_email,
        notas: '',
      });

      generateBookingPDF({
        cliente_nombre: formData.cliente_nombre,
        cliente_email: formData.cliente_email,
        tramite_nombre: tramite.nombre,
        fecha_hora: formData.fecha_hora,
        turnoId: response.data.data.id,
      });

      alert('Cita reservada y comprobante descargado exitosamente.');
      navigate('/booking');
    } catch (submitError) {
      console.error('Error reservando turno:', submitError);
      const message = (submitError as any)?.response?.data?.message || 'Error al reservar cita...';
      alert(message);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setFormData({...formData, fecha_hora: ''});
      return;
    }

    const selectedDate = new Date(value);
    const day = selectedDate.getDay();
    const hours = selectedDate.getHours();

    // 0 = Domingo, 6 = Sábado
    if (day === 0 || day === 6) {
      alert('Por favor seleccione un día de Lunes a Viernes.');
      return;
    }

    // Entre 8 AM y 4 PM (16:00)
    if (hours < 8 || hours >= 16) {
      alert('El horario de atención es de 8:00 AM a 4:00 PM.');
      return;
    }

    setFormData({...formData, fecha_hora: value});
  };

  // Para el atributo min del input (no permitir fechas pasadas)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
      <button 
        onClick={() => navigate('/booking')} 
        className="text-gray-500 hover:text-primary mb-6 flex items-center transition-colors font-medium text-sm"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a Trámites
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-dark p-8 md:px-12 text-white">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-2 block">
            {tramite.categoria || tramite.descripcion || 'Trámite'}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            {tramite.nombre}
          </h1>
        </div>

        <div className="p-8 md:p-12">
          {!showBookingForm ? (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded transition-colors text-center inline-block"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.cliente_nombre}
                    onChange={(e) => setFormData({...formData, cliente_nombre: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required
                    value={formData.cliente_email}
                    onChange={(e) => setFormData({...formData, cliente_email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha y Hora Preferida</label>
                  <input 
                    type="datetime-local" 
                    required
                    min={getMinDateTime()}
                    value={formData.fecha_hora}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-shadow"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-4">
                    Al confirmar, se generará un comprobante en PDF de su cita. Deberá presentarlo junto con todos los requisitos el día asignado.
                  </p>
                  <button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md transition-colors shadow-sm"
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
