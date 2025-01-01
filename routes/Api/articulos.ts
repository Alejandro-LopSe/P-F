import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext) => {
    const articulos_raw = await db!.query("SELECT * FROM articulos;");
    //@ts-expect-errors
    const articulos: Articulos[] = articulos_raw[0];

    return new Response(JSON.stringify(articulos));
  },
};
