import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useEffect, useRef, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Button } from "primereact/button";
import "primereact/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";
import { vueloService } from "../api/vuelosService";
import { Toast } from "primereact/toast";
import { SelectButton } from "primereact/selectbutton";

function BuscadorViajes({ setSearchMode }: any) {
  const [origen, setOrigen] = useState(null);
  const [destino, setDestino] = useState(null);
  const [desde, setDesde] = useState<Nullable<Date>>(null);
  const [hasta, setHasta] = useState<Nullable<Date>>(null);
  const [ciudades, setCiudades] = useState<string[]>([]);

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
    if (destino && desde && origen) {
      if (ida === "Solo ida") {
        setSearchMode(true);
      } else if (ida === "Ida y vuelta" && hasta) {
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
                value={origen}
                onChange={(e) => setOrigen(e.value)}
                options={ciudades}
                optionLabel="origen"
                editable
                placeholder="Origén"
                className="w-full md:w-13rem"
              />
              <Dropdown
                value={destino}
                onChange={(e) => setDestino(e.value)}
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
                      value={desde}
                      placeholder="Fecha"
                      onChange={(e) => setDesde(e.value)}
                      className="flex-grow-1"
                    />
                  </>
                ) : (
                  <>
                    <Calendar
                      value={desde}
                      placeholder="Desde"
                      onChange={(e) => setDesde(e.value)}
                      className="flex-grow-1"
                    />
                    <Calendar
                      value={hasta}
                      placeholder="Hasta"
                      onChange={(e) => setHasta(e.value)}
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
