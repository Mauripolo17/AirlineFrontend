// import { BuscadorViajes } from "./components/buscadorViajes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
// import Menu from "./components/menu";
import { AuthProvider } from "./context/AuthContext";
import { Footer } from "./components/footer";
import { Reserva } from "./components/reserva";
import "primeflex/primeflex.css"; // flex
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/viva-light/theme.css";
import { Dashboard } from "./components/Dashboad";
import { Login } from "./components/login";
import PrivateRoutes from "./PrivateRoutes";
import { ReservaProvider } from "./context/ReservaContext";
import Menu from "./components/menu";
import { HistorialReservas } from "./components/historialReservas";
import { EditarPerfil } from "./components/editarPerfil";
import { SignUp } from "./components/signUp";
import { HistorialVuelos } from "./components/historialVuelos";
// import { Login } from "./components/login";

function App() {
  return (
    <AuthProvider>
      <ReservaProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Menu/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/editarperfil" element ={<EditarPerfil/>}></Route>     
            <Route path="/misreservas" element={<HistorialReservas/>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />     
            <Route path="/Reserva" element={<Reserva/>} />     
            <Route path="/reservas" element={<HistorialReservas/>} />  
            <Route path="/misVuelos" element={<HistorialVuelos/>} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      </ReservaProvider>
      
    </AuthProvider>
  );
}

export default App;
