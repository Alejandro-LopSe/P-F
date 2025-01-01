import { FunctionalComponent } from "preact";
import { Pedido } from "../types.ts";
import { Pedidovista } from "../islands/PeidoVista.tsx";
export const Pedidos: FunctionalComponent<{ Props: Pedido[] }> = (
  { Props },
) => {
  return (
    <>
      <a class="return" href="/">Volver</a>
      <div class={"clientes"}>
        <div class={"div"}>
          <p class={"nombre"}>ID Pedido</p>
          <p class={"nombre"}>Estado</p>
          <p class={"nombre"}>Tipo de envio</p>
          <p class={"nombre"}>Pago Total</p>
        </div>
        {Props.map((pedido) => {
          return <Pedidovista pedido={pedido}></Pedidovista>;
        })}
      </div>
    </>
  );
};
