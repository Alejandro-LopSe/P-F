import { FunctionalComponent } from "preact";
import { Pedido } from "../types.ts";
export const InfoPedido: FunctionalComponent<{ pedido: Pedido }> = (
  { pedido },
) => {
  return (
    <>
      <div>
        <p>ID Pedido: {pedido.id_pedido}</p>
        <p>Estado: {pedido.estado}</p>
        <p>Tipo de envio: {pedido.envio}</p>
        <p>Pago Total: {pedido.pago_total}</p>
      </div>
    </>
  );
};
