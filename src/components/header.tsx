import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/style.css";

function Header() {

  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = ['Home', 'Ofertas', 'Mis viajes', 'Centro de Ayuda', 'About'];
  return (
    <div className="container">
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
      {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                href="#"
                className={`nav-link ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {item}
              </a>
            </li>
          ))}
      </ul>
    </header>
  </div>
  );
}

export default Header;
