import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { vueloService } from "../api/vuelosService";
import { pasajeroService } from "../api/pasajeroService";
import { TabPanel, TabView } from "primereact/tabview";
import { Sidebar } from "./sidebar";

interface Vuelo {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  estado: "completado" | "proximo" | "cancelado";
  numeroVuelo: string;
}

interface Vueloh {
  id: number;
  origen: string;
  destino: string;
  fechaDeSalida: string;
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

export const HistorialVuelos: React.FC = () => {
  const [isLoasding, setIsLoading] = useState<boolean>(false);

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [pasajeros, setPasajeros] = useState<Reserva[]>([]);
  const [vuelos, setVuelos] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const actionBodyTemplate = (rowData: Vuelo) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          rounded
          text
          severity="secondary"
          tooltip="Ver Detalles"
        />
        {rowData.estado === "proximo" && (
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="danger"
            tooltip="Cancelar Vuelo"
          />
        )}
      </div>
    );
  };

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
        throw new Error("Usuario no autenticado.");
      }
      const response = await axios.get(
        `http://localhost:8080/api/reservas/cliente/${user.id}`
      );
      console.log(response.data);
      if (!response) {
        throw new Error("Failed to fetch reservas");
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
      setError(
        "Hubo un error al cargar las reservas. Por favor, intente de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const dateBodyTemplate = (rowData: Reserva) => {
    return rowData.vuelos.map((vuelo, index) => (
      <div key={index}>{vuelo.fechaDeSalida}</div>
    ));
  };

  const vuelosBodyTemplate = (rowData: Reserva) => {
    return rowData.vuelos.map((vuelo, index) => (
      <div key={index}>{vuelo.origen}</div>
    ));
  };

  const vuelosBody2Template = (rowData: Reserva) => {
    return rowData.vuelos.map((vuelo, index) => (
      <div key={index}>{vuelo.destino}</div>
    ));
  };

  const NBodyTemplate = (rowData: Reserva) => {
    return rowData.vuelos.map((vuelo, index) => (
      <div key={index}>{vuelo.id}</div>
    ));
  };

  return (
    <>
      {isLoasding ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />

          <div className="flex-1 p-4">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Mis Reservas</h1>
            </div>

            <TabView>
              <TabPanel header="Resumen de Vuelos" leftIcon="pi pi-home mr-2">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-12">
                    <Card title="Historial de Vuelos" className="mb-4">
                      <DataTable
                        value={reservas}
                        loading={loading}
                        className="p-datatable-sm"
                        emptyMessage="No se encontraron reservas"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                      >
                        <Column
                          field="vuelos{"
                          header="Número de Vuelo"
                          sortable
                          body={(rowData) => NBodyTemplate(rowData)}
                        />
                        <Column
                          field="fechaReserva"
                          header="Fecha de Vuelo"
                          sortable
                          body={(rowData) => dateBodyTemplate(rowData)}
                        />
                        <Column
                          field="vuelos.id"
                          header="Origen"
                          sortable
                          body={(rowData) => vuelosBodyTemplate(rowData)}
                        />
                        <Column
                          field="vuelos.id"
                          header="Destino"
                          sortable
                          body={(rowData) => vuelosBody2Template(rowData)}
                        />
                        {/* <Column body={actionBodyTemplate} header="Acciones" /> */}
                      </DataTable>
                    </Card>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      )}
    </>
  );
};
