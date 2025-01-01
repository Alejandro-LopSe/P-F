import { FunctionalComponent } from "preact";
import { Articulo } from "../types.ts";
import { ArticulosLista } from "../islands/ArticulosLista.tsx";
import { AddArticulos } from "../islands/AddArticulos.tsx";
import { Signal } from "@preact/signals";
import { ArticulosListaMod } from "../islands/ArticulosListaMod.tsx";
export const ArticulosMod: FunctionalComponent<
  {
    props: { data: Articulo[] };
    signal: Signal;
  }
> = (
  { props, signal },
) => {
  return (
    <>
      <div class="clientes">
        <div class={"botones_superiores"}>
          <a class="return" href="/">Volver</a>
        </div>

        <div class="cabecera_articulos">
          <p class="nombre">{`Nombre`}</p>
          <p class="pedido">{"Tamano"}</p>
          <p class="pedido">{"Cantidad"}</p>
          <p class="pedido">{"Tipo Aceite"}</p>
          <p class="pedido">{"Envase"}</p>
          <p class="modificaciones">{"Precio"}</p>
        </div>
        <div>
          <ArticulosListaMod props={props} signal={signal}></ArticulosListaMod>
        </div>
      </div>
    </>
  );
};
