
import { FunctionComponent } from "preact";
type MenuProps = {
  selected: "Inicio" | "Clientes" | "Pedidos" | "Notlogged";
  token: string
};
const Menu: FunctionComponent<MenuProps> = ({ selected ,token}) => {


  if(selected==="Notlogged" || !token){

    return (<div class="menu">
        { <a href="/" >
           Inicio
        </a>}
        { <a href="/" >
          Clientes
        </a>}
        { <a href="/" >
          Pedidos
        </a>}
    </div>)
  }else{
    return (

      <div class="menu">
        {token && <p>Logeado</p>}
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
  }
  
};

export default Menu;
