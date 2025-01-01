import { FunctionalComponent } from "preact";
import { Aceite, Articulo, Envase, Tamaños } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

import { Signal } from "@preact/signals";
export const ArticulosLista: FunctionalComponent<
  {
    props: { data: Articulo[] };
    signal: Signal;
  }
> = (
  { props, signal },
) => {
  const [data, setData] = useState<Articulo[]>(props.data);
  useEffect(() => {
    const fetchArticulos = async () => {
      const resp = await fetch("/Api/articulos");
      const data = await resp.json();
      setData(data);
    };
    fetchArticulos();
  }, [signal.value]); // Se ejecuta cada vez que signal.value cambie
  console.log(data);

  return (
    <>
      {data &&
        data.map((articulo: Articulo) => {
          return (
            <div class="nuevo_articulo" id={`${articulo.nombre}`}>
              <p class="nombre">{`${articulo.nombre}`}</p>

              <p class="pedido">
                {
                  //@ts-expect-errors
                  Tamaños[`${articulo.tamano}`]
                }
              </p>
              <p class="pedido">
                {articulo.cantidad > 1
                  ? `${articulo.cantidad} Unidades`
                  : `1 Unidad`}
              </p>
              <p class="pedido">
                {
                  //@ts-expect-errors
                  Aceite[`${articulo.tipo_aceite}`]
                }
              </p>
              <p class="pedido">
                {
                  //@ts-expect-errors
                  Envase[`${articulo.envase}`]
                }
              </p>
              <p class="modificaciones">{articulo.precio} €</p>
            </div>
          );
        })}
      <p>{signal.value}</p>
    </>
  );
};
