import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";



export const handler: Handlers = {
  POST: async (_req: Request, ctx: FreshContext) => {
    console.log("post");

    const form = _req.body;
    const { usuario, password } = await _req.json();
    a;

    const exist = await db.query(`SELECT * FROM Usuarios WHERE Nombre='${usuario}' AND Password='${password}'`);
    console.log(_req.headers);

    if (exist) {
      const r = await ctx.render();
      r.headers.set("logged", "true");
      return r;

    }
    const r = await ctx.render();
    r.headers.set("logged", "");
    return r;
  },
};
