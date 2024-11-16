import 'primeflex/primeflex.css'; // flex
import 'primereact/resources/primereact.min.css'; //core css
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import "primereact/resources/themes/viva-light/theme.css";
import { DataScroller } from 'primereact/datascroller';
// import { Tag } from 'primereact/tag';
 import { Vuelo, vueloService } from '../api/vuelosService'
 import ciudades from "../assets/images/ciudades.tsx"

export default function Viajes() {
    const [vuelos, setVuelos] = useState<Vuelo[]>([]);

    useEffect(() => {
         loadVuelos()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const loadVuelos = async ()=>{
        try{
            const getVuelos = await vueloService.getVuelos();
            setVuelos(getVuelos);
        }catch(error){
            console.log(error)
        }
    }

    function obtenerAtributoAleatorio():string {
        // Obtener todas las claves del objeto
        const claves = Object.keys(ciudades);
        
        // Seleccionar un índice aleatorio
        const indiceAleatorio = Math.floor(Math.random() * claves.length);
        
        // Obtener la clave aleatoria
        const claveAleatoria:string = claves[indiceAleatorio];
        
        // Obtener el valor correspondiente a esa clave
        return ciudades[claveAleatoria];
    }
    
    // const getSeverity = (product) => {
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
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-5 gap-6">
                    <img id='ciudadImg' className="w-9 sm:w-16rem xl:w-14rem shadow-2 block xl:block mx-auto border-round" src={obtenerAtributoAleatorio()} style={{width:"20%"}} alt={data.destino} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.destino}</div>
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
                            <span className="text-2xl font-semibold">$50</span>
                            <Button style={{borderRadius:"8px"}} icon="pi pi-send" label="Viajar"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataScroller value={vuelos} itemTemplate={itemTemplate} rows={5} buffer={0.4} header="Vuelos destacados" />
        </div>
    )
}
        