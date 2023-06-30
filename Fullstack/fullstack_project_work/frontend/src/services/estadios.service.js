import axios from "axios";

const urlResource = "http://localhost:4000/api/estadios";

async function Buscar(Nombre) {
  const resp = await axios.get(urlResource, {
    params: { Nombre},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdEstadio);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdEstadio === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdEstadio, item);
  }
}

async function deleteEstadios(item) {
  let response = [];
  try {
      response = await axios.delete(`${urlResource}/${item.IdEstadio}`);
      console.log(response)
  } catch (error) {
      console.error(error)
      return false;
  }
}

export const estadiosService = {
  Buscar,BuscarPorId,Grabar, deleteEstadios
};
