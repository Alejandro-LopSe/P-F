import { FreshContext, Handlers } from "$fresh/server.ts";
import { useErrorBoundary } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { db } from "../../DB/SQLConnection.ts";

export const handler: Handlers = {
    PUT: async (req: Request, ctx: FreshContext) => {
        const body = await req.json();

        const exist = await db!.query(
            `SELECT 1 FROM clientes WHERE Nombre='${body.nombre}' AND Apellidos='${body.apellidos}';`,
        );
        console.log(
            "EXIST PUT: ",
            new Date().toString().substring(4, 24),
        );
        //@ts-expect-errors
        if (exist && exist[0].length > 0) {
            return new Response("Error: el Cliente ya existe.");
        } else {
            const exist = await db!.query(
                `INSERT INTO clientes (Nombre,Apellidos,DNI,Telefono,CP,Direccion,Correo,Empresa,Fecha_Alta,Fecha_Baja,Fecha_mod,Activo)
                 VALUES (
                 '${body.nombre}', 
                 '${body.apellidos}',
                 ${body.dni ? `'${body.dni}'` : "'-'"},  
                 ${body.tlf ? `'${body.tlf}'` : 0}, 
                 ${body.cp ? `'${body.cp}'` : 0}, 
                 ${body.dir ? `'${body.dir}'` : "'-'"}, 
                 ${body.correo ? `'${body.correo}'` : "'-'"},
                 '${body.empresa}',
                 '${new Date().toString().substring(4, 24)}',
                 '-',
                 '${new Date().toString().substring(4, 24)}',
                 '${1}');
                `,
            );
            console.log(exist);

            return new Response("Listo.");
        }
    },
};
