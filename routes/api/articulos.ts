import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { clmap, getdate } from "../../funciones.ts";

import { Articulo, Cliente, state } from "../../types.ts";

export const handler: Handlers<unknown, state> = {
    async GET(_req: Request, _ctx: FreshContext<state>) {
        if (_ctx.state.user) {
            console.log("Getting tres\n");

            const response = await db!.query(
                `SELECT * FROM articulos;`,
            );
            //@ts-expect-errora
            const datas: Articulo[] = response[0];

            const srt = JSON.stringify(datas);

            return new Response(srt, {
                status: 200,
            });
        }

        return Response.redirect("http://localhost:8000/");
    },
};
