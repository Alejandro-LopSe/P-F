import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";

export const handler: Handlers = {
  GET: async (_req: Request, _ctx: FreshContext) => {
    const url = new URL(_req.url);
    const id: number = parseInt(url.searchParams.get("id")!);
    console.log(id);

    const clientes_raw = await db!.query(
      `SELECT * FROM clientes where id_cliente = ${id} and Activo = 1`,
    );
    //@ts-expect-errors
    const clientes: Cliente[] = clientes_raw[0];

    return new Response(JSON.stringify(clientes));
  },
};
