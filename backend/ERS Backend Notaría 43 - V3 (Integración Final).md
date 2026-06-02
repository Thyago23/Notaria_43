# **Especificación de Requisitos de Software (ERS) \- Backend** 

## **Proyecto: Sistema de Gestión de Turnos para la Notaría 43**

### **1\. Introducción**

Este documento integra los requisitos funcionales base del sistema de la Notaría 43 con la nueva arquitectura de despliegue en la nube (Plan C). El objetivo es proporcionar un marco técnico completo para el desarrollo del backend, garantizando la integridad de los datos y la escalabilidad del sistema \[cite: 1, 2\].

### **2\. Alcance del Backend**

* Desarrollo de una API RESTful para consumo desde React \[cite: 1, 2\].  
* Lógica de negocio para gestión de turnos, agenda institucional y roles de usuario \[cite: 1, 2\].  
* Persistencia de datos en PostgreSQL con lógica de concurrencia avanzada \[cite: 1, 2\].  
* Mecanismos de autenticación y autorización mediante JWT \[cite: 2\].

### **3\. Roles y Actores del Sistema**

| Rol | Descripción de Responsabilidades   |
| :---- | :---- |
| **Ciudadano** | Registro con cédula, consulta de disponibilidad y reserva de turnos \[cite: 1\]. |
| **Administrativo** | Gestión de catálogo de trámites, visualización de agenda y reporte de turnos \[cite: 1\]. |
| **Notario** | Consulta de agenda diaria y validación de atención realizada \[cite: 1\]. |

### **4\. Arquitectura y Tecnologías (Plan C)**

Se adopta un modelo agnóstico de sistema operativo, basado en contenedores Docker y servicios administrados \[cite: 2\].

* **Backend:** Dockerizado y desplegado en Railway o Render \[cite: 2\].  
* **Frontend:** React desplegado en Vercel \[cite: 2\].  
* **Base de Datos:** PostgreSQL 14+ con soporte para extensiones *btree\_gist* \[cite: 2, 3\].

### **5\. Requisitos Funcionales Detallados**

* **RF-01 (Seguridad):** Validación algorítmica de la cédula ecuatoriana en el registro de usuarios \[cite: 1, 2\].  
* **RF-02 (Autenticación):** Generación de tokens JWT para sesiones seguras \[cite: 2\].  
* **RF-03 (Agenda):** Implementación de transacciones atómicas para la creación de turnos \[cite: 2, 3\].  
* **RF-04 (Notificaciones):** Envío automático de correos electrónicos de confirmación mediante SMTP \[cite: 1\].

### **6\. Riesgos y Mitigaciones**

| Riesgo | Probabilidad | Mitigación Técnica   |
| :---- | :---- | :---- |
| Condición de carrera en turnos | Alta | Uso de restricciones de exclusión GIST en PostgreSQL para evitar traslapes horarios \[cite: 1, 3\]. |
| Indisponibilidad del SMTP | Media | Cola de reintentos con backoff exponencial (hasta 3 intentos) \[cite: 1\]. |
| Fuga de datos por CORS | Baja | Configuración de CORS estricta permitiendo únicamente el dominio del frontend en Vercel \[cite: 1, 2\]. |

### **7\. Supuestos del Proyecto**

* El cliente proporcionará la lista de trámites y horarios oficiales antes del desarrollo del módulo de agenda \[cite: 1\].  
* El frontend React cumplirá con el envío de la cabecera *Authorization: Bearer* en cada petición protegida \[cite: 1, 2\].  
* La conectividad entre Railway (Backend) y Vercel (Frontend) será estable para peticiones HTTPS \[cite: 2\].



