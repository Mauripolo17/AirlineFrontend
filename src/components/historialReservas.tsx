import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Sidebar } from './sidebar';

export const HistorialReservas: React.FC = () => {


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        userName="Juan Pérez"
        userEmail="juan@example.com"
      />
      
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Mis Reservas</h1>
          <br />
        </div>

        <TabView>
          <TabPanel header="Reservas" leftIcon="pi pi-calendar mr-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-12">
                <Card title="Historial de Reservas" className="mb-4 ">
                  // Aquí va el la logica del HistorialReservas
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

