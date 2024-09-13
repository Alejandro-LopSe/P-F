import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";

export const MenuClientes: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div class="menuportal">
            <h1>CLIENTES</h1>
            <div class="menuclientes">
                <a href="/Clientes">Ver</a>
                <a href="/Clientes/Modificar">Modificar</a>
                <a href="/Clientes/Activar">Activar/Desactivar</a>
                <a href="/Clientes/Añadir">Añadir</a>
            </div>
        </div>
    );
};
