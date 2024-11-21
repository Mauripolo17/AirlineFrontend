import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginRequest } from "../api/authService";
import axios from "axios";
import { clienteService, cliente } from "../api/clienteService";



interface AuthContextType {
  token: string | null;
  user: cliente | null;
  login: (loginReques: loginRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined >(undefined);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<cliente | null>(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));


  const login = async (loginRequest: loginRequest) => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", loginRequest);
  
      if (!data.token || data.token.split(".").length !== 3) {
        throw new Error("Token inválido recibido del servidor.");
      }
      setToken(data.token);
      localStorage.setItem("token", data.token);
  
      let decodedToken;
      try {
        decodedToken = JSON.parse(atob(data.token.split(".")[1]));
      } catch (e) {
        throw new Error("No se pudo decodificar el token.");
      }
  
      const client = await clienteService.getClientByUsername(decodedToken.sub, data.token);
  
      localStorage.setItem("user", JSON.stringify(client));
      setUser(client);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.response?.data?.message || error.message);
    }
  };
  

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Configurar axios para agregar el token automáticamente en cada petición
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
