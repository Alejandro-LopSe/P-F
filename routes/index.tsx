import { FreshContext, Handler, Handlers, PageProps } from "$fresh/server.ts";
import { context } from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import Registrar from "../components/Registrar.tsx";
import Login from "../islands/Login.tsx";
import { Cliente } from "../types.ts";
import { db } from "../DB/SQLConnection.ts";

import * as JWT from 'https://deno.land/x/jose@v5.2.3/index.ts'

export type Cookie={
  token?: string
}
export const handler: Handlers={
  
  GET:  async (_req: Request, ctx: FreshContext) =>{
    const head =  _req.headers.get("cookie")
    const token = head!==null ? head.substring(6) : undefined
      const cookie: Cookie={
        token: token
      }
    
    const r = await ctx.render(cookie)

    return r
  },
  POST: async (_req: Request, _ctx: FreshContext) =>{
    console.log("logg");
    const form =  await _req.formData()
    const usuario = form.get("usuario")!.toString()
    const password = form.get("password")!.toString()
    
    
    const exist = await db.query(`SELECT * FROM Usuarios WHERE Nombre='${usuario}' AND Password='${password}'`)

    if(exist){
       const token = JWT.base64url.encode(usuario)

        return _ctx.render({token: token},{
            headers: {
                "Set-Cookie": `token=${token}`,
            }
        })
    }

    
    return _ctx.render()
  },
}
export default function Home(props: PageProps) {

  
  return (
    <>
    <Login loged={props.data.token}/>
    </>
  );
}
