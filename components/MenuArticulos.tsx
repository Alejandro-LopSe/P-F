import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";

export const MenuArticulos: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div class="menuportal">
            <h1>Articulos</h1>
            <div class="menuclientes">
                <a href="/Articulos">Ver</a>
                <a href="/Articulos/Modificar">Modificar</a>
                <a href="/Articulos/Añadir">Añadir</a>
            </div>
        </div>
    );
};
