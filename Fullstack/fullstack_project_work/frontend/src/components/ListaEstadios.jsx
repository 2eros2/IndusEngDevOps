export default function ListaEstadios({estadios}){

    return(
        <table > 
        <thead> Tabla de estadios
            <tr>
                <th>ID </th>
                <th>Nombre</th>
                <th>FechaCreacion</th>
            </tr>
            </thead>
            <tbody>
            {estadios.map((estadio) => {
                return(
                    <tr key={estadio.IdEstadio}> 
                        <td>{estadio.IdEstadio}</td>
                        <td>{estadio.Nombre}</td>
                        <td>{estadio.FechaCreacion}</td>
                    </tr>
                    )
                })}
            </tbody>
        
        </table>
    )
}
        
/*

*/