import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditarEquipos({ onCancelar, onConfirmar, equipo }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ values: equipo });

    return (
        <div>
            <div className="card">
                <div className="card-body w-50">
                    <h5 className="card-title">{equipo ? "Edición de equipo" : "Nuevo equipo"}:</h5>
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
                            <label htmlFor="fechaFun">Fecha Fundacion:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="FechaFun"
                                {...register("FechaFun", {
                                    required: { value: true, message: "FechaFun es requerido" },
                                })}
                            />
                            {errors.FechaFun && <>{errors.FechaFun.message}</>}
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