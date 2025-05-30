import React, { useState } from "react";
import "../.css/ModalAuth.css"

interface ModalAuthProps {
  type?: "login" | "register";
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const ModalAuth: React.FC<ModalAuthProps> = ({ type = "login", onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("2"); 

  const isLogin = type === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/auth/${isLogin ? "login" : "register"}`;
    const payload = isLogin
      ? { email, password }
      : {
          email,
          password,
          passwordConfirmation,
          lastName,
          name,
          rut,
          role: Number(role), 
        };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error desconocido");
        return;
      }

      localStorage.setItem("accessToken", data.data.accessToken);
      alert(data.message);

      if (isLogin && onLoginSuccess) {
        onLoginSuccess(); 
      } else {
        onClose(); 
      }
    } catch (err) {
      alert("Error de red al conectar con el servidor.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="text"
            placeholder="Email"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="2">Usuario</option>
                <option value="1">Administrador</option>
              </select>
            </>
          )}
          <button type="submit">{isLogin ? "Entrar" : "Registrar"}</button>
        </form>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalAuth;
