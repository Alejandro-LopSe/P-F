import { FreshContext } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import Menu from "../components/Menu.tsx";
import { Cookie, key} from "./index.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default async function  Layout (req: Request, ctx: FreshContext) {
  
  
  const Component = ctx.Component;


  
  
  const route = ctx.route 
  // last after /

  //tecnicas de imputacion avanzada
  
  const head =  req.headers.get("cookie")

  let token: string = head!==null ? head.substring(6) : ""

  console.log("toke: ",token);
  const page = route.split("/").pop();
  // if page is empty, it means we are at the root
  const selected = page === "" ? "Inicio": page === "Pedidos" ? "Pedidos": "Clientes" ;

  if(token===""){
    token=ctx.data.token
  }
  
  console.log("toke new: ",ctx.data.token);
  if( token!==""){

    return (
      <body>
        <Menu selected={selected} token={token} />
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


