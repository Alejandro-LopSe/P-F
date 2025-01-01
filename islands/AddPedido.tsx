import { FunctionalComponent } from "preact";
import { addpedido } from "../types.ts";
import { InputSelect } from "./c/InputSelect.tsx";
import { SingleClient } from "../components/c/SingleClient.tsx";
import { C } from "../signals/Cliente.ts";
import { InfoPedidoAdd } from "../islands/p/InfoPedidoAdd.tsx";
import { ReservasAdd } from "./p/Reservasadd.tsx";
export const AddPedido: FunctionalComponent<{ data: addpedido }> = (
  { data },
) => {
  return (
    <div class="Pedido">
      <div class="cliente">
        <p class="title">Cliente</p>
        <InputSelect data={data} />
        <SingleClient data={C} />
      </div>
      <div class="ReservaBloque">
        <p class="title">Pedido</p>
        <InfoPedidoAdd />
        <ReservasAdd></ReservasAdd>
      </div>
    </div>
  );
};
