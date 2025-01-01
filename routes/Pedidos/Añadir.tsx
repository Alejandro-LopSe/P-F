import { Handlers, PageProps } from "$fresh/server.ts";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { addpedido, Cliente, Pedido, state } from "../../types.ts";
import { AddPedido } from "../../islands/AddPedido.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { C } from "../../signals/Cliente.ts";

export const handler: Handlers<addpedido, state> = {
  GET: async (_req, _ctx) => {
    const pedidos_raw = await db!.query(`SELECT * FROM pedidos`);
    //@ts-expect-errors
    const pedidos: Pedido[] = pedidos_raw[0];
    const clientes_raw = await db!.query(
      `SELECT * FROM clientes where Activo = 1`,
    );
    //@ts-expect-errors
    const clientes: Cliente[] = clientes_raw[0];

    const pedidos_con_clientes: addpedido = {
      pedidos: pedidos,
      clientes: clientes,
    };
    return _ctx.render(pedidos_con_clientes);
  },
};

export default function Home(props: PageProps<addpedido, state>) {
  console.log(2);

  return (
    <>
      <CustomHeader state={props.state}></CustomHeader>
      <AddPedido data={props.data}></AddPedido>
    </>
  );
}
