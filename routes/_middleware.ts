import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { cookie_to_json } from "../funciones.ts";
import { Cookie, state, User } from "../types.ts";

export const handler = async (
    req: Request,
    ctx: FreshContext<state>,
) => {
    if (ctx.destination !== "route") {
        const res = await ctx.next();
        return res;
    }

    if (ctx.route === "/") {
        const res = await ctx.next();
        return res;
    }

    const raw_cookie = req.headers.get("cookie");
    if (!raw_cookie) {
        console.log("midleware 3: Cookie not found");
        const headers = new Headers({ location: "/" });
        return new Response("", { status: 302, headers });
    }
    const cookies = cookie_to_json(raw_cookie);
    const key = Deno.env.get("key");

    const exist = cookies.find((cookie: Cookie) => {
        return (cookie.key === "token" && cookie.value !== "");
    });

    if (!exist) {
        console.log("midleware 4: Token value not found");
        const headers = new Headers({ location: "/" });
        return new Response("", { status: 302, headers });
    }

    const verify: User = await jwt.verify(
        exist.value,
        key,
        function (error: unknown, decode: unknown) {
            if (error === null) {
                return decode;
            } else {
                console.log("error ", error);

                return error;
            }
        },
    );

    if (!verify) {
        console.log("midleware 4: Token invalid");
        const headers = new Headers({ location: "/", "Set-Cookie": "token=" });
        return new Response("", { status: 302, headers });
    }

    ctx.state = verify;
    const res = await ctx.next();
    return res;
};
/**/
