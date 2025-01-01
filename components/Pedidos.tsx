import { FunctionalComponent } from "preact";
import { Pedido } from "../types.ts";
import { Pedidovista } from "../islands/PeidoVista.tsx";
export const Pedidos: FunctionalComponent<{ Props: Pedido[] }> = (
  { Props },
) => {
  return (
    <>
      {Props.map((pedido) => {
        return <Pedidovista pedido={pedido}></Pedidovista>;
      })}
    </>
  );
};
