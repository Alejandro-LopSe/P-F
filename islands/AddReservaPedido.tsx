import { FunctionalComponent } from "preact";
import { Cliente, Reservaspedido } from "../types.ts";
import { InputSelect } from "./c/InputSelect.tsx";
import { SingleClient } from "../components/c/SingleClient.tsx";
import { C } from "../signals/Cliente.ts";
import { InfoPedido } from "./p/InfoPedido.tsx";
import { ReservasAdd } from "./p/Reservasadd.tsx";
import { P } from "../signals/Pedido.ts";
export const AddReservaPedido: FunctionalComponent<{ data: Reservaspedido }> = (
  { data },
) => {
  P.value = data.pedidos;
  C.value = data.clientes;
  return (
    <>
      <a class="return" href="/">Volver</a>
      <div class="Pedido">
        <div class="cliente">
          <p class="title">Cliente</p>
          <SingleClient data={C} />
        </div>
        <div class="ReservaBloque">
          <p class="title">Pedido</p>
          <InfoPedido data={data} />
          <ReservasAdd data={data}></ReservasAdd>
        </div>
      </div>
    </>
  );
};
