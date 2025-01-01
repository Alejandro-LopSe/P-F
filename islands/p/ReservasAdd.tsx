import { FunctionalComponent } from "preact";
import { Envio, Estado, Pedido } from "../../types.ts";
import { useState } from "preact/hooks";
import { P } from "../../signals/Pedido.ts";
import { Cabecerareserva } from "../../components/p/CabeceraReserva.tsx";
export const ReservasAdd: FunctionalComponent = () => {
  const [ES, setES] = useState<string>("");
  const [EN, setEN] = useState<string>("");
  const [PP, setPP] = useState<number | undefined>(P.value.pago_total);
  return (
    <div class="megars">
      <Cabecerareserva />
      <div class="div">
        <p>
          Nombre:{" "}
          <select
            name="estado"
            id="estado"
            value={ES}
            onChange={(e) => {
              setES(e.currentTarget.value);
            }}
          >
            {Object.keys(Estado).map((key: string) => {
              return <option value={key}>{key}</option>;
            })}
          </select>
        </p>
        <p>
          Cantidad:{" "}
          <select
            name="envio"
            class="select"
            id="envio"
            value={EN}
            onChange={(e) => {
              setEN(e.currentTarget.value);
            }}
          >
            {Object.keys(Envio).map((key: string) => {
              return <option value={key}>{key}</option>;
            })}
          </select>
        </p>
        <p>
          Precio: {PP}€
        </p>
      </div>
    </div>
  );
};
