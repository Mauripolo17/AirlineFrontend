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
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSignUp, setVisibleSignUp] = useState(false);
  const {isAuthenticated, logout} = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setVisibleLogin(false);
      setVisibleSignUp(false);
    }
  }, [isAuthenticated]);

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
    logout();
    () => navigation("/")

  }

  function loginAndSignUpButtons() {
    return (
      <>
      <Button
            label="Login"
            onClick={() => navigation("/login")}
            className={`nav-button ${
              visibleLogin ? "active" : "bg-white custom-text-color"
            }`}
          />
          <Button
            label="Sing Up"
            onClick={() => navigation("/signUp")}
            className={`nav-button ${
              visibleSignUp ? "active" : "bg-white custom-text-color"
            }`}
          />
         </>
    )
  }
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
            label="Logout"
            onClick={handleButtonLogout}
            className="nav-button bg-white custom-text-color"/>
          ):loginAndSignUpButtons()}
        </div>
      </header>
    </div>
  );
}

export default Header;
