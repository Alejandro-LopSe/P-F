import { FunctionalComponent } from "preact";
import { Aceite, Articulo, Envase, Tamaños } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

import { Signal } from "@preact/signals";
export const ArticulosListaMod: FunctionalComponent<
  {
    props: { data: Articulo[] };
    signal: Signal;
  }
> = (
  { props, signal },
) => {
  const [data, setData] = useState<Articulo[]>(props.data);
  const [focused, setfocused] = useState<number | undefined>();
  const [A, setA] = useState<Articulo>();

  useEffect(() => {
    const fetchArticulos = async () => {
      const resp = await fetch("/Api/articulos");
      const data = await resp.json();
      setData(data);
    };
    fetchArticulos();
  }, [signal.value]); // Se ejecuta cada vez que signal.value cambie

  const updateArticulo = async () => {
    const articulo = A;
    console.log(articulo);

    const resp = await fetch(`/Api/articulos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articulo),
    });
    const data = await resp.json();
    setData(data);

    setfocused(undefined);
  };

  return (
    <>
      {data &&
        data.map((articulo: Articulo) => {
          //@ts-expect-errors
          if (focused === articulo.id_articulo) {
            return (
              <div
                class="nuevo_articulo"
                id={`${articulo.id_articulo}`}
              >
                <p
                  class="nombre return"
                  onClick={() => {
                    console.log(2);
                    updateArticulo();
                  }}
                >
                  Modificar
                </p>
                <p class="pedido">
                  <select
                    name={"tamano"}
                    onChange={(e) =>
                      //@ts-expect-errors
                      setA({ ...A, tamano: e.currentTarget.value })}
                    value={articulo.tamano}
                  >
                    <option value="L5">5 Litros</option>
                    <option value="L2">2 Litros</option>
                    <option value="L0.5">0.5 Litros</option>
                    <option value="L0.25">0.25 Litros</option>
                  </select>
                </p>
                <p class="pedido">
                  <input
                    disabled={A?.envase.includes("CAJA") ? false : true}
                    class="price"
                    name={"cantidad"}
                    type="number"
                    onChange={(e) =>
                      //@ts-expect-errors
                      setA({ ...A, cantidad: parseInt(e.currentTarget.value) })}
                    //@ts-expect-errors
                    value={A?.cantidad | articulo.cantidad}
                  >
                  </input>
                </p>
                <p class="pedido">
                  <select
                    name={"tipo_aceite"}
                    onChange={(e) =>
                      //@ts-expect-errors
                      setA({ ...A, tipo_aceite: e.currentTarget.value })}
                    value={articulo.tipo_aceite}
                  >
                    <option value="MAD">Madroñal</option>
                    <option value="DO">Molino</option>
                  </select>
                </p>
                <p class="pedido">
                  <select
                    name={"envase"}
                    onChange={(e) =>
                      //@ts-expect-errors
                      setA({ ...A, envase: e.currentTarget.value })}
                    value={articulo.envase}
                  >
                    <option value="PLASTICO">Plastico</option>
                    <option value="LATA">Lata</option>
                    <option value="CRISTAL">Cristal</option>
                    <option value="CAJA_PLASTICO">Caja de Botellas</option>
                    <option value="CAJA_LATA">Caja de Latas</option>
                    <option value="CAJA_CRISTAL">Caja de Cristal</option>
                  </select>
                </p>
                <p class="modificaciones">
                  <input
                    class="price"
                    name={"precio"}
                    type="number"
                    onChange={(e) =>
                      //@ts-expect-errors
                      setA({ ...A, precio: parseInt(e.currentTarget.value) })}
                    value={articulo.precio}
                  >
                  </input>
                </p>
              </div>
            );
          } else {
            return (
              <div
                class="nuevo_articulo"
                id={`${articulo.id_articulo}`}
                onClick={() => {
                  setA(articulo);
                  //@ts-expect-errors
                  setfocused(articulo.id_articulo);
                }}
              >
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
          }
        })}
    </>
  );
};
