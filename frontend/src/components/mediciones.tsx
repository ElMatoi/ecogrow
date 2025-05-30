import React from "react";
import { useQuery, gql } from "@apollo/client";
import "../.css/mediciones.css"
import fondo from "../assets/cultivo-de-maiz.jpg";

const GET_SENSORS = gql`
  query {
    sensors {
      id
      temperatura
      humedad
      nivelAgua
      type
    }
  }
`;

interface Sensor {
  id: string;
  temperatura: number;
  humedad: number;
  nivelAgua: number | null;
  type: string;
}

function Mediciones({ onBack }: { onBack: () => void }) {
  const { loading, error, data, refetch } = useQuery(GET_SENSORS);

  if (loading) return <p className="loading">Cargando sensores...</p>;

  if (error)
    return (
      <div className="error">
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()} className="retry-button">
          Reintentar
        </button>
      </div>
    );

  return (
   
      
      <section
        className="hero"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="overlay" />
        <div className="hero-content">
          <h1>Mediciones</h1>

          <ul className="sensor-list">
            {data.sensors.map((sensor: Sensor) => (
              <li key={sensor.id} className="sensor-item">
                <p><strong>ID:</strong> {sensor.id}</p>
                <p><strong>Tipo:</strong> {sensor.type}</p>
                <p><strong>Temperatura:</strong> {sensor.temperatura}°C</p>
                <p><strong>Humedad:</strong> {sensor.humedad}%</p>
                <p>
                  <strong>Nivel de agua:</strong>{" "}
                  {sensor.nivelAgua !== null ? `${sensor.nivelAgua}%` : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
   
  );
}

export default Mediciones;
