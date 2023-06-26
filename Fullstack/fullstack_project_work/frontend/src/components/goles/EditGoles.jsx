import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditGoles({ onCancelar, onConfirmar, gol }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ values: gol });

    return (
        <div>
            <div className="card">
                <div className="card-body w-50">
                    <h5 className="card-title">{gol ? "Edición de Gol" : "Nuevo Gol"}:</h5>
                    <form onSubmit={handleSubmit(onConfirmar)}>
                        <div className="form-group">
                            <label htmlFor="nombre">Minuto:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="MinutoGol"
                                {...register('MinutoGol', { required: 'MinutoGol Requerido' })}
                            />
                            {errors.MinutoGol && <>{errors.MinutoGol.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="FechaGol"
                                {...register('FechaGol', { required: 'FechaGol Requerido' })}
                            />
                            {errors.FechaGol && <>{errors.FechaGol.message}</>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="fechaNac">Clima:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Clima"
                                {...register("clima", {
                                    required: { value: true, message: "clima es requerido" },
                                })}
                            />
                            {errors.clima && <>{errors.clima.message}</>}
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