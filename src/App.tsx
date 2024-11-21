// import { BuscadorViajes } from "./components/buscadorViajes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
// import Menu from "./components/menu";
import { AuthProvider } from "./context/AuthContext";
import { Footer } from "./components/footer";
// import { Home } from "./components/home";
import { Reserva } from "./components/reserva";
import "primeflex/primeflex.css"; // flex
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/viva-light/theme.css";
// import { Login } from "./components/login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Reserva/>} />     
          {/* <Route path="/" element={<Home />} />           */}
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
