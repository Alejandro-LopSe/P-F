import { FunctionalComponent } from "preact";
import { Pedido, state } from "../types.ts";
import { useState } from "preact/hooks";
import { Signal } from "@preact/signals";

export const FiltroPedidos: FunctionalComponent<
  { props: { state: state; data: Pedido[] }; signal: Signal }
> = (
  { props, signal },
) => {
  const [P, setP] = useState<Pedido>();

  return (
    <div class="div first">
      <p class="nombre">
        NOMBRE{" "}
        <input
          type="text"
          onInput={(e) => {
          }}
        />
      </p>
      <p class="pedido">
        DNI{" "}
        <input
          type="text"
          onInput={(e) => {
          }}
        />
      </p>
      <p class="pedido">
        TLF{" "}
        <input
          type="text"
          onInput={(e) => {
          }}
        />
      </p>
      <p class="pedido">
        CP{" "}
        <input
          type="text"
          onInput={(e) => {
          }}
        />
      </p>
      <p class="pedido">
        DIR{" "}
        <input
          type="text"
          onInput={(e) => {
          }}
        />
      </p>
      <p class="pedido">
        CORREO{" "}
        <input
          type="text"
          onInput={(e) => {
          }}
        />
      </p>
      <p class="modificaciones">
        EMPRESA

        <select
          onChange={(e) => {
          }}
        >
          <option value={"10"}>TODOS</option>
          <option value={"1"}>SI</option>
          <option value={"0"}>NO</option>
        </select>
      </p>
    </div>
  );
};
