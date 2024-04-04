import { FreshContext } from "$fresh/server.ts";
import Menu from "../components/Menu.tsx";
import { Cookie } from "./index.tsx";

export default async function  Layout (req: Request, ctx: FreshContext) {
  const Component = ctx.Component;
  const route = ctx.route 
  // last after /

  
  const head =  req.headers.get("cookie")
  console.log(head);
  const token = head!==null ? head.substring(6) : undefined
    
    

  const cookie: Cookie={
    token: token
  }

  const page = route.split("/").pop();
  // if page is empty, it means we are at the root
  const selected = page === "" ? "Inicio": page === "Pedidos" ? "Pedidos": "Clientes" ;
  return (
    <body>
      <Menu selected={selected} />
      <Component />
    </body>
  );
};


