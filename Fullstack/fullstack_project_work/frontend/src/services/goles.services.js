
import axios from "axios";

const url = "http://localhost:4000/api/goles";

async function getGoles(filtro) {
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
        return (response?.data ?? []).filter(x => x.clima.includes(filtro.toUpperCase()))
    }
}


async function getGolesPorId(id) {
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

async function deleteGol(id) {
    let response = [];
    try {
        response = await axios.delete(`${url}/${id}`);
    } catch (error) {
        console.error(error)
        return false;
    }
}

async function saveClima(payload) {
    let response = [];
    if(payload.IdGol){
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

export { getGoles, getGolesPorId, deleteGol, saveClima}