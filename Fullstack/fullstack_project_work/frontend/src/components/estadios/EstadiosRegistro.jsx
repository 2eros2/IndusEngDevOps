import React from "react";
import { useForm } from "react-hook-form";

export default function EstadiosRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) 
{
const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>
          
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
          <input
            type="text"
            {...register("Nombre", {
                required: { value: true, message: "Nombre es requerido" },
                minLength: {
                value: 4,
                message: "Nombre debe tener al menos 4 caracteres",
                },
                maxLength: {
                value: 55,
                message: "Nombre debe tener como máximo 55 caracteres",
                },
            })}
            autoFocus
            className={
                "form-control " + (errors?.Nombre ? "is-invalid" : "")
            }
            />
            {errors?.Nombre && touchedFields.Nombre && (
            <div className="invalid-feedback">
                {errors?.Nombre?.message}
            </div>
            
            )}
            </div>
            </div>
            
            
          {/* campo FechaCreacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaCreacion">
                Fecha Creacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
          <input
            type="date"
            {...register("FechaCreacion", {
                required: { value: true, message: "Fecha es requerido" }
            })}
            className={
                "form-control " + (errors?.FechaCreacion ? "is-invalid" : "")
            }
            />
            <div className="invalid-feedback">
            {errors?.FechaCreacion?.message}
            </div>
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
