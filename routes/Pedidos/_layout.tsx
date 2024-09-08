import { FreshContext } from "$fresh/server.ts";
import Menu3 from "../../components/Menu3.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {
  const Component = ctx.Component;
  const route = ctx.route;
  // last after /
  const page = route.split("/").pop();
  // if page is empty, it means we are at the root
  const selected = page === "Pedidos"
    ? "Pedidos"
    : page === "add"
    ? "Añadir"
    : "Modificar";
  return (
    <body>
      <Menu3 selected={selected} />
      <Component />
    </body>
  );
}
