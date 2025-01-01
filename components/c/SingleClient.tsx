import { FunctionalComponent } from "preact";
import { Cliente } from "../../types.ts";
import { Signal } from "@preact/signals";

export const SingleClient: FunctionalComponent<
  { data: Signal<Partial<Cliente>> }
> = (
  { data },
) => {
  return (
    <>
      <div>
        <p>Nombre: {data.value.Nombre}</p>
        <p>Apellido: {data.value.Apellidos}</p>
        <p>Telefono: {data.value.Telefono}</p>
        <p>Direccion: {data.value.Direccion}</p>
        <p>Correo: {data.value.Correo}</p>
        <p>DNI: {data.value.DNI}</p>
        <p>CP: {data.value.CP}</p>
        <p>¿Es Empresa?: {data.value.Empresa ? "Si" : "No"}</p>
      </div>
    </>
  );
};
