import { FunctionalComponent } from "preact";
import { Envio, Estado } from "../../types.ts";
import { useState } from "preact/hooks";
import { P } from "../../signals/Pedido.ts";
import { C } from "../../signals/Cliente.ts";
export const InfoPedido: FunctionalComponent = () => {
  const [ES, setES] = useState<string>(P.value.estado!);
  const [EN, setEN] = useState<string>(P.value.envio!);
  const [N, setN] = useState<string>(P.value.notas!);

  const add = () => {
    const resp = fetch("/Api/pedido", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_pedido: P.value.id_pedido,
        estado: ES,
        envio: EN,
        notas: N,
      }),
    });
  };
  return (
    <>
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
          Pago Total: 0€
        </p>
      </div>
      <p class="notas">
        Notas:{" "}
        <textarea
          type="text"
          name={"notas"}
          onChange={(e) => {
            setN(e.currentTarget.value);
          }}
        />
      </p>
      <button type="button" onClick={add}>Añadir</button>
    </>
  );
};
