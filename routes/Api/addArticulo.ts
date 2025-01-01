import { FreshContext, Handlers } from "$fresh/server.ts";

import { db } from "../../DB/SQLConnection.ts";
import { Aceite, Articulo, Envase, Tamaños } from "../../types.ts";
import { RowDataPacket } from "npm:mysql2@^2.3.3";

export const handler: Handlers = {
  POST: async (req: Request, _ctx: FreshContext) => {
    const body: Articulo = await req.json();
    console.log("Body: ", body);

    const exist = await db!.query<RowDataPacket[][]>(
      `SELECT * FROM articulos WHERE nombre='${
        //@ts-expect-errors
        Envase[`${body.envase}`]}  de  ${
        //@ts-expect-errors
        Tamaños[`${body.tamano}`]}  del   ${Aceite[`${body.tipo_aceite}`]}';`,
    );
    console.log("Exists: ", exist[0]);

    if (exist[0].length === 0) {
      const new_articulo = await db!.query(
        `INSERT INTO fabrica.articulos
          ( nombre, tamano,cantidad, tipo_aceite, envase, precio)
          VALUES('${
          //@ts-expect-errors
          Envase[`${body.envase}`]}  de  ${
          //@ts-expect-errors
          Tamaños[`${body.tamano}`]}  del   ${
          //@ts-expect-errors
          Aceite[
            `${body.tipo_aceite}`
          ]}', '${body.tamano}',${body.cantidad},'${body.tipo_aceite}', '${body.envase}',  ${body.precio});`,
      );
      console.log("New articulo: ", new_articulo);
      return new Response();
    } else {
      return new Response("Error: El Articulo no existe.");
    }
  },
};
