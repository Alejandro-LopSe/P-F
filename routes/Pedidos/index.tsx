import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Clientes } from "../../islands/Clientes.tsx";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { Cliente, Pedido, Pedido_ts, state } from "../../types.ts";

export const handler: Handlers<Pedido_ts[], state> = {
    GET: async (_req: Request, ctx: FreshContext<state, Pedido_ts[]>) => {
        const Pedidos_raw = await db!.query(`select 
            p.id_pedido,
            p.id_cliente,
            year (p.fecha_fiscal) as ano_fiscal,
            month (p.fecha_fiscal) as mes,
            p.estado,
            p.envio,
            p.pago_total,
            p.notas
            from  pedidos p`
        );
        //@ts-expect-errors
        const pedidos: Pedido[] = Pedidos_raw[0];
        //@ts-expect-errors
        const pedidos_mapped: Pedido_ts[] = Pedidos.map(async (pedido) => {
            const reservas = await db!.query(`select 
                p.id_pedido,
                p.id_cliente,
                year (p.fecha_fiscal) as ano_fiscal,
                month (p.fecha_fiscal) as mes,
                p.estado,
                p.envio,
                p.pago_total,
                p.notas
                from  pedidos p`
            );
        })
        
        

        return ctx.render(pedidos_mapped);
    },
};
export default function Home(props: PageProps<Cliente[], state>) {
    return (
        <>
            <CustomHeader state={props.state}></CustomHeader>
            <Clientes props={props}></Clientes>
        </>
    );
}
