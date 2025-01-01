import { FunctionalComponent } from "preact";
import { Reserva } from "../../types.ts";
import { useEffect, useState } from "preact/hooks";
import { P, R } from "../../signals/Pedido.ts";
export const ReservaLista: FunctionalComponent = () => {
  const [data, setData] = useState<Reserva[]>([]);
  console.log(data);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(`/Api/reserva?id=${P.value.id_pedido}`);
      const data = await response.json();
      setData(data);
    };
    getdata();
  }, [R.value]);
  return (
    <>
      {data.map((reserva: Reserva) => {
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
    </>
  );
};
