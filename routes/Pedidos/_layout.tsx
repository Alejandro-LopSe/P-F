import { FreshContext } from "$fresh/server.ts";
import Menu2 from "../../components/Menu2.tsx";

export default async function  Layout (req: Request, ctx: FreshContext) {
  const Component = ctx.Component;
  const route = ctx.route 
  // last after /
  const page = route.split("/").pop();
  // if page is empty, it means we are at the root
  const selected = page === "Clientes" ? "Clientes": page === "add" ? "Añadir": "Desactivar" ;
  return (
    <body>
      <Component />
    </body>
  );
};
