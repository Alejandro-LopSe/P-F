import { signal } from "@preact/signals";
import { Articulo, Envio, Estado, Pedido, Reserva } from "../types.ts";

export const P = signal<Partial<Pedido>>({
  id_pedido: undefined,
  id_cliente: undefined,
  ano_fiscal: undefined,
  mes: undefined,
  id_empleado: undefined,
  estado: Estado.PENDIENTE,
  envio: Envio.RECOGIDA,
  pago_total: undefined,
  notas: undefined,
});

export const R = signal<Partial<Reserva[]>>([]);
