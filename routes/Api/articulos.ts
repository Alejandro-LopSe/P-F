import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { Aceite, Articulo, Envase, Tamaños } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, _ctx: FreshContext) => {
    const articulos_raw = await db!.query("SELECT * FROM articulos;");
    //@ts-expect-errors
    const articulos: Articulos[] = articulos_raw[0];

    return new Response(JSON.stringify(articulos));
  },
  PUT: async (_req: Request, _ctx: FreshContext) => {
    const body: Articulo = await _req.json();
    console.log("PUT: ", body);
    const _add = await db!.query(`
      update articulos set 
      nombre = '${
      //@ts-expect-errors
      Envase[`${body.envase}`]}  de  ${Tamaños[`${body.tamano}`]}  del   ${
      //@ts-expect-errors
      Aceite[`${body.tipo_aceite}`]}',
      tamano = '${body.tamano}',
      cantidad = ${body.envase.includes("CAJA") ? body.cantidad : 1},
      envase = '${body.envase}',
      precio = ${body.precio}
      where id_articulo = ${body.id_articulo}
    `);
    const articulos_raw = await db!.query("SELECT * FROM articulos;");
    //@ts-expect-errors
    const articulos: Articulos[] = articulos_raw[0];

    return new Response(JSON.stringify(articulos));
  },
};
