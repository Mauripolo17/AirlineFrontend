import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "primereact/button";
import "../assets/styles/style.css";
import { Dialog } from "primereact/dialog";
import { Login } from "./login";
import { SignUp } from "./signUp";
import { useNavigate } from "react-router-dom";
// import Menu from "./menu";
// import { BuscadorViajes } from "./buscadorViajes";


function Header() {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSignUp, setVisibleSignUp] = useState(false);

  const navItems = [
    "Home",
    "Ofertas",
    "Mis viajes",
    "Centro de Ayuda",
    "About",
  ];

  const navigation = useNavigate();
  
  const handleClick = (index: number, item:string) => {
    setActiveIndex(index);
    if(item === "Home"){
      navigation('/');
    }else{
      navigation(`/${item}`);
    }

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
                onClick={()=>handleClick(index, item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="ms-auto">
          <Button label="Login" onClick={() => setVisibleLogin(true)} className={`nav-button ${visibleLogin ? "active" : "bg-white custom-text-color" }`} />
          <Dialog
            header="Login"
            visible={visibleLogin}
            maximizable
            style={{ width: "50vw" }}
            onHide={() => {
              if (!visibleLogin) return;
              setVisibleLogin(false);
            }}
            
          >
            <Login/>
          </Dialog>
          <Button label="Sing Up" onClick={() => setVisibleSignUp(true)} className={`nav-button ${visibleSignUp ? "active" : "bg-white custom-text-color" }`}  />
          <Dialog
            header="Sign Up"
            visible={visibleSignUp}
            maximizable
            style={{ width: "60vw" }}
            onHide={() => {
              if (!visibleSignUp) return;
              setVisibleSignUp(false);
            }}
            
          >
            <SignUp/>
          </Dialog>

        </div>
      </header>
    </div>
  );
}

export default Header;
