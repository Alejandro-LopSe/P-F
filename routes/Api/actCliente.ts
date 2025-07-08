import { FreshContext, Handlers } from "$fresh/server.ts";

import { db } from "../../DB/SQLConnection.ts";
import { Cliente } from "../../types.ts";
import { RowDataPacket } from "npm:mysql2@^2.3.3";

export const handler: Handlers = {
  PUT: async (req: Request, _ctx: FreshContext) => {
    const body = await req.json();

    const exist = await db!.query<RowDataPacket[][]>(
      `SELECT * FROM clientes WHERE Nombre='${body.Nombre}' AND Apellidos='${body.Apellidos}';`,
    );
    if (exist && exist[0].length > 0) {
      if (body.Activo === 1) {
        const _exists1 = await db!.query(
          `UPDATE clientes        
                 SET Activo = 0, Fecha_Baja = '${
            new Date().toString().substring(4, 24)
          }'
                 WHERE id_cliente='${body.id_cliente}' AND Activo='1';`,
        );
        const existfinal = await db!.query<RowDataPacket[][]>(
          `SELECT * FROM clientes ;`,
        );

        return new Response(JSON.stringify(existfinal));
      } else {
        //@ts-expect-errors
        const old: Cliente = exist[0];
        console.log(old);

        const _exists1 = await db!.query(
          `UPDATE clientes        
                SET Activo = 0, Fecha_Baja = '${
            new Date().toString().substring(4, 24)
          }'
                WHERE Nombre='${body.Nombre}' AND Apellidos='${body.Apellidos}' AND Activo='1';`,
        );
        const exists2 = await db!.query(
          `UPDATE clientes        
                            SET Activo = 1, Fecha_Baja = '${"-"}',Fecha_mod='${
            new Date().toString().substring(4, 24)
          }'
                    WHERE id_cliente='${body.id_cliente}' AND Fecha_Baja='${body.Fecha_Baja}';`,
        );

        const existfinal = await db!.query<RowDataPacket[][]>(
          `SELECT * FROM clientes ;`,
        );

        return new Response(JSON.stringify(existfinal));
      }
    } else {
      return new Response("Error: el Cliente no existe.");
    }
  },
};
