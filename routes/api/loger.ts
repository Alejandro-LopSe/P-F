import { FreshContext, Handlers} from "$fresh/server.ts";
import {  db } from "../../DB/SQLConnection.ts";

import * as JWT from 'https://deno.land/x/jose@v5.2.3/index.ts'



export const handler: Handlers = {
    POST: async (_req: Request, _ctx: FreshContext) =>{
        console.log("logg");
        const {usuario,password} = await _req.json()
        
        
        const exist = await db!.query(`SELECT * FROM Usuarios WHERE Nombre='${usuario}' AND Password='${password}'`)

        if(exist){
           const token = JWT.base64url.encode(usuario)

            return new Response(``,{
                headers: {
                    "Set-Cookie": `token=${token}`,
                    "Location": "/Clientes"
                }
            })
        }
        
        return new Response("",{
            headers: {"logged": ""}
        })
      },
}