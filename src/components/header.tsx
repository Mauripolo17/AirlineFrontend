import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "primereact/button";
import "../assets/styles/style.css";
import { Dialog } from "primereact/dialog";
import { Login } from "./login";
import { SignUp } from "./signUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import Menu from "./menu";
// import { BuscadorViajes } from "./buscadorViajes";

function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isAuthenticated, logout, user } = useAuth();


  const navItems = [
    "Home",
    "Ofertas",
    "Mis viajes",
    "Centro de Ayuda",
    "About",
  ];

  const navigation = useNavigate();

  const handleClick = (index: number, item: string) => {
    setActiveIndex(index);
    if (item === "Home") {
      navigation("/");
    } else {
      navigation(`/${item}`);
    }
  };

  const handleButtonLogout = () => {
    navigation("/dashboard");
  };

  return (
    <div className="container">
      <header
        className="d-flex align-items-center position-relative py-3"
        id="header"
      >
        <h5 id="TituloP">DESPEGALA.COM</h5>
        <ul className="nav nav-pills position-absolute start-50 translate-middle-x">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                href="#"
                className={`nav-link ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleClick(index, item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="ms-auto">
          {isAuthenticated ? (
            <Button
              label={`Dashboard`}
              onClick={handleButtonLogout}
              className="nav-button bg-white custom-text-color"
            />
          ) : (
            <Button
              label="Login"
              onClick={() => navigation("/login")}
              className={"nav-button"}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
