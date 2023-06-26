
import axios from "axios";

const url = "http://localhost:4000/api/estadios";

async function getEstadios(filtro) {
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


async function getEstadiosPorId(id) {
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

async function deleteEstadio(id) {
    let response = [];
    try {
        response = await axios.delete(`${url}/${id}`);
    } catch (error) {
        console.error(error)
        return false;
    }
}

async function saveEstadio(payload) {
    let response = [];
    if(payload.IdEstadio){
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

export { getEstadios, getEstadiosPorId, deleteEstadio, saveEstadio}