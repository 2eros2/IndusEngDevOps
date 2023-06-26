import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditEstadios({ onCancelar, onConfirmar, estadio }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ values: estadio });

    return (
        <div>
            <div className="card">
                <div className="card-body w-50">
                    <h5 className="card-title">{estadio ? "Edición de Estadio" : "Nuevo Estadio"}:</h5>
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
                            <label htmlFor="FechaCreacion">Fecha Creacion:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="FechaCreacion"
                                {...register("FechaCreacion", {
                                    required: { value: true, message: "FechaCreacion es requerido" },
                                })}
                            />
                            {errors.FechaCreacion && <>{errors.FechaCreacion.message}</>}
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