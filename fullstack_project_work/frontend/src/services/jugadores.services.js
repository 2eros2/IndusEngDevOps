
import axios from "axios";

const url = "http://localhost:4000/api/jugadores";

async function getJugadores(filtro) {
    let response = [];
    try {
        response = await axios.get(url);
    } catch (error) {
        console.error(error)
        return [];
    }
    if (!filtro) {
        return response.data ?? [];
    }
    else {
        return (response?.data ?? []).filter(x => x.Nombre.includes(filtro.toUpperCase()))
    }
}


async function getJugadoresPorId(id) {
    let response = [];
    try {
        console.log(id)
        response = await axios.get(`${url}/${id}`);
        return response?.data;
    } catch (error) {
        console.error(error)
        return [];
    }
}

async function deleteJugador(id) {
    let response = [];
    try {
        response = await axios.delete(`${url}/${id}`);
    } catch (error) {
        console.error(error)
        return false;
    }
}

async function saveJugador(payload) {
    let response = [];
    if(payload.IdJugador){
        try {
            response = await axios.put(url, payload);
            return response;
        } catch (error) {
            console.error(error)
            return false;
        }
    }else{
        try {
            response = await axios.post(url, payload);
            return response;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

export { getJugadores, getJugadoresPorId, deleteJugador, saveJugador}