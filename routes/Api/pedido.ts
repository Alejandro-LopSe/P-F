import { FreshContext, Handlers } from "$fresh/server.ts";

import { db } from "../../DB/SQLConnection.ts";
import { Pedido, state } from "../../types.ts";

export const handler: Handlers<unknown, state> = {
  POST: async (req: Request, ctx: FreshContext<state>) => {
    const body: Pedido = await req.json();

    const today = new Date();
    if (!body.id_cliente) {
      return new Response();
    }
    const new_articulo = await db!.query(`
        INSERT INTO fabrica.pedidos(
            id_cliente,        
            ano_fiscal,
            mes_fiscal,
            id_empleado,             
            estado,         
            envio,           
            pago_total, 
            notas
            )
            VALUES(
            ${body.id_cliente}, 
            '${today.getFullYear()}', 
            '${today.getMonth() + 1}',
            ${ctx.state.id_usuario}, 
            '${body.estado}', 
            '${body.envio}', 
            0,          
            '${body.notas}'
        ); 
    `);
    const ped = await db!.query(`
      SELECT max(id_pedido) 
      FROM pedidos c 
    `);
    //@ts-expect-errors
    const id: number = ped[0][0]["max(id_pedido)"];

    return new Response(`${id}`);
  },
  PUT: async (req: Request, ctx: FreshContext<state>) => {
    const body: Pedido = await req.json();

    const today = new Date();
    if (!body.id_cliente) {
      return new Response();
    }
    const updated = await db!.query(`
      update pedidos set 
      estado = '${body.estado}',         
      envio = '${body.envio}',
      pago_total= ${body.pago_total},
            notas = '${body.notas}'
    `);
    const ped = await db!.query(`
      SELECT max(id_pedido) 
      FROM pedidos c 
    `);
    //@ts-expect-errors
    const id: number = ped[0][0]["max(id_pedido)"];

    return new Response(JSON.stringify(body));
  },
};
