import { Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { FormUsuario } from "./formUser";
import { TabPanel, TabView } from "primereact/tabview";
import { Sidebar } from "./sidebar";

export function EditarPerfil() {
  const { user } = useAuth();

  const initialUserData = {
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    numeroDocumento: user?.numeroDocumento || null,
    direccion: user?.direccion || "",
    telefono: user?.telefono || null,
    fechaDeNacimiento: user?.fechaDeNacimiento
      ? new Date(user.fechaDeNacimiento)
      : null,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Mis datos</h1>
        </div>

        <TabView>
          <TabPanel header="Editar mis datos" leftIcon="pi pi-user-edit mr-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="w-full">
                <Card className="w-full">
                    <FormUsuario mode="edit" initialData={initialUserData} />
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
