import { config } from "../config";
import axios from 'axios';
const urlResource = config.urlResourcePartidos;
  
async function Buscar(arbitro) {
    const resp = await axios.get(urlResource, {
        params: {arbitro},
    });
    return resp.data;
}

async function BuscarPorId(partido) {
    const resp = await axios.get(urlResource + "/" +
        partido.IdPartido);
    return resp.data;
}

async function Grabar(partido) {
    if (partido.IdPartido === 0) {
        await axios.post(urlResource, partido);
    } else {
        await axios.put(urlResource + "/" + partido.IdPartido, partido);
    }
}
async function deletePartido(item) {
    let response = [];
    try {
        response = await axios.delete(`${urlResource}/${item.IdPartido}`);
        console.log(response)
    } catch (error) {
        console.error(error)
        return false;
    }
  }
export const partidosService = {
    Buscar, BuscarPorId, Grabar, deletePartido
};