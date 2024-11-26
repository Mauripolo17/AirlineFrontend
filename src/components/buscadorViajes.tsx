import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";
import { vueloService } from "../api/vuelosService";
import { Toast } from "primereact/toast";
import { SelectButton } from "primereact/selectbutton";
import { useReservaContext } from "../context/ReservaContext";

function BuscadorViajes() {
  const [ciudades, setCiudades] = useState<string[]>([]);
 const { flightToSearch, setFlightToSearch } = useReservaContext();
 const {searchMode, setSearchMode} = useReservaContext();
  const options: string[] = ["Solo ida", "Ida y vuelta"];
  const [ida, setIda] = useState<string>(options[0]);
  
  useEffect(() => {
    loadCiudades();
  }, []);

  const loadCiudades = async () => {
    try {
      const getCiudades = await vueloService.getCiudades();
      setCiudades(getCiudades);
    } catch (error) {
      console.log(error);
    }
  };
  const toast = useRef<Toast>(null);
  const showWarn = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 3000,
    });
  };
  function handleSearchButtom() {
    if (flightToSearch.destino && flightToSearch.desde && flightToSearch.origen) {
      if (ida === "Solo ida") {
        // setFlightToSearch({ ...flightToSearch});
        console.log(flightToSearch);
        setSearchMode({...searchMode, searchMode:true});
      } else if (ida === "Ida y vuelta" && flightToSearch.hasta) {
        setSearchMode(true);
      }
    } else {
      showWarn("Por favor llene todos los campos");
    }
  }

  return (
    <div id="buscarViajeContainer">
      <div className="card flex justify-content-center" id="containerSearch">
        <div id="containerVuelo">
          <div className="d-flex flex-column  justify-items-center">
            <div id="p-selectGroup">
              <SelectButton
                value={ida}
                onChange={(e: any) => setIda(e.value)}
                options={options}
                id="selectGroup"
              />
            </div>
            <div className="d-flex">
              <div className="d-flex w-100">
              <Dropdown
                value={flightToSearch.origen}
                onChange={(e) => setFlightToSearch({ ...flightToSearch, origen: e.value }) }
                options={ciudades}
                optionLabel="origen"
                editable
                placeholder="Origén"
                className="w-full md:w-13rem"
              />
              <Dropdown
                value={flightToSearch.destino}
                onChange={(e) => setFlightToSearch({...flightToSearch, destino:e.value})}
                options={ciudades}
                optionLabel="destino"
                editable
                placeholder="Destino"
                className="w-full md:w-13rem"
              />
              </div>
              <div id="bvCalendars" className="d-flex w-100">
                {ida === "Solo ida" ? (
                  <>
                    <Calendar
                      value={flightToSearch.desde}
                      placeholder="Fecha"
                      onChange={(e) => setFlightToSearch({...flightToSearch, desde:e.value})}
                      className="flex-grow-1"
                    />
                  </>
                ) : (
                  <>
                    <Calendar
                      value={flightToSearch.desde}
                      placeholder="Desde"
                      onChange={(e) => setFlightToSearch({...flightToSearch, desde:e.value})}
                      className="flex-grow-1"
                    />
                    <Calendar
                      value={flightToSearch.hasta}
                      placeholder="Hasta"
                      onChange={(e) => setFlightToSearch({...flightToSearch, hasta:e.value})}
                      className="flex-grow-1"
                      hideOnRangeSelection
                    />
                  </>
                )}

                <Toast ref={toast} />
                <Button
                  onClick={handleSearchButtom}
                  className="searchButtom"
                  icon="pi pi-search"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuscadorViajes;
