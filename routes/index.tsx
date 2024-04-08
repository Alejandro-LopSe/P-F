import { FreshContext, Handler, Handlers, PageProps } from "$fresh/server.ts";
import { context } from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import * as mod from "https://deno.land/std@0.221.0/dotenv/mod.ts";
import * as JWT from 'https://deno.land/x/jose@v5.2.3/index.ts'
import Login from "../islands/Login.tsx";
import { Cliente } from "../types.ts";
import { db } from "../DB/SQLConnection.ts";

export const key = await JWT.generateSecret("HS256")


import { useSignal } from "@preact/signals";



import { Expiredate } from "../funciones.ts";


export type Cookie={
  token?: string
}
export const handler: Handlers={
  
  GET:  async (_req: Request, ctx: FreshContext) =>{
    const head =  _req.headers.get("cookie")
    const token = head!==null ? head.substring(6) : ""
      const cookie: Cookie={
        token: token
      }

      
      if (!token){
        const r = await ctx.render("")

        return r
      }


    const r = await ctx.render(token)

    return r
  },
  POST: async (_req: Request, _ctx: FreshContext) =>{
    console.log("logg");
    const form =  await _req.formData()
    const usuario = form.get("usuario")!.toString()
    const password = form.get("password")!.toString()
    
    
    const exist= await db!.query(`SELECT * FROM Usuarios WHERE Nombre='${usuario}' AND Password='${password}'`)

      //@ts-expect-error-
    if(exist.at(0)!.length===1){
     

      const payload = {
        user: usuario,
        pass: password  
      }
      const tokenn = new JWT.SignJWT(payload).setProtectedHeader({alg: "HS256",typ:"JWT"})
      const signed = await tokenn.sign(key)
      
    
        
       
        return _ctx.render({token: signed},{
            headers: {
                "Set-Cookie": `token=${signed}`
            },
            
        })
    }
    

    
    return _ctx.render({token: ""})
  },
}
export default function Home(props: PageProps) {
   


  
  return (
    <>
    <Login loged={props.data}/>
    </>
  );
}
