import { FunctionalComponent } from "preact";
import { Articulo } from "../types.ts";
import { ArticulosLista } from "../islands/ArticulosLista.tsx";
import { AddArticulos } from "../islands/AddArticulos.tsx";
import { Signal } from "@preact/signals";
export const Articulos: FunctionalComponent<
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
          <ArticulosLista props={props} signal={signal}></ArticulosLista>
          <AddArticulos signal={signal}></AddArticulos>
        </div>
      </div>
    </>
  );
};
