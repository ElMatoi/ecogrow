# 📘 API NestJS – Documentación de Controladores

## 📂 Rutas disponibles

---

## 🔧 `/machine` – Controlador de Máquina

### `POST /machine`
Crea una nueva máquina.

- **Request Body**:
  ```json
  {
    "code": "MACHINE123"
  }
  ```

- **Response**: `Promise<ResponseMessage<any>>`
  ```json
  {
    "success": true,
    "message": "Máquina creada exitosamente.",
    "data": null
  }
  ```

---

## 🔐 `/auth` – Controlador de Autenticación

### `POST /auth/register`
Registra un nuevo usuario.

- **Interceptors**: `LogsInterceptor`
- **Request Body** (`RegisterDto`):
  ```json
  {
    "name": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "rut": "12345678-9",
    "password": "securePassword"
  }
  ```

- **Response**: `Promise<ResponseMessage<AccessTokenResponse>>`
  ```json
  {
    "success": true,
    "message": "Usuario registrado correctamente.",
    "data": {
      "accessToken": "jwt_token_aquí"
    }
  }
  ```

---

### `POST /auth/login`
Inicia sesión con credenciales válidas.

- **Interceptors**: `LogsInterceptor`
- **Request Body** (`LoginDto`):
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword"
  }
  ```

- **Response**: `Promise<ResponseMessage<AccessTokenResponse>>`
  ```json
  {
    "success": true,
    "message": "Inicio de sesión exitoso.",
    "data": {
      "accessToken": "jwt_token_aquí"
    }
  }
  ```

---

## 👤 `/user` – Controlador de Usuario

### `GET /user/userinfo/:id`
Obtiene información del usuario por su ID.

- **Auth Guard**: `JwtAuthGuard`
- **Interceptors**: `LogsInterceptor`
- **Parameters**:
  - `id`: `string`

- **Response**: `Promise<ResponseMessage<any>>`
  ```json
  {
    "success": true,
    "message": "Usuario encontrado.",
    "data": {
      "id": "user-id",
      "name": "John",
      "email": "john@example.com"
    }
  }
  ```

---

### `POST /user/Linked-machine-user`
Asocia una máquina a un usuario autenticado.

- **Auth Guard**: `JwtAuthGuard`
- **Interceptors**: `LogsInterceptor`
- **Request Body** (`LinkedMachineDto`):
  ```json
  {
    "machineid": "machine-id"
  }
  ```

- **Response**: `Promise<ResponseMessage<any>>`
  ```json
  {
    "success": true,
    "message": "Máquina vinculada correctamente.",
    "data": null
  }
  ```

---

## 📌 Notas

- Todos los endpoints autenticados utilizan `JwtAuthGuard`.
- El sistema implementa `LogsInterceptor` para registrar eventos importantes.
- Las respuestas están estructuradas con la interfaz `ResponseMessage<T>` para consistencia y control de errores.
