import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import { Signal } from "@preact/signals";

export const AddArticulos: FunctionalComponent<{ signal: Signal }> = (
  { signal },
) => {
  const [add, setAdd] = useState<boolean>(false);
  const [T, setT] = useState<string>("L5");
  const [TA, setTA] = useState<string>("MAD");
  const [E, setE] = useState<string>("PLASTICO");
  const [Error, setError] = useState<string>("");
  //@ts-expect-errors
  const [P, setP] = useState<int | undefined>();
  //@ts-expect-errors
  const [C, setC] = useState<int | undefined>(1);

  const adding = async () => {
    setAdd(!add);
    const bod = {
      tamano: T,
      tipo_aceite: TA,
      cantidad: C,
      envase: E,
      precio: P,
    };
    const nulls = Object.values(bod).some((x) => x === undefined);
    if (add && !nulls) {
      const resp: Response = await fetch("/Api/addArticulo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tamano: T,
          tipo_aceite: TA,
          cantidad: C,
          envase: E,
          precio: P,
        }),
      });
      const datares = await resp.text();
      console.log("Add: ", add);
      signal.value = signal.value + 1;
      setError(datares);
    } else if (!add) {
      console.log("Add: ", add);
    } else {
      setError("Error, faltan datos");
    }
  };
  return (
    <>
      {add &&
        (
          <div class="nuevo_articulo">
            <p class="nombre">
              -
            </p>
            <p class="pedido">
              <select
                name={"tamano"}
                onChange={(e) => setT(e.currentTarget.value)}
              >
                <option value="L5">5 Litros</option>
                <option value="L2">2 Litros</option>
                <option value="L0.5">0.5 Litros</option>
                <option value="L0.25">0.25 Litros</option>
              </select>
            </p>
            <p class="pedido">
              <input
                disabled={E.includes("CAJA") ? false : true}
                class="price"
                name={"cantidad"}
                type="number"
                onChange={(e) => setC(e.currentTarget.value)}
                value={E.includes("CAJA") ? C : 1}
              >
              </input>
            </p>
            <p class="pedido">
              <select
                name={"tipo_aceite"}
                onChange={(e) => setTA(e.currentTarget.value)}
              >
                <option value="MAD">Madroñal</option>
                <option value="DO">Molino</option>
              </select>
            </p>
            <p class="pedido">
              <select
                name={"envase"}
                onChange={(e) => setE(e.currentTarget.value)}
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
                onChange={(e) => setP(e.currentTarget.value)}
                value={P}
              >
              </input>
            </p>
          </div>
        )}

      <p>
        <button class="return " onClick={adding}>Agregar</button> {Error}
      </p>
    </>
  );
};
