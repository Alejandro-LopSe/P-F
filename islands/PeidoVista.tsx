import { FunctionalComponent } from "preact";
import { Pedido } from "../types.ts";
import { P } from "../signals/Pedido.ts";
import { C } from "../signals/Cliente.ts";
export const Pedidovista: FunctionalComponent<{ pedido: Pedido }> = (
  { pedido },
) => {
  const redirect = () => {
    globalThis.location.href = `/Pedidos/${pedido.id_pedido}`;
  };
  return (
    <>
      <div class={"div"} onClick={redirect}>
        <p class={"nombre"}>{pedido.id_pedido}</p>
        <p class={"nombre"}>{pedido.estado}</p>
        <p class={"nombre"}>{pedido.envio}</p>
        <p class={"nombre"}>{pedido.pago_total}</p>
      </div>
    </>
  );
};
