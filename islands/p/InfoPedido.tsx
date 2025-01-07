import { FunctionalComponent } from "preact";
import { Envio, Estado, Reservaspedido } from "../../types.ts";
import { useEffect, useState } from "preact/hooks";
import { P, R } from "../../signals/Pedido.ts";
import { C } from "../../signals/Cliente.ts";
import { A } from "../../signals/Articulos.ts";
export const InfoPedido: FunctionalComponent<{ data: Reservaspedido }> = (
  { data },
) => {
  const [ES, setES] = useState<string>(P.value.estado!);
  const [EN, setEN] = useState<string>(P.value.envio!);
  const [N, setN] = useState<string>(P.value.notas!);
  const [PP, setPP] = useState<number>(P.value.pago_total!);

  const add = () => {
    const body = { ...P.value, estado: ES, envio: EN, notas: N };
    const resp = fetch("/Api/pedido", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  useEffect(() => {
  }, [R.value, P.value, C.value, A.value]);
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
          Pago Total: {P.value.pago_total}€
        </p>
      </div>
      <p class="notas">
        Notas:{" "}
        <textarea
          type="text"
          name={"notas"}
          value={data.pedidos.notas}
          onChange={(e) => {
            setN(e.currentTarget.value);
          }}
        />
      </p>
      <button type="button" onClick={add}>Añadir</button>
    </>
  );
};
