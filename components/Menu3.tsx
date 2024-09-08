import { FunctionComponent } from "preact";

type MenuProps3 = {
    selected: "Pedidos" | "Añadir" | "Modificar";
};
const Menu3: FunctionComponent<MenuProps3> = ({ selected }) => {
    return (
        <div class="menu2">
            {selected !== "Pedidos" && (
                <a href="/Pedidos">
                    Pedidos
                </a>
            )}
            {selected !== "Añadir" && (
                <a href="/Pedidos/add">
                    Añadir
                </a>
            )}
            {selected !== "Modificar" && (
                <a href="/Pedidos/modify">
                    Modificar
                </a>
            )}
        </div>
    );
};

export default Menu3;
