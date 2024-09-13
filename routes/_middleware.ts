import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { state } from "../types.ts";
export const handler = async (req: Request, ctx: FreshContext<state>) => {
    if (ctx.destination !== "route") {
        console.log("1");
        const res = await ctx.next();
        return res;
    }
    if (ctx.route === "/login") {
        console.log("2");
        const res = await ctx.next();
        return res;
    }
    const headers = req.headers;
    const cookie_raw = headers.get("cookie");
    if (!cookie_raw) {
        console.log("3");
        const headers = new Headers({ location: "/login" });
        return new Response("", {
            headers,
            status: 302,
        });
    }

    const cookie = cookie_raw.substring(5);
    const payload = jwt.verify(cookie, "secreto");
    if (!payload) {
        const headers = new Headers({ location: "/login" });
        return new Response("", {
            headers,
            status: 302,
        });
    }
    ctx.state = { id_usuario: payload.id_usuario, user: payload.Nombre };
    console.log("4");
    const res = await ctx.next();
    return res;
};
