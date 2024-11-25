import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginRequest } from "../api/authService";
import axios from "axios";
import { clienteService, cliente } from "../api/clienteService";

interface AuthContextType {
  login: (loginReques: loginRequest) => void;
  isAuthenticated: boolean;
  logout: () => void;
  token: string | null;
  user: cliente | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  const [user, setUser] = useState<cliente | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = async (loginRequest: loginRequest) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginRequest
      );
      if (!data.token || data.token.split(".").length !== 3) {
        throw new Error("Token inválido recibido del servidor.");
      }
      setIsAuthenticated(true);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      await loadUser(data.token);
    } catch (error: any) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.message || error.message
      );
    }
  };

  const loadUser = async (token: string) => {
    let decodedToken;
    try {
      decodedToken = JSON.parse(atob(token.split(".")[1]));
      const client = await clienteService.getClientByUsername(
        decodedToken.sub,
        token
      );
      localStorage.setItem("user", JSON.stringify(client));
      setUser(client);
    } catch (error: any) {
      console.error(
        "Error al cargar el usuario:",
        error.response?.data?.message || error.message
      );
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
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
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
