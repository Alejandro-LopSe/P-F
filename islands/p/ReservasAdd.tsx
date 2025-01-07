import { FunctionalComponent } from "preact";
import { Articulo, Envio, Estado, Reservaspedido } from "../../types.ts";
import { useState } from "preact/hooks";
import { P } from "../../signals/Pedido.ts";
import { CabeceraReserva } from "../../components/p/CabeceraReserva.tsx";
import { ReservaLista } from "../../islands/p/ReservaLista.tsx";
import { R } from "../../signals/Pedido.ts";
import { Reserva } from "../../types.ts";
export const ReservasAdd: FunctionalComponent<{ data: Reservaspedido }> = (
  { data },
) => {
  const [A, setA] = useState<Articulo>(data.articulos[0]);
  const [Cant, setCant] = useState<number>(1);

  const add = async () => {
    const sum = R.value.reduce((acc: number, elem) => {
      return acc + elem!.precio * elem!.cantidad;
    }, 0);
    P.value.pago_total = P.value.pago_total! + A.precio * Cant;
    const resp = await fetch("/Api/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pedido: P.value.id_pedido,
        id_articulo: A.id_articulo,
        cantidad: Cant,
        pago_total: P.value.pago_total,
      }),
    });
    const resps = await fetch(`/Api/reserva?id=${P.value.id_pedido}`);
    const newresp: Reserva = await resps.json();
    R.value = [...R.value, newresp];
  };

  return (
    <div class="megars">
      <CabeceraReserva />
      <ReservaLista data={data}></ReservaLista>
      <div class="div first">
        <p>
          <select
            name="nombre"
            id="nombre"
            value={A.id_articulo}
            onChange={(e) => {
              const id = parseInt(e.currentTarget.value);
              const artic = data.articulos.find((elem) => {
                return parseInt(elem.id_articulo) === id;
              });
              console.log(artic);

              setA(artic!);
            }}
          >
            {data && data.articulos.map((art: Articulo) => {
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
