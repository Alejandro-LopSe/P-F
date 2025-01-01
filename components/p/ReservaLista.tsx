import { FunctionalComponent } from "preact";
import { Articulo } from "../../types.ts";
export const ReservaLista: FunctionalComponent<{ data: Articulo[] }> = (
  { data },
) => {
  return (
    <>
      {data.map((reserva: Articulo) => {
        return (
          <div class="div">
            <p>
              {reserva.nombre}
            </p>
            <p>
              {reserva.cantidad}
            </p>
            <p>
              {reserva.precio}€
            </p>
          </div>
        );
      })}
    </>
  );
};
