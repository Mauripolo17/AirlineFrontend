import React from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export const Sidebar: React.FC= () => {
  const navigate = useNavigate();

  const {user} = useAuth();

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => navigate('/dashboard')
    },
    {
      label: 'Mis Reservas',
      icon: 'pi pi-calendar',
      command: () => navigate('/misreservas')
    },
    {
      label: 'Buscar Vuelos',
      icon: 'pi pi-search',
      command: () => navigate('/')
    }
  ];

  const profileItems: MenuItem[] = [
    {
      label: 'Editar Perfil',
      icon: 'pi pi-user-edit',
      command: () => navigate('/editarperfil')
    },
    {
      separator: true
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-power-off',
      command: () => {
        // Logica de cierre de sesión
        navigate('/login');
      }
    }   
  ];

  return (
    <div className="h-screen w-64 bg-white flex flex-column">
      <div className="p-4 flex align-items-center justify-content-center surface-border">
        <img src="avion.png" alt="Logo" className="w-6rem h-6rem mb-5" />
      </div>
      
      <div className="flex-grow">
        <Menu model={menuItems} className="border-none w-full" />
      </div>
      
      <div className="flex-grow">
      <Menu model={profileItems} className="border-none w-full" />
        <div className="flex align-items-center gap-3 mb-3">
        <i className="pi pi-user p-3" style={{ fontSize: '1.5rem' }}></i>
          <div>
            <div className="font-bold">{user?.nombre}</div>
            <div className="text-sm text-500">{user?.email}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

