# Historias de Usuario — Backend Notaría 43

## Historias de Usuario

### 1. Registro de ciudadano
- Como ciudadano, quiero registrarme en el sistema para poder acceder a la gestión de turnos y mis datos personales.
- Criterios de aceptación:
  - Existe un endpoint de registro disponible.
  - El registro requiere cédula, nombre, correo y contraseña.
  - La cédula se valida con la regla ecuatoriana de módulo 10.
  - El usuario se guarda en la base de datos con estado activo.
- Subtareas:
  - Diseñar y documentar el endpoint `/api/auth/register`.
    - Descripción: Especificar los campos requeridos, el formato de solicitud y las posibles respuestas de éxito y error.
  - Crear validación de datos para cédula, correo y contraseña.
    - Descripción: Implementar reglas que verifiquen formato, longitud mínima y campos obligatorios antes de procesar la solicitud.
  - Implementar la lógica de guardado en Prisma.
    - Descripción: Insertar el usuario en la base de datos y asegurar que el registro queda activo.
  - Probar el registro con datos válidos e inválidos.
    - Descripción: Ejecutar casos de prueba que confirmen el comportamiento correcto del endpoint.

### 2. Inicio de sesión administrativo
- Como administrativo, quiero iniciar sesión con mis credenciales para recibir un token JWT y utilizar las rutas protegidas de la API.
- Criterios de aceptación:
  - Existe un endpoint de login para el personal administrativo.
  - El login valida usuario y contraseña.
  - Se emite un JWT válido en la respuesta.
  - Solo usuarios con rol administrativo pueden acceder a rutas protegidas con este token.
- Subtareas:
  - Definir el endpoint `/api/auth/login`.
    - Descripción: Documentar el payload de login y la estructura de la respuesta con token.
  - Implementar verificación de contraseña con bcrypt.
    - Descripción: Comparar la contraseña ingresada con el hash almacenado de forma segura.
  - Generar token JWT con rol incluido.
    - Descripción: Crear el token con datos de usuario y rol para validación posterior.
  - Validar acceso a rutas protegidas con el middleware de auth.
    - Descripción: Asegurar que solo peticiones autenticadas con token válido pueden avanzar.

### 3. Consulta pública de trámites
- Como ciudadano, quiero consultar los trámites disponibles para elegir el servicio notarial que necesito.
- Criterios de aceptación:
  - Existe un endpoint público para listar trámites activos.
  - La respuesta incluye nombre, descripción y duración estimada.
  - Los trámites inactivos no aparecen en el listado.
- Subtareas:
  - Implementar ruta `GET /api/tramites`.
    - Descripción: Crear la ruta pública que entrega el catálogo de trámites disponibles.
  - Filtrar únicamente trámites activos en la consulta.
    - Descripción: Consultar solo trámites vigentes para evitar mostrar información obsoleta.
  - Mapear la respuesta con campos visibles.
    - Descripción: Transformar los datos para devolver solo lo necesario al cliente.
  - Verificar con pruebas que no aparecen trámites inactivos.
    - Descripción: Comprobar mediante pruebas que el filtro de estado funciona correctamente.

### 4. Consulta de disponibilidad de turnos
- Como ciudadano, quiero consultar la disponibilidad de turnos para ver qué fechas y horarios puedo reservar.
- Criterios de aceptación:
  - Existe un endpoint de disponibilidad de turnos.
  - Se pueden filtrar fechas y tipo de trámite.
  - La respuesta muestra franjas horarias libres.
  - No se muestran horarios ya reservados o cancelados.
- Subtareas:
  - Crear ruta `GET /api/turnos/disponibilidad`.
    - Descripción: Definir el endpoint que devuelve horarios disponibles para reserva.
  - Añadir validación de query params de fecha y trámite.
    - Descripción: Verificar que los parámetros de filtro sean válidos y estén completos.
  - Consultar franjas libres en la base de datos.
    - Descripción: Obtener únicamente horarios no reservados ni bloqueados.
  - Excluir turnos reservados y cancelados.
    - Descripción: Filtrar los resultados para no mostrar espacios no disponibles.

### 5. Reserva de turno
- Como ciudadano, quiero reservar un turno para asegurar un espacio en la agenda de la notaría.
- Criterios de aceptación:
  - Existe un endpoint para crear turno.
  - El turno se puede reservar solo si la franja está disponible.
  - Se valida que el ciudadano esté registrado.
  - El turno queda guardado con estado pendiente.
- Subtareas:
  - Implementar `POST /api/turnos`.
    - Descripción: Crear la ruta que recibe datos de reserva y los procesa.
  - Validar datos de reserva y existencia del ciudadano.
    - Descripción: Confirmar que el usuario existe y que la solicitud incluye lo necesario.
  - Verificar disponibilidad antes de crear el turno.
    - Descripción: Comprobar que la franja elegida todavía está libre.
  - Guardar el turno en la base con estado pendiente.
    - Descripción: Registrar el turno y establecer su estado inicial.

### 6. Visualización de mis turnos
- Como ciudadano, quiero ver mis turnos reservados para saber qué citas tengo pendientes.
- Criterios de aceptación:
  - Existe un endpoint protegido para obtener los turnos del ciudadano autenticado.
  - La respuesta incluye fecha, hora, trámite y estado.
  - Se muestran solo los turnos del usuario actual.
- Subtareas:
  - Añadir `GET /api/turnos/mis-turnos`.
    - Descripción: Definir la ruta que muestra las reservas del usuario logueado.
  - Implementar middleware de autenticación.
    - Descripción: Asegurar que solo usuarios validados pueden consultar sus turnos.
  - Filtrar turnos por usuario autenticado.
    - Descripción: Retornar únicamente las reservas asociadas al token.
  - Formatear la respuesta con los campos requeridos.
    - Descripción: Entregar los datos en un formato claro y legible.

### 7. Cancelación de turno
- Como ciudadano, quiero cancelar un turno para liberar un espacio si ya no puedo asistir.
- Criterios de aceptación:
  - Existe un endpoint para cancelar turno.
  - El turno cambia a estado `CANCELADO`.
  - El turno cancelado libera la franja para otros usuarios.
  - Solo el ciudadano dueño del turno o administrativo puede cancelarlo.
- Subtareas:
  - Crear `DELETE /api/turnos/:id`.
    - Descripción: Definir la ruta para cancelar un turno por su identificador.
  - Añadir validación de propietario o rol administrativo.
    - Descripción: Permitir la cancelación solo a quien corresponda.
  - Actualizar estado del turno a `CANCELADO`.
    - Descripción: Modificar el registro para liberar la franja.
  - Probar que la franja queda disponible luego.
    - Descripción: Verificar que el turno cancelado permite nuevas reservas.

### 8. Creación de trámites
- Como administrativo, quiero crear nuevos trámites para mantener actualizado el catálogo de servicios notariales.
- Criterios de aceptación:
  - Existe un endpoint protegido para crear trámites.
  - Solo el rol administrativo puede crear trámites.
  - Se guardan nombre, descripción, duración y estado.
  - El trámite aparece en el listado público si está activo.
- Subtareas:
  - Desarrollar `POST /api/tramites`.
    - Descripción: Crear la ruta que recibe y guarda un nuevo trámite.
  - Aplicar middleware de auth y rol administrativo.
    - Descripción: Proteger la ruta para que solo admin pueda usarla.
  - Guardar el trámite en la base con datos completos.
    - Descripción: Inserir el trámite con todos los campos requeridos.
  - Confirmar que el trámite aparece en el listado público.
    - Descripción: Verificar que un trámite activo se muestra correctamente.

### 9. Edición de trámite
- Como administrativo, quiero editar un trámite para corregir o actualizar su información.
- Criterios de aceptación:
  - Existe un endpoint protegido para actualizar un trámite.
  - Solo el rol administrativo puede editar trámites.
  - Se valida que el trámite exista antes de modificarlo.
  - Los cambios se reflejan en el catálogo público.
- Subtareas:
  - Implementar `PUT /api/tramites/:id`.
    - Descripción: Crear la ruta para modificar un trámite existente.
  - Validar existencia del trámite.
    - Descripción: Confirmar que el trámite existe antes de actualizarlo.
  - Aplicar control de rol administrativo.
    - Descripción: Restringir la edición solo a personal autorizado.
  - Actualizar los datos y verificar la respuesta.
    - Descripción: Guardar las modificaciones y retornar el resultado.

### 10. Eliminación de trámite
- Como administrativo, quiero eliminar un trámite obsoleto para que solo se ofrezcan servicios vigentes.
- Criterios de aceptación:
  - Existe un endpoint protegido para eliminar trámites.
  - Solo el rol administrativo puede eliminar trámites.
  - El trámite se elimina o se marca como inactivo según el diseño.
  - Los usuarios ya no pueden reservar turnos para trámites eliminados.
- Subtareas:
  - Crear `DELETE /api/tramites/:id`.
    - Descripción: Definir la ruta para eliminar o desactivar un trámite.
  - Validar rol administrativo.
    - Descripción: Asegurar que solo admin puede ejecutar la eliminación.
  - Implementar eliminación lógica o física.
    - Descripción: Decidir si el trámite se borra o se marca como inactivo.
  - Confirmar que no aparece en la lista pública.
    - Descripción: Verificar que el trámite queda fuera del catálogo.

### 11. Consulta de la agenda
- Como administrativo, quiero consultar la agenda de turnos para supervisar el calendario del notario.
- Criterios de aceptación:
  - Existe un endpoint protegido de agenda.
  - Solo roles administrativo y notario pueden acceder.
  - Se pueden filtrar por fecha.
  - La respuesta muestra todos los turnos planificados.
- Subtareas:
  - Implementar `GET /api/turnos/agenda`.
    - Descripción: Crear la ruta que devuelve el calendario de turnos.
  - Añadir filtro de fecha.
    - Descripción: Permitir consultar la agenda en intervalos definidos.
  - Aplicar control de acceso por roles.
    - Descripción: Limitar la consulta a administrativos y notarios.
  - Devolver todos los turnos relevantes.
    - Descripción: Incluir turnos planificados y su estado.

### 12. Generación de reportes de turnos
- Como administrativo, quiero generar reportes de turnos para analizar la carga de trabajo y el uso del servicio.
- Criterios de aceptación:
  - Existe un endpoint protegido para reportes de turnos.
  - Solo el rol administrativo puede acceder.
  - El reporte resume cantidad de turnos por estado y por rango de fechas.
  - La respuesta es compatible con análisis de gestión.
- Subtareas:
  - Crear `GET /api/reportes/turnos`.
    - Descripción: Definir la ruta que devuelve el reporte de turnos.
  - Filtrar datos por rango de fechas.
    - Descripción: Permitir seleccionar período de análisis.
  - Agrupar turnos por estado.
    - Descripción: Organizar los datos en categorías útiles para gestión.
  - Validar acceso administrativo.
    - Descripción: Verificar que solo admin puede consultar este reporte.

### 13. Consulta de agenda como notario
- Como notario, quiero consultar la agenda de turnos para preparar mi jornada y saber qué citas debo atender.
- Criterios de aceptación:
  - Existe un endpoint de agenda accesible por notarios.
  - El notario ve sólo turnos relevantes para su rol.
  - La respuesta incluye fecha, hora, trámite y cliente.
- Subtareas:
  - Reutilizar el endpoint de agenda para notarios.
    - Descripción: Asegurar que el mismo endpoint sirve con el permiso correcto.
  - Asegurar datos específicos para el notario.
    - Descripción: Incluir información útil para preparar la atención.
  - Mostrar cliente, fecha y trámite.
    - Descripción: Presentar los detalles necesarios para cada turno.
  - Verificar acceso del rol notario.
    - Descripción: Comprobar que la ruta está restringida al rol notario.

### 14. Marcar turno como atendido
- Como notario, quiero marcar un turno como atendido para registrar que la cita fue completada.
- Criterios de aceptación:
  - Existe un endpoint protegido para marcar turno atendido.
  - Solo el rol notario puede ejecutar esta acción.
  - El estado del turno cambia a `ATENDIDO`.
  - La acción queda registrada correctamente en la base de datos.
- Subtareas:
  - Implementar `PATCH /api/turnos/:id/atender`.
    - Descripción: Crear la ruta que actualiza el estado del turno.
  - Validar rol notario.
    - Descripción: Restringir esta acción exclusivamente a notarios.
  - Cambiar el estado del turno a `ATENDIDO`.
    - Descripción: Actualizar el registro con el nuevo estado.
  - Confirmar el resultado en la base de datos.
    - Descripción: Verificar que el estado quedó guardado correctamente.

### 15. Endpoint de salud
- Como sistema, quiero que exista un endpoint de salud (`/api/health`) para verificar que el backend está funcionando.
- Criterios de aceptación:
  - Existe un endpoint público `/api/health`.
  - Devuelve `success: true` y un mensaje claro.
  - Incluye información de timestamp y entorno.
- Subtareas:
  - Implementar la ruta `GET /api/health`.
    - Descripción: Crear el endpoint de chequeo con respuesta simple.
  - Incluir timestamp y entorno en la respuesta.
    - Descripción: Proveer datos que permitan confirmar la operatividad.
  - Probar el endpoint manualmente.
    - Descripción: Ejecutar la ruta y verificar que responde bien.
  - Verificar respuesta esperada en distintos entornos.
    - Descripción: Comprobar la ruta en local y en otros entornos si existen.

### 16. Validación de cédula
- Como equipo técnico, quiero que el sistema valide la cédula ecuatoriana al registrarme para asegurar datos correctos y válidos.
- Criterios de aceptación:
  - La cédula se valida con el algoritmo ecuatoriano de módulo 10.
  - El registro falla si la cédula es inválida.
  - Se retorna un error claro cuando la cédula no es correcta.
- Subtareas:
  - Implementar validador de cédula en utilidades.
    - Descripción: Crear una función reusable que valide cédulas ecuatorianas.
  - Integrar la validación en el endpoint de registro.
    - Descripción: Aplicar el validador antes de insertar al usuario en la BD.
  - Manejar el error de cédula inválida.
    - Descripción: Retornar un mensaje claro y evitar el registro.
  - Probar múltiples casos de cédula.
    - Descripción: Evaluar el validador con ejemplos válidos e inválidos.

### 17. Prevención de solapamiento de turnos
- Como equipo técnico, quiero que la base de datos prevenga solapamientos de turnos con una restricción GIST para evitar conflictos de horario.
- Criterios de aceptación:
  - La base de datos contiene una restricción GIST sobre fechas y rangos horarios.
  - No se pueden crear turnos que se solapen con otros activos.
  - Los turnos cancelados no bloquean nuevas reservas.
- Subtareas:
  - Confirmar que la tabla de turnos tiene la restricción GIST.
    - Descripción: Revisar la estructura de la tabla y la restricción en la base de datos.
  - Revisar consulta de reserva para respetar la restricción.
    - Descripción: Asegurar que la lógica de creación de turno no omite la restricción.
  - Probar creación de turnos solapados y cancelados.
    - Descripción: Ejecutar casos de reserva que intenten crear conflictos de horario.
  - Ajustar manejo de errores si la base de datos rechaza la reserva.
    - Descripción: Mostrar un mensaje claro cuando la base impide el turno.

## Roles identificados

- Ciudadano
- Administrativo
- Notario
- Equipo técnico / sistema
