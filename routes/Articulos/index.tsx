import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { db } from "../../DB/SQLConnection.ts";
import { Articulo, state } from "../../types.ts";
import { Articulos } from "../../components/Articulos.tsx";
import { useEffect } from "preact/hooks";
import { newart } from "../../signals/Newart.ts";

export const handler: Handlers<Articulo[], state> = {
  GET: async (_req: Request, ctx: FreshContext<state, Articulo[]>) => {
    const articulos_raw = await db!.query("SELECT * FROM articulos;");
    //@ts-expect-errors
    const articulos: Articulos[] = articulos_raw[0];

    return ctx.render(articulos);
  },
};

export default function Home(props: PageProps<Articulo[], state>) {
  return (
    <>
      <CustomHeader state={props.state}></CustomHeader>
      <Articulos props={props} signal={newart}></Articulos>
    </>
  );
}
