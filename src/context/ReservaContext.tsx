import { createContext, ReactNode, useContext, useState } from "react";
import { Reserva } from "../api/reservasService";

interface ReservaContextType {
  reserva: Reserva | null;
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);
export const useAuth = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }: { children: ReactNode }) => {
  const [reserva, setReserva] = useState<Reserva | null>(null);

  return (
    <ReservaContext.Provider value={{ reserva }}>
      {children}
    </ReservaContext.Provider>
  );
};
