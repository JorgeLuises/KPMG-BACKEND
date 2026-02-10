# KPMG Backend API

> **API de Gestión de Empleados** - Prueba de admisión para el puesto de Full Stack Developer en KPMG

---

## 📋 Descripción General

Este es un backend robusto y completo construido con **Express.js** que proporciona una API REST para la gestión de empleados, departamentos, ciudades, países y niveles de pago. La aplicación implementa autenticación mediante **JWT (JSON Web Tokens)**, validación de datos y utiliza **Sequelize** como ORM para interactuar con una base de datos MySQL.

---

## 🏗️ Arquitectura

### Patrón Arquitectónico
El proyecto utiliza una arquitectura **MVC (Model-View-Controller) modificada** con separación clara de responsabilidades:

- **Models**: Definición de las entidades y sus relaciones con la base de datos
- **Controllers**: Lógica de negocio y manejo de solicitudes HTTP
- **Routes**: Definición de los endpoints y sus middlewares
- **Middlewares**: Autenticación, validación y procesamiento de solicitudes
- **Helpers**: Funciones utilitarias para la generación de tokens
- **Config**: Configuración de la base de datos

### Flujo de una Solicitud
```
Solicitud HTTP 
    ↓
Router (rutas)
    ↓
Middleware (autenticación, validación)
    ↓
Controller (lógica de negocio)
    ↓
Model (interacción con BD)
    ↓
Respuesta JSON
```

---

## 📦 Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **Express.js** | 5.2.1 | Framework web |
| **MySQL** | 8.0+ | Base de datos relacional |
| **Sequelize** | 6.37.7 | ORM para MySQL |
| **JWT** | 9.0.3 | Autenticación y autorización |
| **Bcrypt** | 6.0.0 | Encriptación de contraseñas |
| **CORS** | 2.8.6 | Control de acceso entre dominios |
| **Express Validator** | 7.3.1 | Validación de datos |
| **Dotenv** | 17.2.3 | Gestión de variables de entorno |
| **Cookie Parser** | 1.4.7 | Procesamiento de cookies |

### Herramientas de Desarrollo
| Herramienta | Versión | Propósito |
|-----------|---------|----------|
| **Nodemon** | 3.1.11 | Recarga automática durante desarrollo |

---

## 📁 Estructura del Proyecto

```
KPMG_BACKEND/
├── config/
│   └── db.js                    # Configuración de conexión a MySQL
├── controllers/
│   ├── usuarioController.js     # Lógica de autenticación y usuarios
│   ├── empleadoController.js    # Gestión de empleados
│   ├── departamentoController.js # Gestión de departamentos
│   ├── ciudadController.js      # Gestión de ciudades
│   └── pagoControllers.js       # Gestión de niveles de pago
├── models/
│   ├── Usuario.js               # Modelo de usuario
│   ├── Empleado.js              # Modelo de empleado
│   ├── Departamento.js          # Modelo de departamento
│   ├── Ciudad.js                # Modelo de ciudad
│   ├── Pais.js                  # Modelo de país
│   ├── NivelesPago.js           # Modelo de niveles de pago
│   └── indexModels.js           # Export centralizado de modelos
├── routes/
│   ├── usuarioRoutes.js         # Rutas de autenticación
│   ├── empleadoRoutes.js        # Rutas de empleados
│   ├── departamentoRoutes.js    # Rutas de departamentos
│   ├── ciudadRoutes.js          # Rutas de ciudades
│   └── pagoRoutes.js            # Rutas de pagos
├── middleware/
│   └── authMiddleware.js        # Validación de JWT
├── helpers/
│   └── tokens.js                # Funciones para generar tokens
├── seed/
│   ├── seeder.js                # Script para popular la BD
│   ├── departamentos.js         # Datos de departamentos
│   ├── paises.js                # Datos de países
│   └── paymentTier.js           # Datos de niveles de pago
├── index.js                     # Entrada principal de la aplicación
├── package.json                 # Definición de dependencias
└── .env                         # Variables de entorno (no incluido en repo)
```

---

## 🔑 Características Principales

### 1. **Autenticación y Autorización**
- Registro de usuarios con validación de datos
- Login con generación de JWT almacenado en cookies
- Middleware de autenticación para proteger rutas
- Encriptación de contraseñas con Bcrypt

### 2. **Gestión de Usuarios**
- Crear nuevo usuario
- Autenticar usuario existente

### 3. **Gestión de Empleados**
- CRUD completo de empleados
- Asignación a departamentos
- Relación con ciudades y países
- Niveles de pago

### 4. **Gestión de Departamentos**
- Listar departamentos
- Relaciones entre departamentos y empleados

### 5. **Ubicaciones Geográficas**
- Gestión de ciudades
- Gestión de países
- Relaciones entre ubicaciones y empleados

### 6. **Niveles de Pago**
- Definición de estructuras salariales
- Asignación de niveles a empleados

---

## 🔌 Endpoints de la API

### Autenticación (Usuario)
```
POST   /usuario/registro                # Crear nuevo usuario
POST   /usuario/login                   # Iniciar sesión
POST   /usuario/logout                  # Cerrar sesión
POST   /usuario/reestablecerPassword    # Reestablecer contraseña
GET    /usuario/verificacion            # Verificación de usuario
```

### Empleados
```
GET    /empleados              # Listar todos los empleados
POST   /empleados              # Crear empleado
GET    /empleados/:id          # Obtener empleado específico
PATCH    /empleados/:id        # Actualizar empleado
DELETE /empleados/:id          # Eliminar empleado
```

### Departamentos
```
GET    /departamentos          # Listar departamentos
```

### Ciudades
```
GET    /ciudades               # Listar ciudades
```

### Pagos/Niveles de Pago
```
GET    /pagos                  # Listar niveles de pago
```

---

## 🚀 Guía de Instalación

### Prerequisitos
- **Node.js** versión 18 o superior
- **npm** versión 9 o superior
- **MySQL Server** versión 8.0 o superior
- Un cliente HTTP para pruebas (Postman, Insomnia, Thunder Client, etc.)

### Pasos de Instalación

#### 1. Clonar o descargar el repositorio
```bash
cd KPMG_BACKEND
```

#### 2. Instalar dependencias
```bash
npm install
```

Este comando instalará todas las librerías necesarias listadas en `package.json`:
- express
- sequelize
- mysql2
- bcrypt
- jsonwebtoken
- express-validator
- cors
- dotenv
- cookie-parser
- nodemon (herramienta de desarrollo)

#### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
# Configuración de Base de Datos
db_host=localhost
db_name=kpmg_db
db_user=root
db_password=tu_contraseña_mysql

# Configuración del Servidor
port=3000

# Seguridad
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
```

**Notas importantes:**
- `db_host`: Dirección del servidor MySQL (localhost para desarrollo local)
- `db_name`: Nombre de la base de datos
- `db_user`: Usuario de MySQL (generalmente "root" en desarrollo)
- `db_password`: Contraseña del usuario MySQL
- `JWT_SECRET`: Clave para firmar tokens JWT (usa una cadena aleatoria y segura)

#### 4. Crear la base de datos
```bash
# En MySQL (desde línea de comandos)
mysql -u root -p

# Dentro de MySQL:
CREATE DATABASE kpmg_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### 5. Ejecutar el seeder (opcional - popular datos iniciales)
```bash
npm run db:importar
```

Este comando cargará datos iniciales de:
- Departamentos
- Países
- Niveles de pago

#### 6. Iniciar el servidor

**Modo de desarrollo (con recarga automática):**
```bash
npm run dev
```

**Modo de producción:**
```bash
node index.js
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📝 Scripts Disponibles

```bash
# Iniciar servidor en modo desarrollo (con nodemon)
npm run dev

# Importar datos iniciales a la base de datos
npm run db:importar

# Ejecutar pruebas (no configurado actualmente)
npm test
```

---

## 🔒 Seguridad

### Medidas Implementadas

1. **Encriptación de Contraseñas**
   - Utiliza Bcrypt con salt de 10 rondas
   - Las contraseñas nunca se almacenan en texto plano

2. **Autenticación JWT**
   - Tokens almacenados en cookies seguras
   - Verificación en cada solicitud a rutas protegidas
   - Expiración de tokens (configurable)

3. **CORS**
   - Restringido a origen específico (http://localhost:5173)
   - Credenciales habilitadas para cookies

4. **Validación de Datos**
   - Validación de entrada en todos los endpoints
   - Prevención de inyección SQL mediante Sequelize
   - Validación de email y longitud de contraseña

5. **Variables de Entorno**
   - Credenciales sensibles no incluidas en código fuente
   - Acceso controlado mediante archivo `.env`

---

## 🗄️ Modelos de Datos

### Usuario
```javascript
{
  idUsuario: UUID (Primary Key),
  email: String (Unique),
  password: String (Encrypted),
  nombreUsuario: String,
  token: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Empleado
```javascript
{
  idEmpleado: UUID (Primary Key),
  nombre: String,
  apellido: String,
  email: String,
  departamentoId: UUID (Foreign Key),
  ciudadId: UUID (Foreign Key),
  salario: Decimal,
  nivelPagoId: UUID (Foreign Key),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Departamento
```javascript
{
  idDepartamento: UUID (Primary Key),
  nombre: String,
  descripcion: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Ciudad
```javascript
{
  idCiudad: UUID (Primary Key),
  nombre: String,
  paisId: UUID (Foreign Key),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### País
```javascript
{
  idPais: UUID (Primary Key),
  nombre: String,
  codigo: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Nivel de Pago
```javascript
{
  idNivelPago: UUID (Primary Key),
  nombre: String,
  salarioMinimo: Decimal,
  salarioMaximo: Decimal,
  descripcion: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🧪 Prueba de la API

### Opción 1: Usando Postman

1. Descargar [Postman](https://www.postman.com/downloads/)
2. Crear una nueva colección
3. Agregar solicitudes siguiendo los endpoints documentados arriba
4. Ajustar las variables (URL base, tokens, etc.)

### Opción 2: Usando cURL

```bash
# Registrar usuario
curl -X POST http://localhost:3000/usuario/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "repitePassword": "123456"
  }'

# Iniciar sesión
curl -X POST http://localhost:3000/usuario/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "123456"
  }'

# Listar empleados (requiere autenticación)
curl -X GET http://localhost:3000/empleados \
  -H "Cookie: _token=tu_token_aqui"
```

### Opción 3: Usando Thunder Client (Extensión VS Code)

1. Instalar extensión Thunder Client
2. Crear solicitudes directamente en VS Code
3. Probar endpoints con interfaz amigable

---

## 🛠️ Desarrollo y Contribución

### Estructura recomendada para agregar un nuevo recurso

1. **Crear el modelo** en `models/`
   ```javascript
   // models/NuevoModelo.js
   import { DataTypes } from "sequelize";
   import db from '../config/db.js';
   
   const NuevoModelo = db.define('nuevomodelo', { /* ... */ });
   export default NuevoModelo;
   ```

2. **Exportar en centralizado**
   ```javascript
   // En models/indexModels.js
   export { default as NuevoModelo } from './NuevoModelo.js';
   ```

3. **Crear el controlador** en `controllers/`
   ```javascript
   // controllers/nuevoController.js
   import { NuevoModelo } from '../models/indexModels.js';
   // Implementar CRUD
   ```

4. **Crear las rutas** en `routes/`
   ```javascript
   // routes/nuevoRoutes.js
   import express from 'express';
   import checkAuth from '../middleware/authMiddleware.js';
   // Definir endpoints
   ```

5. **Registrar rutas en index.js**
   ```javascript
   import nuevoRoutes from './routes/nuevoRoutes.js';
   app.use('/nuevo', nuevoRoutes);
   ```

---

## 📊 Dependencias en Detalle

### Dependencias de Producción

- **express**: Framework web minimalista y flexible para Node.js
- **mysql2**: Driver para conectar con MySQL
- **sequelize**: ORM que abstrae la lógica de base de datos
- **bcrypt**: Librería para hash seguro de contraseñas
- **jsonwebtoken**: Generación y verificación de JWT
- **express-validator**: Middleware para validar y sanitizar datos
- **cors**: Habilitación de CORS en rutas específicas
- **dotenv**: Carga de variables de entorno desde archivo `.env`
- **cookie-parser**: Parsing de cookies en solicitudes

### Dependencias de Desarrollo

- **nodemon**: Monitor de cambios en archivos y reinicio automático

---

## 🐛 Solución de Problemas

### Error: "connect ECONNREFUSED"
**Problema**: No se puede conectar a MySQL
**Solución**:
- Verificar que MySQL Server esté corriendo
- Validar credenciales en `.env`
- Confirmara la dirección del host (localhost o IP)

### Error: "ER_BAD_DB_ERROR"
**Problema**: Database no existe
**Solución**:
```bash
mysql -u root -p -e "CREATE DATABASE kpmg_db CHARACTER SET utf8mb4;"
```

### Error: "ENOENT" cuando busca `.env`
**Problema**: Archivo de variables de entorno no existe
**Solución**: Crear archivo `.env` en la raíz del proyecto

### Error: "JsonWebTokenError"
**Problema**: Token inválido o expirado
**Solución**:
- Volver a hacer login para obtener nuevo token
- Verificar que la clave JWT_SECRET sea la misma

---

## 📞 Contacto y Autoría

**Autor**: Jorge Luis Escobedo Solana  
**Propósito**: Prueba técnica para posición Full Stack Developer en KPMG  
**Licencia**: ISC  

---

## 📅 Versión

**Versión Actual**: 1.0.0  
**Última Actualización**: 10 de febrero de 2026

---

## 📚 Recursos Útiles

- [Documentación Express.js](https://expressjs.com/es/)
- [Documentación Sequelize](https://sequelize.org/)
- [JWT Introduction](https://jwt.io/introduction)
- [MySQL Official Docs](https://dev.mysql.com/doc/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**¡Gracias por revisar esta API!** Si tienes preguntas o sugerencias, no dudes en comunicarte.
