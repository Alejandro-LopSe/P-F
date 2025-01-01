import { signal } from "@preact/signals";
import { Cliente as Cliente_type, Pedido } from "../types.ts";

export const P = signal<Partial<Pedido>>({
  id_pedido: undefined,
  id_cliente: undefined,
  ano_fiscal: undefined,
  mes: undefined,
  id_empleado: undefined,
  estado: undefined,
  envio: undefined,
  pago_total: undefined,
  notas: undefined,
});
console.log("Señal Pedido: ", P);
