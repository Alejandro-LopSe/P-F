import { signal } from "@preact/signals";
import { Cliente } from "../types.ts";

export const C = signal<Partial<Cliente>>({
  id_cliente: undefined,
  Nombre: undefined,
  Apellidos: undefined,
  DNI: undefined,
  Telefono: undefined,
  CP: undefined,
  Direccion: undefined,
  Correo: undefined,
  Empresa: undefined,
  Fecha_Alta: undefined,
  Fecha_Baja: undefined,
  Fecha_mod: undefined,
  Activo: undefined,
});
