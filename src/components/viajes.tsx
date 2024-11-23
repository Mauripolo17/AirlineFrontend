import "primeflex/primeflex.css"; // flex
import "primereact/resources/primereact.min.css"; //core css
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/viva-light/theme.css";
import { DataScroller } from "primereact/datascroller";
import { Vuelo } from "../api/vuelosService";

interface ViajesProps {
  vuelos: Vuelo[]; // Especifica que la prop "vuelos" es un array de Vuelo2
}
const Viajes: React.FC<ViajesProps> = ({ vuelos }) => {
  // const getSeverity = (product): => {
  //     switch (product.inventoryStatus) {
  //         case 'INSTOCK':
  //             return 'success';

  //         case 'LOWSTOCK':
  //             return 'warning';

  //         case 'OUTOFSTOCK':
  //             return 'danger';

  //         default:
  //             return null;
  //     }
  // };

  const itemTemplate = (data: Vuelo) => {
    return (
      <div className="col-11">
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
                <div className="text-2xl font-bold text-900">
                  {data.destino}
                </div>
                <div className="text-700">desde {data.origen}</div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-send"></i>
                  <span className="font-semibold">Vuelos</span>
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-2xl font-semibold">{`$${data.precio}USD`}</span>
              <Button
                style={{ borderRadius: "8px" }}
                icon="pi pi-send"
                label="Viajar"
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
        value={vuelos}
        itemTemplate={itemTemplate}
        rows={5}
        inline
        scrollHeight="500px"
        header="Vuelos destacados"
      />
    </div>
  );
};

export default Viajes;
