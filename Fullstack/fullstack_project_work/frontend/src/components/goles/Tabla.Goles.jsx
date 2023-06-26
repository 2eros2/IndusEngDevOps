import React from 'react'

export default function TablaGoles({ items, onClickDelete, onClickNuevo }) {
    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <h5 className="card-title col-4 mt-1">Goles:</h5>
                    <div className="card-title col-7"></div>
                    <div className="col-1">
                        <button onClick={() => onClickNuevo()}
                            className='btn btn-primary'>
                            Nuevo
                        </button>

                    </div>
                </div>
                <div className='row d-flex flex-column align-items-center'>
                    <div className='col-auto w-100 p-3'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">IdGol</th>
                                    <th scope="col">Minuto Gol</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Clima</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.IdGol}</td>
                                            <td>{item.MinutoGol}</td>
                                            <td>{item.FechaGol}</td>
                                            <td>{item.clima}</td>
                                            <td>
                                                <div className='row'>
                                                    <button onClick={() => onClickNuevo(item)}
                                                        className='col-2 btn p-0'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'purple'
                                                        }}
                                                    >
                                                        <i className="fas fa-pencil"></i>
                                                    </button>
                                                    <button onClick={() => onClickDelete(item.IdGol)}
                                                        className='col-2 btn p-1'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            color: 'purple'                                                        }}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
