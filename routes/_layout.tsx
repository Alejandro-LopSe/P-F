import { FreshContext } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import Menu from "../components/Menu.tsx";
import { Cookie } from "./index.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default async function  Layout (req: Request, ctx: FreshContext) {
  
  
  const Component = ctx.Component;


  
  
  const route = ctx.route 
  // last after /

  
  const head =  req.headers.get("cookie")

  const token = head!==null ? head.substring(6) : undefined
    
    


  const page = route.split("/").pop();
  // if page is empty, it means we are at the root
  const selected = page === "" ? "Inicio": page === "Pedidos" ? "Pedidos": "Clientes" ;
  if(ctx.data?.token){
    return (
      <body>
        <Menu selected={selected} token={ctx.data.token} />
        <Component />
      </body>
    );
  }else{
    return (
      <body>
        <Menu selected="Notlogged" token="" />
        <Component />
      </body>
      );
  }
};


