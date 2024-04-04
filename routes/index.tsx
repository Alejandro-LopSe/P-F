import { FreshContext, Handler, Handlers, PageProps } from "$fresh/server.ts";
import { context } from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import Registrar from "../components/Registrar.tsx";
import Login from "../islands/Login.tsx";
import { Cliente } from "../types.ts";
import { db } from "../DB/SQLConnection.ts";
import { logged } from "../types.ts";



export const handler: Handlers={
  
  GET:  async (_req: Request, ctx: FreshContext) =>{
    if(_req.headers.get("logged")){
      const r = await ctx.render()

      
      r.headers.set("logged", "true")
    }
    const r = await ctx.render()

    return r
  }
}
export default function Home(props: PageProps) {

  
  return (
    <>
    <Login loged={props.data}/>
    </>
  );
}
