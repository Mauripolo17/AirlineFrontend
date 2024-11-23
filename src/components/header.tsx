import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "primereact/button";
import "../assets/styles/style.css";
import { Dialog } from "primereact/dialog";
import { Login } from "./login";

function Header() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    "Home",
    "Ofertas",
    "Mis viajes",
    "Centro de Ayuda",
    "About",
  ];
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
                onClick={() => setActiveIndex(index)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="ms-auto">
          <Button label="Login" onClick={() => setVisible(true)} />
          <Dialog
            header="Login"
            visible={visible}
            maximizable
            style={{ width: "50vw" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
            
          >
            <Login/>
          </Dialog>
          <Button label="Sing Up" link />
        </div>
      </header>
    </div>
  );
}

export default Header;
