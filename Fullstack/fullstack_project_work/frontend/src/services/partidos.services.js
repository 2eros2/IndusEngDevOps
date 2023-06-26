import { config } from "../config";
import axios from 'axios';
const urlResource = config.urlResourcePartidos;

async function Buscar(arbitro, Activo, Pagina) {
    const resp = await axios.get(urlResource, {
        params: {arbitro, Activo, Pagina },
    });
    return resp.data;
}

async function BuscarPorId(partido) {
    const resp = await axios.get(urlResource + "/" +
        partido.IdPartido);
    return resp.data;
}
async function ActivarDesactivar(partido) {
    await axios.delete(urlResource + "/" + partido.IdPartido);
}
async function Grabar(partido) {
    if (partido.IdPartido === 0) {
        await axios.post(urlResource, partido);
    } else {
        await axios.put(urlResource + "/" + partido.IdPartido, partido);
    }
}
export const partidosService = {
    Buscar, BuscarPorId, ActivarDesactivar, Grabar
};