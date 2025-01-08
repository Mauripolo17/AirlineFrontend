import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de tener el contexto configurado

export const BienvenidaDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLaoading] = useState<Boolean>(true);

  useEffect(() => {
    user && setLaoading(false);
  }, [user]);

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#f0f8ff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      {loading ? (<><p>Cargando...</p></>):(<>
        <h1 style={{ fontSize: "2.5rem", color: "#0073e6", marginBottom: "10px" }}>
        ¡Bienvenid@{user ? `, ${user.nombre}` : ""}!
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#333" }}>
        Nos alegra tenerte de vuelta. Explora tus opciones, revisa tus reservas y descubre lo que hemos preparado para ti.
      </p></>)}
    </div>
  );
};
