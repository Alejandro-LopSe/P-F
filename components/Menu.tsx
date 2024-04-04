import { FunctionComponent } from "preact";

type MenuProps = {
  selected: "Inicio" | "Clientes" | "Pedidos";
};
const Menu: FunctionComponent<MenuProps> = ({ selected }) => {
  return (
    <div class="menu">
      {selected!=="Inicio" && <a href="/" >
         Inicio
      </a>}
      {selected!=="Clientes" && <a href="/Clientes" >
        Clientes
      </a>}
      {selected!=="Pedidos" && <a href="/Pedidos" >
        Pedidos
      </a>}
    </div>
  );
};

export default Menu;
