import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { Articulo, Pedido, state } from "../../types.ts";

export const handler: Handlers<Pedido[], state> = {
  GET: async (_req: Request, ctx: FreshContext<state, Pedido[]>) => {
    if (ctx.state.user) {
      const response = await db!.query(`SELECT * FROM Pedidos;`);
      const [data] = response;
      console.log(data);

      return ctx.render(data as Pedido[]);
    }
    return Response.redirect("http://localhost:8000/");
  },
};
export default function Page(props: PageProps<Pedido[], state>) {
  console.log(props.data);

  return <>{props.data.map}</>;
}
