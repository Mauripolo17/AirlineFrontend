import axios from "axios";

export interface cliente {
  id: number;
  username: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  numeroDocumento: number;
  direccion: string;
  telefono: number;
  fechaDeNacimiento: string;
}


const url_base = "http://localhost:8080/api/clientes";
export const clienteService = {
  getClients: async (): Promise<cliente[]> => {
    return await axios.get(`${url_base}/clientes`);
  },
  getClientByUsername: async (
    username: string,
    token: string
  ): Promise<cliente> => {
    const client = await axios.get(`${url_base}/username/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return client.data;
  },

  createClient: async (client: cliente): Promise<cliente> => {
    const newClient = await axios.post(`${url_base}/clientes`, client);
    return newClient.data;
  },



};
