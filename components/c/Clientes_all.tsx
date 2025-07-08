import { FunctionalComponent } from "preact";
import { Cliente } from "../../types.ts";
import { Signal } from "@preact/signals";
import { check_cliente } from "../../funciones.ts";

export const Clientes_all: FunctionalComponent<
  {
    data: Cliente[];
    filtros: Signal<{
      Nombre: string | undefined;
      DNI: string | undefined;
      Telefono: string | undefined;
      CP: string | undefined;
      Direccion: string | undefined;
      Correo: string | undefined;
      Empresa: string | undefined;
    }>;
  }
> = (
  { data, filtros },
) => {
  if (Object.values(filtros.value).every((v) => v === undefined || v === "")) {
    console.log("Clientes:", filtros);
    return (
      <>
        {data.map((c: Cliente) => {
          return (
            <div class="cliente_elem" key={c.id_cliente}>
              <p class="start">{c.Nombre} {c.Apellidos}</p>
              <p class="pedido">{c.Telefono || "-"}</p>
              <p class="pedido">{c.Direccion || "-"}</p>
              <p class="pedido">{c.Correo || "-"}</p>
              <p class="pedido">{c.DNI || "-"}</p>
              <p class="pedido">{c.CP || "-"}</p>
              <p class="end">{c.Empresa_Nombre || "-"}</p>
            </div>
          );
        })}
      </>
    );
  } else {
    const filtrado = data.reduce((arr: Cliente[], cliente: Cliente) => {
      const check = check_cliente(cliente, filtros.value);
      if (check) {
        console.log("Cliente filtrado:", cliente, check);
        return [...arr, cliente];
      } else {
        return arr;
      }
    }, []);
    console.log("Filtrado de clientes:", filtrado);

    return (
      <>
        {filtrado.map((c: Cliente) => {
          return (
            <div class="cliente_elem" key={c.id_cliente}>
              <p class="start">{c.Nombre} {c.Apellidos}</p>
              <p class="pedido">{c.Telefono || "-"}</p>
              <p class="pedido">{c.Direccion || "-"}</p>
              <p class="pedido">{c.Correo || "-"}</p>
              <p class="pedido">{c.DNI || "-"}</p>
              <p class="pedido">{c.CP || "-"}</p>
              <p class="end">{c.Empresa_Nombre || "-"}</p>
            </div>
          );
        })}
      </>
    );
  }
};
