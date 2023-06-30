import React from "react";
import { useForm } from "react-hook-form";

export default function RegistroPartidos({
    AccionABMC,
    Equipos,
    Estadios,
    partido,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: partido });
    
    const onSubmit = (data) => { 
        Grabar(data); 
    };
    if (!partido) return null;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>
                    {/* campo Equipo-Local */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="IdEquipoLocal">
                                Equipo Local<span className="text-danger">*</span>:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("equipo_local_id", {
                                    required: { value: true, message: "Equipo Local es requerido" },
                                })}
                                className={
                                    "form-control " +
                                    (errors?.equipo_local_id ? "is-invalid" : "")
                                }
                            >
                                <option value="" key={1}></option>
                                {Equipos?.map((x) => (
                                    <option value={x.IdEquipo} key={x.IdEquipo}>
                                        {x.Nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.equipo_local_id?.message}
                            </div>

                        </div>
                    </div>

                    {/* campo Equipo Visitante */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="IdEquipoVisitante"
                            >Equipo Visitante<span className="text-danger">*</span>:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("equipo_visitante_id", {
                                    required: { value: true, message: "Equipo visitante es requerido" },
                                })}
                                className={
                                    "form-control " +
                                    (errors?.equipo_visitante_id ? "is-invalid" : "")
                                }
                            >
                                <option value="" key={1}></option>
                                {Equipos?.map((x) => (
                                    <option value={x.IdEquipo} key={x.IdEquipo}>
                                        {x.Nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.equipo_visitante_id?.message}
                            </div>
                        </div>
                    </div>
                    {/* campo Fecha */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="fecha">
                                Fecha<span className="text-danger">*</span>:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("fecha", {
                                    required: { value: true, message: "La fecha es requerido" }
                                })}
                                className={
                                    "form-control " + (errors?.fecha ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">
                                {errors?.fecha?.message}
                            </div>
                        </div>
                    </div>
                    {/* campo Estadio */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="IdEstadio"
                            >Estadio<span className="text-danger">*</span>:</label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("IdEstadio", {
                                    required: { value: true, message: "Estadio es requerido" },
                                })}
                                className={
                                    "form-control " +
                                    (errors?.IdEstadio ? "is-invalid" : "")
                                }>
                                <option value="" key={1}></option>
                                {Estadios?.map((x) => (
                                    <option value={x.IdEstadio} key={x.IdEstadio}>
                                        {x.Nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.IdEstadio?.message}
                            </div>
                        </div>
                    </div>
                    {/* campo Arbitro */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Arbitro">
                                Arbitro<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input type="text"
                                {...register("arbitro", {
                                    required: { value: true, message: "Arbitro es requerido" },
                                    minLength: {
                                        value: 2,
                                        message: "Arbitro debe tener al menos 2 caracteres",
                                    },
                                    maxLength: {
                                        value: 15, message: "Arbitro debe tener como máximo 15 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.arbitro ? "is-invalid" : "")
                                }
                            />
                            {errors?.arbitro && touchedFields.arbitro && (
                                <div className="invalid-feedback">
                                    {errors?.arbitro?.message}
                                </div>
                            )}
                        </div>
                    </div>
                </fieldset>
                {/* Botones Grabar, Cancelar/Volver' */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>
                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}


