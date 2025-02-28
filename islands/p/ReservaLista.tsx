import { FunctionalComponent } from "preact";
import { Pedido, Reserva, Reservaspedido } from "../../types.ts";
import { useEffect, useState } from "preact/hooks";
import { P, R } from "../../signals/Pedido.ts";
import { C } from "../../signals/Cliente.ts";
import { A } from "../../signals/Articulos.ts";
export const ReservaLista: FunctionalComponent<{ data: Reservaspedido }> = (
  { data },
) => {
  const [datan, setData] = useState<Reserva[]>([]);
  const [suma, setSuma] = useState<number>(0);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(`/Api/reserva?id=${P.value.id_pedido}`);
      const data = await response.json();
      setData(data);
    };
    getdata();
  }, [R.value, P.value, C.value, A.value]);

  const eliminar = async (id: Reserva) => {
    const resp = await fetch(
      `/Api/articulos?id=${id.id_reserva}&id_p=${id.id_pedido}&price=${
        id.precio * id.cantidad
      }`,
      {
        method: "DELETE",
      },
    );
    const resp_data: { p: Pedido; r: Reserva[] } = await resp.json();
    R.value = resp_data.r;
    P.value = resp_data.p;
  };

  return (
    <div class="lista">
      {datan.map((reserva: Reserva) => {
        return (
          <div class="div">
            <p class="nombre">
              <button
                class="eliminar"
                onClick={(e) => {
                  eliminar(reserva);
                }}
              >
                -
              </button>
              {reserva.nombre}
            </p>
            <p class="cantidad">
              {reserva.cantidad}
            </p>
            <p class="precio">
              {reserva.precio}€
            </p>
          </div>
        );
      })}
    </div>
  );
};
