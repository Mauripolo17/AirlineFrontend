// import "bootstrap/dist/css/bootstrap.min.css";
import Viajes from "./viajes.tsx";
import { useEffect, useState } from "react";
import { Vuelo, vueloService } from "../api/vuelosService.tsx";
import BuscadorViajes from "./buscadorViajes.tsx";
import CarouselComponent from "./Carousel.tsx";
import { ResultadosDrBusqueda } from "./ResultadosDrBusqueda.tsx";
import { Reserva } from "./reserva.tsx";
import { ReservaProvider, useReservaContext } from "../context/ReservaContext.tsx";

function Menu() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [vuelos2, setVuelos2] = useState<Vuelo[]>([]);
  const {searchMode, setSearchMode} = useReservaContext();

  useEffect(() => {
    loadVuelos();
    setVuelos2(vuelos.slice(0, 5));
    // console.log(vuelos2);
  }, [searchMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadVuelos = async () => {
    try {
      const getVuelos = await vueloService.getVuelos();
      const shuffledVuelos = getVuelos.sort(() => Math.random() - 0.5);
      setVuelos(getVuelos);
      setVuelos2(shuffledVuelos.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <BuscadorViajes />
        {!searchMode ? (
          <>
            <CarouselComponent />
            <Viajes vuelos={vuelos2} />
          </>
        ) : (
          <ResultadosDrBusqueda />
        )}
      </div>
  );
}

export default Menu;
