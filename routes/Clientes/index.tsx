import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Clientes } from "../../islands/Clientes.tsx";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { Cliente, state } from "../../types.ts";

export const handler: Handlers<Cliente[], state> = {
    GET: async (_req: Request, ctx: FreshContext<state, Cliente[]>) => {
        const clientes_raw = await db!.query("SELECT * FROM clientes;");
        //@ts-expect-errors
        const clientes: Cliente[] = clientes_raw[0];

        return ctx.render(clientes);
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
