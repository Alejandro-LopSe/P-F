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
            //@ts-expect-errors
            const old: Cliente = exist[0][exist[0].length - 1];
            console.log("OLD: ", old);

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
                 WHERE Nombre='${body.Nombre}' AND Apellidos='${body.Apellidos}' AND DNI='${body.dni}' AND Telefono='${body.tlf}' AND CP='${body.cp}' AND Direccion='${body.dir}' AND Correo='${body.correo}' AND Empresa='${body.empresa}';`,
            );

            console.log(exists2);

            return new Response("Listo.");
        } else {
            return new Response("Error: el Cliente no existe.");
        }
    },
};
