import { FreshContext, Handlers } from "$fresh/server.ts";
import { Tamaños } from "../types.ts";

export const handler: Handlers = {
  GET: (_req: Request, ctx: FreshContext) => {
    const headers = new Headers({ location: "/portal" });

    return new Response("", {
      headers,
      status: 302,
    });
  },
};
