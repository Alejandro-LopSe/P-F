import { FunctionalComponent } from "preact";
import { Cliente } from "../../types.ts";
import { Signal } from "@preact/signals";

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
  if (!Object.values(filtros).every((v) => v === "")) {
    console.log("Filtrado de clientes:", filtros);
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
      if (
        cliente.Nombre.includes(filtros.value.Nombre || "") ||
        cliente.Apellidos.includes(filtros.value.Nombre || "") ||
        cliente.DNI?.includes(filtros.value.DNI || "") ||
        (cliente.Telefono?.toString().includes(filtros.value.Telefono || "")) ||
        cliente.CP?.toString().includes(filtros.value.CP || "") ||
        cliente.Direccion?.includes(filtros.value.Direccion || "") ||
        cliente.Correo?.includes(filtros.value.Correo || "")
      ) {
        return [...arr, cliente];
      } else {
        return arr;
      }
    }, []);
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
