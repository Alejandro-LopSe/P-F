import { FreshContext, Handlers} from "$fresh/server.ts";
import {  db } from "../../DB/SQLConnection.ts";
import { clmap, getdate,cookie } from "../../funciones.ts";



export const handler: Handlers = {
    POST: async (_req: Request, _ctx: FreshContext) =>{
        console.log("logg");
        const {usuario,password} = await _req.json()
        
        
        const exist =await db.query(`SELECT * FROM Usuarios WHERE Nombre='${usuario}' AND Password='${password}'`)

        if(exist){
            const cookies = cookie(password)
            console.log(cookies);
            const res = new Response("",{
                headers: {"logged": `${cookies}`, "location": "/c"},
                
            },)
            let c =  
            
            console.log(1,res.url);
            return Response.redirect("/")
        }

        return new Response("",{
            headers: {"logged": ""}
        })
      },
}