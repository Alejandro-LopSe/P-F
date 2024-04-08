import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { Clientes } from "../../islands/Clientes.tsx";
import { cluster_cliente } from "../../types.ts";
import { clmap } from "../../funciones.ts";
import { Cliente } from "../../types.ts";
import { DeactivateCliente } from "../../islands/DeactivateCliente.tsx";




export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext) => {
        const iscookied  = _req.headers.get("cookie")
        if(iscookied){
            const response = await db!.query(`SELECT * FROM Clientes;`)
            const [data]= response
            const cluster = clmap(data as Cliente[])
            return ctx.render(cluster);
        }
        return Response.redirect("http://localhost:8000/")
        
    }
}
export default function Page(props: PageProps<cluster_cliente[]>){

    
    return(
    <>
    <DeactivateCliente data={props.data}></DeactivateCliente>
    
    </>
    )
}