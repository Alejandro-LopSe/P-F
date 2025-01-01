import { FunctionalComponent } from "preact";
import { Articulo, Envio, Estado } from "../../types.ts";
import { useState } from "preact/hooks";
import { P } from "../../signals/Pedido.ts";
import { CabeceraReserva } from "../../components/p/CabeceraReserva.tsx";
import { ReservaLista } from "../../components/p/ReservaLista.tsx";
import { R } from "../../signals/Pedido.ts";
import { Reserva } from "../../types.ts";
export const ReservasAdd: FunctionalComponent<{ data: Articulo[] }> = (
  { data },
) => {
  const [A, setA] = useState<Articulo>(data[0]);
  const [Cant, setCant] = useState<number>(1);

  const add = async () => {
    const resp = await fetch("/Api/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pedido: P.value.id_pedido,
        id_articulo: A.id_articulo,
        cantidad: Cant,
      }),
    });
    const resps = await fetch(`/Api/reserva?id=${P.value.id_pedido}`);
    const newresp: Reserva = await resps.json();
    R.value = [...R.value, newresp];
  };
  return (
    <div class="megars">
      <CabeceraReserva />
      <ReservaLista></ReservaLista>
      <div class="div">
        <p>
          <select
            name="nombre"
            id="nombre"
            value={A.id_articulo}
            onChange={(e) => {
              const id = parseInt(e.currentTarget.value);
              const artic = data.find((elem) => {
                return parseInt(elem.id_articulo) === id;
              });
              console.log(artic);

              setA(artic!);
            }}
          >
            {data && data.map((art: Articulo) => {
              return <option value={art.id_articulo}>{art.nombre}</option>;
            })}
          </select>
        </p>
        <p>
          Cantidad:{" "}
          <input
            name="cantidad"
            class="select"
            id="cantidad"
            value={Cant}
            onChange={(e) => {
              setCant(parseInt(e.currentTarget.value));
            }}
          >
          </input>
        </p>
        <p>
          Precio: {A.precio * Cant}€
        </p>
      </div>
      <button
        type={"button"}
        onClick={(e) => {
          add();
        }}
      >
        Añadir
      </button>
    </div>
  );
};
