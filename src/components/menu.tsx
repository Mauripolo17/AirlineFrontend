// import "bootstrap/dist/css/bootstrap.min.css";
import Viajes from "./viajes.tsx";
import { useEffect, useState } from "react";
import { Vuelo, vueloService } from "../api/vuelosService.tsx";
import BuscadorViajes  from "./buscadorViajes.tsx";
import CarouselComponent from "./Carousel.tsx";
import { ResultadosDrBusqueda } from "./ResultadosDrBusqueda.tsx";


function Menu() {

  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [vuelos2, setVuelos2] = useState<Vuelo[]>([]);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  

  useEffect(() => {
    loadVuelos();
    setVuelos2(vuelos.slice(0,5));
    console.log(vuelos2);
  }, [searchMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadVuelos = async () => {
    try {
      const getVuelos = await vueloService.getVuelos();
      setVuelos(getVuelos);
      setVuelos2(getVuelos.slice(0,5));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
     <BuscadorViajes setSearchMode={setSearchMode} />
      {!searchMode ? <><CarouselComponent />
        <Viajes vuelos={vuelos2} /></> : <ResultadosDrBusqueda/>}
      
    </div>
  );
}

export default Menu;
