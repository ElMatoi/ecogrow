import React, { useState, useEffect } from "react";
import Mediciones from "./components/mediciones";
import { ApolloWrapper } from "./apollo";
import fondo from "./assets/cultivo-de-maiz.jpg";
import "./.css/App.css"
import ModalAuth from "./components/modalAuth";
import LinkedUserMachine from "./components/linked-machine-user";
import Navbar from "./components/navbar";
import { jwtDecode } from "jwt-decode";

interface JWTData {
  id: string;
  email: string;
  role: string;
  rut: string;
  name?: string;
}

function App() {
  const [showMediciones, setShowMediciones] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMachineManagement, setShowMachineManagement] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [userName, setUserName] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<JWTData>(token);
        setUserName(decoded.name || decoded.email);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    
    try {
      const decoded = jwtDecode<JWTData>(token);
      setUserName(decoded.name || decoded.email);
      setShowAuthModal(false);
      setShowMediciones(true);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserName(null);
    setShowMediciones(false);
    setShowMachineManagement(false);
  };

  const handleLoginClick = () => {
    setAuthType("login");
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthType("register");
    setShowAuthModal(true);
  };

  if (showMediciones) {
    return (
      <ApolloWrapper>
        <Navbar
          userName={userName}
          showBackButton={true}
          onBackClick={() => setShowMediciones(false)}
          onLogoutClick={handleLogout}
        />
        <Mediciones onBack={() => setShowMediciones(false)} />
      </ApolloWrapper>
    );
  }

  if (showMachineManagement) {
    return (
      <>
        <Navbar
          userName={userName}
          showBackButton={true}
          onBackClick={() => setShowMachineManagement(false)}
          onLogoutClick={handleLogout}
        />
        <LinkedUserMachine onBack={() => setShowMachineManagement(false)} />
      </>
    );
  }

  return (
    <div className="container">
      <Navbar
        userName={userName}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogoutClick={handleLogout}
        onMedicionesClick={() => setShowMediciones(true)}
        onMachineManagementClick={() => setShowMachineManagement(true)}
      />

      <div className="hero" style={{ backgroundImage: `url(${fondo})` }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>
            El futuro del cultivo
            <br />
            comienza aquí.
          </h1>
        </div>
      </div>

      {}
      <div className="content-section">
        <section className="about-section">
          <h2>Sobre nosotros</h2>
          <p>
            En EcoGrow revolucionamos la agricultura sostenible mediante tecnologías
            innovadoras que optimizan el uso de recursos. Nuestros sistemas inteligentes
            permiten aumentar la productividad mientras reducimos el impacto ambiental.
          </p>
          <button className="more-info-button">MÁS INFORMACIÓN</button>
        </section>

        <div className="separator">GRÁFICOS O ESTUDIOS</div>

        <section className="traditional-crops">
          <h2>Cultivos tradicionales</h2>
          <p>Comparación del uso del agua y degradación de suelos:</p>
          <ul className="traditional-crops-list">
            <li>Reducción del 40% en uso de agua</li>
            <li>Mejoría en calidad del suelo</li>
            <li>Mayor rendimiento por hectárea</li>
            <li>Cero químicos tóxicos</li>
          </ul>
        </section>
      </div>

      {showAuthModal && (
        <ModalAuth
          type={authType}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;