import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "./sidebar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { vueloService } from "../api/vuelosService";
import { pasajeroService } from "../api/pasajeroService";

interface Vueloh {
  id: number;
  origen: string;
  destino: string;
  fecha: string;
}

interface Pasajero {
  nombre: string;
  apellido: string;
  numeroDocumento: number;
}

interface Reserva {
  id: number;
  fechaReserva: string;
  numeroVuelo: string;
  vuelos: Vueloh[];
  pasajeros: Pasajero[];
}

export const HistorialReservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [pasajeros, setPasajeros] = useState<Reserva[]>([]);
  const [vuelos, setVuelos] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    setError("");

    // if (!user?.id) {
    //   setError("Usuario no autenticado.");
    //   setLoading(false);
    //   return;
    // }
    
    try {
      setLoading(true);
      if (!user) {
        throw new Error('Usuario no autenticado.');
      }
      const response = await axios.get((`http://localhost:8080/api/reservas/cliente/${user.id}`))
      console.log(response.data); 
      if (!response) {
        throw new Error('Failed to fetch reservas');
      }
        // Procesar vuelos y pasajeros de forma asíncrona
    const reservasConDetalles = await Promise.all(
      response.data.map(async (reserva: Reserva) => {
        const [responseVuelos, responsePasajeros] = await Promise.all([
          vueloService.getVuelosByReserva(reserva.id),
          pasajeroService.getPasajeroByReserva(reserva.id),
        ]);

        return {
          ...reserva,
          vuelos: responseVuelos,
          pasajeros: responsePasajeros,
        };
      })
    );

    setReservas(reservasConDetalles);
  } catch (error: any) {
    console.error("Error fetching reservas:", error);
    setError("Hubo un error al cargar las reservas. Por favor, intente de nuevo más tarde.");
  } finally {
    setLoading(false);
  }
  };

  const actionBodyTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-eye"
          className="p-button-secondary p-button-sm"
          tooltip="Ver Detalles"
          tooltipOptions={{ position: 'top' }}
        />
        <Button 
          icon="pi pi-times"
          className="p-button-danger p-button-sm"
          tooltip="Cancelar reserva"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const dateBodyTemplate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const vuelosBodyTemplate = (rowData: Reserva) => {

    return rowData.vuelos.map((vuelo, index) => (
      <div key={index}>
      {vuelo.origen}-{vuelo.destino}
      </div>
    ));
  };

  const NBodyTemplate = (rowData: Reserva) => {

    return rowData.vuelos.map((vuelo, index) => (
      <div key={index}>
      {vuelo.id}
      </div>
    ));
  };

  const pasajerosBodyTemplate = (rowData: Reserva) => {
    return rowData.pasajeros.map((pasajero, index) => (
      <div key={index}>
        {pasajero.nombre}
      </div>
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Mis Reservas</h1>
        </div>

        <TabView>
          <TabPanel header="Reservas" leftIcon="pi pi-calendar">
            <div className="grid">
              <div className="col-12">
                <Card title="Historial de Reservas" className="mb-4">
                  {error && <div className="p-message p-message-error mb-4">{error}</div>}
                  <DataTable
                    value={reservas}
                    loading={loading}
                    className="p-datatable-sm"
                    emptyMessage="No se encontraron reservas"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                  >
                    <Column field="id" header="ID" sortable />
                    <Column field="vuelos{" header="Número de Vuelo" sortable body={(rowData) => NBodyTemplate(rowData)}/>
                    <Column field="fechaReserva" header="Fecha de Reserva" sortable body={(rowData) => dateBodyTemplate(rowData.fechaReserva)} />
                    <Column field="vuelos.id" header="Vuelos" sortable body={(rowData)=>vuelosBodyTemplate(rowData)} />
                    <Column header="Pasajeros" body={pasajerosBodyTemplate} />
                    {/* <Column body={actionBodyTemplate} header="Acciones" /> */}
                  </DataTable>
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

