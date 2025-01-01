import { signal } from "@preact/signals";
import { Cliente as Cliente_type } from "../types.ts";

export const C = signal<Cliente_type>({
  id_cliente: 0,
  Nombre: "",
  Apellidos: "",
  DNI: "",
  Telefono: 0,
  CP: 0,
  Direccion: "",
  Correo: "",
  Empresa: 0,
  Fecha_Alta: "",
  Fecha_Baja: "",
  Fecha_mod: "",
  Activo: 1,
});
console.log("Señal Cliente: ", C);
