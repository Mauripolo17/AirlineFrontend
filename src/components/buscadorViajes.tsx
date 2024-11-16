import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Button } from 'primereact/button';
import "primereact/resources/themes/viva-light/theme.css";
import 'primeicons/primeicons.css';
        

export function BuscadorViajes() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [desde, setDesde] = useState<Nullable<Date>>(null);
  const [hasta, setHasta] = useState<Nullable<Date>>(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div id="buscarViajeContainer">
      <div className="card flex justify-content-center" id="containerVuelo">
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          editable
          placeholder="Elige tu destino"
          className="w-full md:w-20rem"
          
        />
        <div id="bvCalendars">
        <Calendar value={desde} placeholder="Desde" onChange={(e) => setDesde(e.value)} />
        <Calendar value={hasta} placeholder="Hasta" onChange={(e) => setHasta(e.value)} />
        <Button  className="searchButtom" icon="pi pi-search"  aria-label="Search" />
        </div>
      </div>
    </div>
  );
}
