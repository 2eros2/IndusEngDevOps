import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment'

export default function EditJugadores({ onCancelar, onConfirmar, jugador }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ values: jugador });
    

    return (
        <div>
            <div className="card">
                <div className="card-body w-50">
                    <h5 className="card-title">{jugador ? "Edición de Jugador" : "Nuevo Jugador"}:</h5>
                    <form onSubmit={handleSubmit(onConfirmar)}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Nombre"
                                {...register('Nombre', { required: 'Nombre Requerido' })}
                            />
                            {errors.Nombre && <>{errors.Nombre.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="FechaNac">Fecha Nacimiento:</label>
                            <input
                                type="date" //dd-mm-yy
                                className="form-control"
                                id="FechaNac"
                                {...register("FechaNac", {
                                    required: { value: true, message: "Fecha Nac es requerido" },
                                })}
                            />
                            {errors.FechaNac && <>{errors.FechaNac.message}</>}
                        </div>
                        <button type="submit" className="btn btn-primary m-1">
                            Confirmar
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={() => { onCancelar() }}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}