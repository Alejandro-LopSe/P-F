import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";
import { MenuArticulos } from "./MenuArticulos.tsx";
import { MenuAceite } from "./MenuAceite.tsx";

export const MenuOtros: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div class="menuportal">
            <h1>Otros</h1>
            <div class="menuclientes">
                <MenuArticulos state={state}></MenuArticulos>
                <MenuAceite state={state}></MenuAceite>
            </div>
        </div>
    );
};
