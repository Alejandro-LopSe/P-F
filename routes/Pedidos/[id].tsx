import { Handlers, PageProps } from "$fresh/server.ts";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import {
  Articulo,
  Cliente,
  Pedido,
  Reserva,
  Reservaspedido,
  state,
} from "../../types.ts";
import { AddReservaPedido } from "../../islands/AddReservaPedido.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { R } from "../../signals/Pedido.ts";

export const handler: Handlers<Reservaspedido, state> = {
  GET: async (_req, ctx) => {
    const pedidos_raw = await db!.query(
      `SELECT * FROM pedidos where id_pedido = ${ctx.params.id}`,
    );
    //@ts-expect-errors
    const pedidos: Pedido[] = pedidos_raw[0];
    if (pedidos.length == 0) {
      const headers = new Headers({ location: "/portal" });

      return new Response("", {
        headers,
        status: 302,
      });
    }
    const clientes_raw = await db!.query(
      `SELECT * FROM clientes where Activo = 1 and id_cliente = ${
        pedidos[0].id_cliente
      }`,
    );
    //@ts-expect-errors
    const clientes: Cliente[] = clientes_raw[0];

    const articulos_raw = await db!.query(
      `SELECT * FROM articulos`,
    );
    //@ts-expect-errors
    const articulos: Articulo[] = articulos_raw[0];
    const reservas_raw = await db!.query(`
        select id_reserva ,id_pedido, a.nombre,a.precio, r.cantidad from reserva r
        left join  articulos a on r.id_articulo = a.id_articulo  
        where r.id_pedido = ${ctx.params.id}`);
    //@ts-expect-errors
    const reservas: Reserva[] = reservas_raw[0];

    const pedidos_con_clientes: Reservaspedido = {
      pedidos: pedidos[0],
      clientes: clientes[0],
      articulos: articulos,
    };

    return ctx.render(pedidos_con_clientes);
  },
};

export default function Home(props: PageProps<Reservaspedido, state>) {
  return (
    <>
      <CustomHeader state={props.state}></CustomHeader>
      <AddReservaPedido data={props.data}></AddReservaPedido>
    </>
  );
}
