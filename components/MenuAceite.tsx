import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";

export const MenuAceite: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div class="menuportal">
            <h1>Aceite</h1>
            <div class="menuclientes">
                <a href="/Aceite">Ver</a>
            </div>
        </div>
    );
};
