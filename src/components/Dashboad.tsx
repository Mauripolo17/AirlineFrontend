import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { HistorialVuelos } from './historialVuelos';
import { Sidebar } from './sidebar';
import { useAuth } from '../context/AuthContext';
import { BienvenidaDashboard } from './Bienvenida';



export const Dashboard: React.FC = () => {
    const { user} = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
      />
      
      <div className="flex-1 p-4">
        <div className="mb-4">
        <BienvenidaDashboard />
        </div>
      </div>
    </div>
  );
};

