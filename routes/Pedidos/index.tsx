import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { Pedido, state } from "../../types.ts";
import { Pedidos } from "../../components/Pedidos.tsx";
import { newart } from "../../signals/Newart.ts";

export const handler: Handlers<Pedido[], state> = {
  GET: async (_req: Request, ctx: FreshContext<state, Pedido[]>) => {
    const articulos_raw = await db!.query("SELECT * FROM pedidos;");
    //@ts-expect-errors
    const articulos: Pedido[] = articulos_raw[0];

    return ctx.render(articulos);
  },
};

export default function Home(props: PageProps<Pedido[], state>) {
  return (
    <>
      <CustomHeader state={props.state}></CustomHeader>
      <Pedidos Props={props.data}></Pedidos>
    </>
  );
}
