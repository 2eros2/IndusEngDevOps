import React from 'react';

const ListadoAlbumes = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Artista</th>
            <th>Album</th>
            <th>Genero</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.Id}>
              <td>{item.Artista}</td>
              <td>{item.Album}</td>
              <td>{item.Genero}</td>
              <td>{item.Precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoAlbumes;
