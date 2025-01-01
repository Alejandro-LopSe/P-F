import { FunctionalComponent } from "preact";
import { Envio, Estado } from "../../types.ts";
import { useState } from "preact/hooks";
import { P } from "../../signals/Pedido.ts";
export const InfoPedidoAdd: FunctionalComponent = () => {
  const [ES, setES] = useState<string>("");
  const [EN, setEN] = useState<string>("");
  const [PP, _setPP] = useState<number | undefined>(P.value.pago_total);
  return (
    <div class="info">
      <p>
        Estado:{" "}
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
        Tipo de envio:{" "}
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
        Pago Total: {PP}€
      </p>
    </div>
  );
};
