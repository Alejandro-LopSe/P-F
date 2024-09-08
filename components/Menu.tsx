import { FunctionComponent } from "preact";
import { state } from "../types.ts";

export const Menu: FunctionComponent<{ state: state }> = (
  { state },
) => {
  return (
    <div class="menu">
      {state !== undefined && <p>Logeado como {state.user}</p>}

      <a href="/">
        Inicio
      </a>

      <a href="/Clientes">
        Clientes
      </a>

      <a href="/Pedidos">
        Pedidos
      </a>
    </div>
  );
};
