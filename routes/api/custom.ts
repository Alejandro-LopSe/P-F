import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";

import { state } from "../../types.ts";

export const handler: Handlers<unknown, state> = {
    async PUT(_req: Request, _ctx: FreshContext<state>) {
        if (_ctx.state.user) {
            console.log("Getting custom\n");
            const query = await _req.text();

            const response = await db!.query(
                `${query}`,
            );
            const [data] = response;

            const str = JSON.stringify(data);

            return new Response(str, {
                headers: {
                    "location": "/",
                },
                status: 200,
            });
        }

        return Response.redirect("http://localhost:8000/");
    },
};
