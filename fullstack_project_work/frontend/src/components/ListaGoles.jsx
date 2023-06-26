export default function ListaGoles({goles}){

    return(
        <table > 
        <thead> Tabla de goles
            <tr>
                <th>ID </th>
                <th>MinutoGol</th>
                <th>FechaCreacion</th>
                <th>Clima</th>
            </tr>
            </thead>
            <tbody>
            {goles.map((goles) => {
                return(
                    <tr key={goles.IdGol}> 
                        <td>{goles.IdGol}</td>
                        <td>{goles.MinutoGol}</td>
                        <td>{goles.FechaGol}</td>
                        <td>{goles.clima}</td>
                    </tr>
                    )
                })}
            </tbody>
        
        </table>
    )
}
        
/*
','','
*/