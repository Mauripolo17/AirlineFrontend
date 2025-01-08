import { useEffect, useState } from "react";
import { useReservaContext } from "../context/ReservaContext";
import { Vuelo, VueloInfo, vueloService } from "../api/vuelosService";
import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ResultadosDrBusqueda() {
  const [resultados, setResultados] = useState<VueloInfo[]>([]);
  const { flightToSearch, searchMode, setFlightSelected, flightSelected } = useReservaContext();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedVuelo, setSelectedVuelo] = useState<VueloInfo | null>(null);

  const navigation = useNavigate()
  useEffect(() => {
    loadResultados();
  }, [searchMode]);


  const loadResultados = async () => {
    const vuelos = await vueloService.buscarVuelos(flightToSearch);
    setResultados(vuelos);
  };

  const handlReservaButton=(data:VueloInfo)=>{
      setFlightSelected(data);
      debugger; 
      navigation('/Reserva');
  }

  const infoVuelo = (vuelo: VueloInfo) => {
    return (
      <>
        <div>
          <div className="col-md-4"></div>
          <div className="col-md-15">
            <div className="card-body">
              <Row>
                <Col>
                  <p className="card-text">
                    <strong>Origen:</strong>{" "}
                    <span id="vuelo-origen">{vuelo.origen} </span>
                  </p>
                  <p className="card-text">
                    <strong>Destino:</strong>{" "}
                    <span id="vuelo-destino">{vuelo.destino}</span>
                  </p>
                  <p className="card-text">
                    <strong>Fecha de Salida:</strong>{" "}
                    <span id="fecha-salida">{vuelo.fechaDeSalida}</span>
                  </p>
                  <p className="card-text">
                    <strong>Hora de Salida:</strong>{" "}
                    <span id="hora-salida">{vuelo.horaDeSalida}</span>
                  </p>
                  <p className="card-text">
                    <strong>Duración:</strong>{" "}
                    <span id="duracion-vuelo">{vuelo.duracion}</span> horas
                  </p>
                </Col>
                <Col>
                  <p className="card-text">
                    <strong>Capacidad:</strong>{" "}
                    <span id="capacidad-vuelo">{vuelo.capacidad}</span> asientos
                  </p>
                  <p className="card-text">
                    <strong>Precio:</strong>{" "}
                    <span id="precio-vuelo">{`${vuelo.precio}`}</span>
                  </p>
                  <p className="card-text">
                    <strong>Aerolínea:</strong>{" "}
                    <span id="aerolínea">{vuelo.aerolinea.nombre}</span>
                  </p>
                  <p className="card-text">
                    <strong>Aeropuerto:</strong>{" "}
                    <span id="aeropuerto">{vuelo.aeropuerto.nombre}</span>
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  };

  const itemTemplate = (data: VueloInfo) => {
    return (
      <div className="col-11" key={data.id}>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-5 gap-6">
          <div style={{ width: "300px", height: "150px", overflow: "hidden" }}>
            <img
              id="ciudadImg"
              className="w-9 sm:w-16rem xl:w-14rem shadow-2 block xl:block mx-auto border-round"
              src={data.img}
              alt={data.destino}
            />
          </div>
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="h5 font-bold text-700">
                  {`${data.origen}-${data.destino}`}
                </div>
                <div className="text-700">{`${flightToSearch.desde?.toDateString()} ${
                  data.horaDeSalida
                }`}</div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="flex align-items-center gap-2">
                  <Button
                    label="Info"
                    style={{ borderRadius: "8px" }}
                    icon="pi pi-info-circle"
                    onClick={() => {
                      setSelectedVuelo(data); // Establece el vuelo seleccionado
                      setVisible(true); // Muestra el diálogo
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-2xl font-semibold">{`$${data.precio}USD`}</span>
              <Button
                style={{ borderRadius: "8px" }}
                icon="pi pi-send"
                label="Reservar"
                onClick={() => {              
                 handlReservaButton(data);
                }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container" id="containerVuelosDestacados">
      <DataScroller
        value={resultados}
        itemTemplate={itemTemplate}
        rows={5}
        inline
        scrollHeight="500px"
        header="Vuelos destacados"
      />
      <Dialog
        header="Información del vuelo"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          setVisible(false);
          setSelectedVuelo(null); // Restablece el vuelo seleccionado cuando se cierra el diálogo
        }}
      >
        {selectedVuelo && infoVuelo(selectedVuelo)}{" "}
        {/* Muestra el vuelo seleccionado */}
      </Dialog>
    </div>
  );
}
