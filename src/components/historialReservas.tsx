import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "./sidebar";


interface Vuelo {
  origen: string;
  destino: string;
  fecha: Date;
}

interface Pasajero {
  nombre: string;
  apellido: string;
  numeroDocumento: number;
}

interface Reserva {
  id: number;
  fechaReserva: Date;
  vuelo: Vuelo;
  pasajeros: Pasajero[];
  numeroVuelo: string;
}

export const HistorialReservas: React.FC = () => {
  const reservas: Reserva[] = [
    {
      id: 1,
      fechaReserva: new Date(),
      numeroVuelo: "VY1234",
      vuelo: {
        origen: "Madrid",
        destino: "Barcelona",
        fecha: new Date(),
      },
      pasajeros: [
        {
          nombre: "Juan",
          apellido: "Pérez",
          numeroDocumento: 12345678,
        },
        {
          nombre: "María",
          apellido: "González",
          numeroDocumento: 87654321,
        },
      ],
    },
  ];

  const actionBodyTemplate = (rowData: Reserva) => {
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
          tooltip="Cancelar Vuelo"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const dateBodyTemplate = (rowData: Reserva, field: keyof Reserva) => {
    const date = rowData[field] as Date;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Mis Reservas</h1>
        </div>x

        <TabView>
          <TabPanel header="Reservas" leftIcon="pi pi-calendar">
            <div className="grid">
              <div className="col-12">
                <Card title="Historial de Reservas" className="mb-4">
                  <DataTable
                    value={reservas}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    className="p-datatable-sm"
                  >
                    <Column field="numeroVuelo" header="Número de Vuelo" sortable />
                    <Column field="fechaReserva" header="Fecha de Reserva" sortable body={(rowData) => dateBodyTemplate(rowData, 'fechaReserva')} />
                    <Column field="vuelo.destino" header="Destino" sortable />
                    <Column field="vuelo.fecha" header="Fecha de Vuelo" sortable body={(rowData) => dateBodyTemplate(rowData.vuelo, 'fecha')} />
                    <Column body={actionBodyTemplate} header="Acciones" />
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

