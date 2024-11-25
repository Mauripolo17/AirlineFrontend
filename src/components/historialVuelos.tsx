import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

interface Vuelo {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  estado: 'completado' | 'proximo' | 'cancelado';
  numeroVuelo: string;
}

const vuelos: Vuelo[] = [
  {
    id: '1',
    origen: 'Madrid',
    destino: 'Barcelona',
    fecha: '2024-01-15',
    estado: 'completado',
    numeroVuelo: 'IB2021'
  },
  {
    id: '2',
    origen: 'Barcelona',
    destino: 'París',
    fecha: '2024-02-20',
    estado: 'proximo',
    numeroVuelo: 'IB2022'
  },
  {
    id: '3',
    origen: 'París',
    destino: 'Madrid',
    fecha: '2024-03-01',
    estado: 'proximo',
    numeroVuelo: 'IB2023'
  }
];

export const HistorialVuelos: React.FC = () => {
  const statusBodyTemplate = (rowData: Vuelo) => {
    const statusMap = {
      completado: { severity: 'success', label: 'Completado' },
      proximo: { severity: 'info', label: 'Próximo' },
      cancelado: { severity: 'danger', label: 'Cancelado' }
    };

    const estado = statusMap[rowData.estado];
    return <Tag severity={estado.severity as "success" | "info" | "danger" | "warning" | "secondary" | "contrast"} value={estado.label} />;
  };

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
        {rowData.estado === 'proximo' && (
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

  return (
    <DataTable 
      value={vuelos} 
      paginator 
      rows={5}
      rowsPerPageOptions={[5, 10, 20]}
      className="p-datatable-sm"
    >
      <Column field="numeroVuelo" header="Número de Vuelo" sortable />
      <Column field="origen" header="Origen" sortable />
      <Column field="destino" header="Destino" sortable />
      <Column field="fecha" header="Fecha" sortable />
      <Column field="estado" header="Estado" body={statusBodyTemplate} sortable />
      <Column body={actionBodyTemplate} header="Acciones" />
    </DataTable>
  );
};

