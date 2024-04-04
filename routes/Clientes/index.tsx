import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { Clientes } from "../../islands/Clientes.tsx";
import { cluster_cliente } from "../../types.ts";
import { clmap } from "../../funciones.ts";
import { Cliente } from "../../types.ts";




export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext) => {

        const response = await db.query(`SELECT * FROM Clientes;`)
        const [data]= response
        const cluster = clmap(data as Cliente[])
        return ctx.render(cluster);
    }
}
export default function Page(props: PageProps<cluster_cliente[]>){

    
    return(
    <>
    <Clientes data={props.data}></Clientes>
    
    </>
    )
}