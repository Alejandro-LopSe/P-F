import { FunctionComponent } from "preact";

type MenuProps2 = {
  selected: "Clientes" | "Añadir" | "Desactivar";
};
const Menu2: FunctionComponent<MenuProps2> = ({ selected }) => {

  
  return (
    <div class="menu2">
      {selected!=="Clientes" && <a href="/Clientes" >
      Clientes
      </a>}
      {selected!=="Añadir" && <a href="/Clientes/add" >
      Añadir
      </a>}
      {selected!=="Desactivar" && <a href="/Clientes/deactivate" >
      Desactivar
      </a>}
    </div>
  );
};

export default Menu2;
