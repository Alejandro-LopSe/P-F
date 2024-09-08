import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import jwt from "jsonwebtoken";
import { Login } from "../islands/Login.tsx";

import { db } from "../DB/SQLConnection.ts";
import { state } from "../types.ts";

const key = Deno.env.get("key");

export const handler: Handlers<unknown, state> = {
  GET: (_req: Request, _ctx: FreshContext<state>) => {
    console.log("get index");

    return _ctx.render();
  },
  POST: async (_req: Request, _ctx: FreshContext<state>) => {
    const form = await _req.formData();
    const usuario = form.get("usuario")!.toString();
    const password = form.get("password")!.toString();

    const exist = await db!.query(
      `SELECT * FROM Usuarios WHERE Nombre='${usuario}' AND Password='${password}'`,
    );

    //@ts-expect-error-
    if (exist.at(0)!.length === 1) {
      const payload = {
        //@ts-expect-error1
        id_usuario: exist!.at(0)!.at(0)!.id_usuario,
        user: usuario,
        pass: password,
      };

      const signed = await jwt.sign(payload, key);

      _ctx.state = {
        //@ts-expect-error1
        id_usuario: exist!.at(0)!.at(0)!.id_usuario,
        user: usuario,
      };

      const headers = new Headers({
        location: "/Clientes",
        "Set-Cookie": `token=${signed}; Max-Age=3600`,
      });

      return new Response("", {
        headers,
        status: 302,
      });
    }

    return _ctx.render();
  },
};
export default function Home() {
  return <Login />;
}
