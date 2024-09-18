import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Clientes } from "../../islands/Clientes.tsx";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { Cliente, state } from "../../types.ts";
import { AddCliente } from "../../islands/AddCliente.tsx";

export const handler: Handlers<Cliente[], state> = {};
export default function Home(props: PageProps<Cliente[], state>) {
    return (
        <>
            <CustomHeader state={props.state}></CustomHeader>

            <AddCliente></AddCliente>
        </>
    );
}
