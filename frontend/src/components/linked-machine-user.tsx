import React from "react";
import "../.css/LinkedUserMachine.css"

interface LinkedUserMachineProps {
  onBack?: () => void;
}

const LinkedUserMachine: React.FC<LinkedUserMachineProps> = ({ onBack }) => {
  return (
   
     
      
      <div className="machine-content">
        <div className="machine-card">
          <h2>Gestión de Máquinas</h2>
          
          <div className="machine-buttons">
            <button className="machine-button linked-button">
             
              <span className="button-text">Vincular Usuario a Máquina</span>
            </button>
            
            <button className="machine-button get-id-button">
             
              <span className="button-text">Obtener ID de Máquina</span>
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default LinkedUserMachine;