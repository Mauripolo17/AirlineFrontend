import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useEffect, useRef, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Button } from 'primereact/button';
import "primereact/resources/themes/viva-light/theme.css";
import 'primeicons/primeicons.css';
import {vueloService } from "../api/vuelosService";
import { Toast } from 'primereact/toast';
        


function BuscadorViajes({setSearchMode}:any) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [desde, setDesde] = useState<Nullable<Date>>(null);
  const [hasta, setHasta] = useState<Nullable<Date>>(null);
  const[ciudades, setCiudades] = useState<string[]>([]);
  useEffect(() => {
    loadCiudades();
  }, [])
  

  const loadCiudades = async () => {
    try {
      const getCiudades = await vueloService.getCiudades();
      setCiudades(getCiudades);

    } catch (error) {
      console.log(error);
    }
  };
  const toast = useRef<Toast>(null);
  const showWarn = (msg:string) => {
    toast.current?.show({severity:'error', summary: 'Error', detail:msg, life: 3000});
}
  function handleSearchButtom(){
    if(selectedCity && desde && hasta){
      setSearchMode(true);
    }else{
      showWarn("Por favor llene todos los campos");
    }
    
  }

  return (
    <div id="buscarViajeContainer">
      <div className="card flex justify-content-center" id="containerVuelo">
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={ciudades}
          optionLabel="name"
          editable
          placeholder="Elige tu destino"
          className="w-full md:w-20rem"
          
        />
        <div id="bvCalendars">
        <Calendar value={desde} placeholder="Desde" onChange={(e) => setDesde(e.value)} />
        <Calendar value={hasta} placeholder="Hasta" onChange={(e) => setHasta(e.value)} />
        <Toast ref={toast} />
        <Button  onClick={handleSearchButtom} className="searchButtom" icon="pi pi-search"  aria-label="Search" />
        </div>
      </div>
    </div>
  );
}

export default BuscadorViajes;