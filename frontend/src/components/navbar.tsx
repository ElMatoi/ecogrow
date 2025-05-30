import React from "react";
import "../.css/navbar.css"

interface NavbarProps {
  userName?: string | null;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;
  onMedicionesClick?: () => void;
  onMachineManagementClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onMedicionesClick,
  onMachineManagementClick,
  showBackButton = false,
  onBackClick,
}) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-eco">eco</span>
        <span className="logo-grow">Grow</span>
      </div>

      <div className="navbar-actions">
        {showBackButton && onBackClick && (
          <button className="back-button" onClick={onBackClick}>
            ← Volver
          </button>
        )}

        {userName ? (
         
          <>
            <span className="user-greeting">
              Hola, {userName}
            </span>
            <div className="auth-buttons">
              {onMedicionesClick && (
                <button
                  className="login-button"
                  onClick={onMedicionesClick}
                >
                  VER MEDICIONES
                </button>
              )}
              {onMachineManagementClick && (
                <button
                  className="register-button"
                  onClick={onMachineManagementClick}
                >
                  GESTIONAR MÁQUINAS
                </button>
              )}
              <button
                className="logout-button"
                onClick={onLogoutClick}
              >
                CERRAR SESIÓN
              </button>
            </div>
          </>
        ) : (
         
          <div className="auth-buttons">
            <button
              className="login-button"
              onClick={onLoginClick}
            >
              INICIAR SESIÓN
            </button>
            <button
              className="register-button"
              onClick={onRegisterClick}
            >
              REGISTRARSE
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;