import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import jwt from "jsonwebtoken";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { state } from "../../types.ts";
import { MenuClientes } from "../../components/MenuClientes.tsx";
import { MenuPedidos } from "../../components/MenuPedidos.tsx";
import { MenuOtros } from "../../components/MenuOtros.tsx";
import { MenuArticulos } from "../../components/MenuArticulos.tsx";
import { MenuAceite } from "../../components/MenuAceite.tsx";

export default function Home(props: PageProps<unknown, state>) {
    return (
        <>
            <CustomHeader state={props.state}></CustomHeader>
            <div class="portal">
                <MenuClientes state={props.state}></MenuClientes>
                <MenuPedidos state={props.state}></MenuPedidos>
                <MenuArticulos state={props.state}></MenuArticulos>
                <MenuAceite state={props.state}></MenuAceite>
            </div>
        </>
    );
}
