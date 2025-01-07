import { FunctionalComponent } from "preact";
import { Reserva, Reservaspedido } from "../../types.ts";
import { useEffect, useState } from "preact/hooks";
import { P, R } from "../../signals/Pedido.ts";
import { C } from "../../signals/Cliente.ts";
import { A } from "../../signals/Articulos.ts";
export const ReservaLista: FunctionalComponent<{ data: Reservaspedido }> = (
  { data },
) => {
  const [datan, setData] = useState<Reserva[]>([]);
  const [suma, setSuma] = useState<number>(0);
  C.value = data.clientes;
  P.value = data.pedidos;
  A.value = data.articulos;
  R.value = datan;
  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(`/Api/reserva?id=${P.value.id_pedido}`);
      const data = await response.json();
      setData(data);
    };
    getdata();
  }, [R.value, P.value, C.value, A.value]);

  return (
    <div class="lista">
      {datan.map((reserva: Reserva) => {
        return (
          <div class="div">
            <p class="nombre">
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
