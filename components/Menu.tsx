
import { jwtVerify } from "https://deno.land/x/jose@v5.2.3/index.ts";
import { FunctionComponent } from "preact";
import { key } from "../routes/index.tsx"
import * as JWT from "https://deno.land/x/jose@v5.2.3/index.ts";
type MenuProps = {
  selected: "Inicio" | "Clientes" | "Pedidos" | "Notlogged";
  token: string
};
const Menu: FunctionComponent<MenuProps> = ({ selected ,token}) => {




  if(!token || token===""){

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
    const data =  JWT.decodeJwt(token)
    return (

      <div class="menu">
        {token && <p>Logeado como {data.user}</p>}
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
