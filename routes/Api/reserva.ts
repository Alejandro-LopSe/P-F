import { FreshContext, Handlers } from "$fresh/server.ts";
import { Login } from "../../components/Login.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { P } from "../../signals/Pedido.ts";
import { Reserva } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, _ctx: FreshContext) => {
    const url = new URL(_req.url);
    const id: number = parseInt(url.searchParams.get("id")!);

    const reserva_raw = await db!.query(`
        select id_reserva ,id_pedido, a.nombre,a.precio, r.cantidad from reserva r
        left join  articulos a on r.id_articulo = a.id_articulo  
        where r.id_pedido = ${id}`);
    //@ts-expect-errors
    const reserva: Reserva[] = reserva_raw[0];

    return new Response(JSON.stringify(reserva));
  },
  POST: async (req: Request, _ctx: FreshContext) => {
    const body: Reserva = await req.json();
    console.log(body);

    const _add = await db!.query(`
      insert into reserva (id_pedido, id_articulo, cantidad) 
      values (${body.id_pedido}, ${body.id_articulo}, ${body.cantidad})`);

    const reserva_raw = await db!.query( //@ts-expect-errors
      `update pedidos set pago_total = ${body.pago_total}  
      where id_pedido = ${P.value.id_pedido}`,
    );
    console.log(reserva_raw);

    return new Response();
  },
};
