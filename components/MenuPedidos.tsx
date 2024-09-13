import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";

export const MenuPedidos: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div class="menuportal">
            <h1>PEDIDOS</h1>
            <div class="menuclientes">
                <a href="/Pedidos">Ver</a>
                <a href="/Pedidos/Modificar">Modificar</a>
                <a href="/Pedidos/Añadir">Añadir</a>
            </div>
        </div>
    );
};
