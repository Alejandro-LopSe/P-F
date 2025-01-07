import { FunctionalComponent } from "preact";
import { SingleClient } from "../c/SingleClient.tsx";
import { C } from "../../signals/Cliente.ts";
import { Reservaspedido } from "../../types.ts";
import { ReservaLista } from "../../islands/p/ReservaLista.tsx";
export const ModifyPedido: FunctionalComponent<{ data: Reservaspedido }> = (
  { data },
) => {
  return (
    <>
      <div class={"Pedido"}>
        <div class={"InfoCliente"}>
          <p>Informacion Cliente</p>
          <SingleClient data={C} />
        </div>
        <div class={"InfoPedido"}>
          <p>Informacion Pedido</p>
          <ReservaLista data={data} />
        </div>
      </div>
    </>
  );
};
