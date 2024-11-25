import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { HistorialVuelos } from './historialVuelos';
import { Sidebar } from './sidebar';

export const Dashboard: React.FC = () => {


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        userName="Juan Pérez"
        userEmail="juan@example.com"
      />
      
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Mi Dashboard</h1>
          <p className="text-gray-600">Bienvenido de nuevo, Juan</p>
        </div>

        <TabView>
          <TabPanel header="Resumen" leftIcon="pi pi-home mr-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-12">
                <Card title="Historial de Vuelos" className="mb-4">
                  <HistorialVuelos />
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

