import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { clmap, getdate } from "../../funciones.ts";

import { Cliente, state } from "../../types.ts";

export const handler: Handlers<unknown, state> = {
    async GET(_req: Request, _ctx: FreshContext<state>) {
        if (_ctx.state.user) {
            console.log("Getting\n");
            const url = new URL(_req.url);
            const filtro_N = url.searchParams.get("Nombre") || "";
            const filtro_A = url.searchParams.get("Apellidos") || "";

            const response = await db!.query(
                `SELECT * FROM Clientes WHERE  Nombre='${filtro_N}' AND  Apellidos='${filtro_A}' AND Activo=1;`,
            );
            const [data] = response;
            const cluster = clmap(data as Cliente[]);

            return new Response(JSON.stringify(cluster), {
                headers: { "location": "/" },
                status: 200,
            });
        }

        return Response.redirect("http://localhost:8000/");
    },

    async DELETE(req: Request, _ctx: FreshContext) {
        const iscookied = req.headers.get("cookie");
        if (iscookied) {
            console.log("Deactivating\n");
            if (!req.body) {
                return new Response("No se ha proporcionado un Cliente.", {
                    headers: { "location": "/" },
                    status: 404,
                });
            }

            const cl: Cliente = await req.json();
            const date = getdate(new Date());

            if (cl.Activo === 1) {
                const [_update] = await db!.query(`
                UPDATE Clientes SET
                    Fecha_Baja='0',
                    Activo='1'
                WHERE  Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';
            `);
            } else if (cl.Activo === 0) {
                const [_update] = await db!.query(`
                UPDATE Clientes SET
                    Fecha_Baja='${date}',
                    Activo='0'
                WHERE  Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';
            `);
            }

            return new Response("", {
                headers: { "location": "/" },
                status: 200,
            });
        }

        return Response.redirect("http://localhost:8000/");
    },

    async PUT(req: Request, ctx: FreshContext<state>) {
        try {
            if (ctx.state) {
                console.log("Updating\n");
                if (!req.body) {
                    return new Response("", {
                        headers: { Location: "/Clientes" },
                        status: 404,
                    });
                }

                const cl: Cliente = await req.json();
                const date = getdate(new Date());
                console.log("modificacion : ", cl);

                const cliente = {
                    id_cliente: cl.id_cliente,
                    Nombre: cl.Nombre,
                    Apellidos: cl.Apellidos,
                    DNI: cl.DNI || " ",
                    Telefono: cl.Telefono || 1,
                    CP: cl.CP || 1,
                    Direccion: cl.Direccion || " ",
                    Correo: cl.Correo || " ",
                    Empresa: cl.Empresa,
                    Fecha_Baja: cl.Fecha_Baja || 1,
                    Fecha_mod: `${date}`,
                    Activo: 1,
                };

                const [results] = await db!.query(
                    `SELECT * FROM Clientes WHERE  Nombre='${cliente.Nombre}' AND  Apellidos='${cliente.Apellidos}' AND Activo=1;`,
                );

                //@ts-expect-error>
                const clienteold = results.at(0);

                const [_update] = await db!.query(`
                UPDATE Clientes SET
                    Fecha_Baja='${date}',
                    Activo=0
                WHERE  id_cliente='${cl.id_cliente}' AND Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';
            `);

                const response = await db!.query(`
                INSERT INTO Clientes (id_cliente, Nombre, Apellidos, DNI, Telefono, CP, Direccion, Correo, Empresa, Fecha_Alta, Fecha_Baja, Fecha_mod, Activo ) 
                VALUES (
                    '${cl.id_cliente}',
                    '${cl.Nombre}',
                    '${cl.Apellidos}',
                    '${cliente.DNI}',
                    '${cliente.Telefono}', 
                    '${cliente.CP}',
                    '${cliente.Direccion}', 
                    '${cliente.Correo}', 
                    '${cliente.Empresa}', 
                    '${clienteold.Fecha_Alta}', 
                    '0', 
                    '${date}', 
                    '${cliente.Activo}'
                    )
            `);

                const [results1] = await db!.query(
                    `SELECT * FROM Clientes WHERE  Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';`,
                );
                console.log("respuesta");
                return new Response(JSON.stringify(results1), {
                    headers: { Location: `/` },
                    status: 200,
                });
            }
            console.log("fallo");

            return new Response("", {
                headers: { Location: `/` },
                status: 400,
            });
        } catch (error) {
            console.log(error);

            return new Response("", {
                headers: { Location: `/` },
                status: 200,
            });
        }
    },
};
