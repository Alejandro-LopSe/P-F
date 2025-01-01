import { Handlers, PageProps } from "$fresh/server.ts";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { Pedido_ts, state } from "../../types.ts";
import { AddCliente } from "../../islands/AddCliente.tsx";

export const handler: Handlers<Pedido_ts[], state> = {};
export default function Home(props: PageProps<Pedido_ts[], state>) {
    return (
        <>
            <CustomHeader state={props.state}></CustomHeader>

            <AddCliente></AddCliente>
        </>
    );
}
