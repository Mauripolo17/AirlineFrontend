import axios from 'axios'

const url_base = 'http://localhost:8080/api'

export interface Vuelo {
    id: number
    origen: string
    destino: string
    fechaDeSalida: string
    horaDeSalida: string
    capacidad: number
    aerolinea: number
    aeropuerto: number
    duracion: number
}

export interface Vuelo2 {
    id: number
    origen: string
    destino: string
    fechaDeSalida: string
    horaDeSalida: string
    capacidad: number
    aerolinea: number
    aeropuerto: number
    duracion: number
    imagen:string
}
export const vueloService = {
    getVuelos: async ():Promise<Vuelo[]> =>{
        try{
            const response = axios.get(`${url_base}/vuelos/getVuelos`)
            return (await response).data
        }catch(error){
            throw new Error('Error al obtener los vuelos')
            
        }
    },

    getVuelosByDestino: async (destino: string):Promise<Vuelo[]> =>{
        try{
            const response = axios.get(`${url_base}/vuelos/${destino}`)
            return (await response).data
        }catch(error){
            throw new Error('Error al obtener los vuelos')
            
        }
    }
}