import { FunctionalComponent } from "preact";
import { Cliente, state } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import { Clientes_all } from "../components/c/Clientes_all.tsx";
import { useSignal } from "@preact/signals";

export const Clientes: FunctionalComponent<
  { props: { state: state; data: Cliente[] } }
> = (
  { props },
) => {
  const [nombre, nombremod] = useState<string | undefined>(undefined);
  const [dni, dnimod] = useState<string | undefined>(undefined);
  const [tlf, tlfmod] = useState<string | undefined>(undefined);
  const [cp, cpmod] = useState<string | undefined>(undefined);
  const [dir, dirmod] = useState<string | undefined>(undefined);
  const [correo, correomod] = useState<string | undefined>(undefined);
  const [empresa, empresamod] = useState<string | undefined>(undefined);
  const filtros = useSignal<{
    Nombre: string | undefined;
    DNI: string | undefined;
    Telefono: string | undefined;
    CP: string | undefined;
    Direccion: string | undefined;
    Correo: string | undefined;
    Empresa: string | undefined;
  }>({
    Nombre: nombre,
    DNI: dni,
    Telefono: tlf,
    CP: cp,
    Direccion: dir,
    Correo: correo,
    Empresa: empresa,
  });
  useEffect(() => {
    filtros.value = {
      Nombre: nombre,
      DNI: dni,
      Telefono: tlf,
      CP: cp,
      Direccion: dir,
      Correo: correo,
      Empresa: empresa,
    };
  }, [nombre, dni, tlf, cp, dir, correo, empresa]);

  console.log("rendering", filtros);

  return (
    <div class="Lista_Clientes">
      <a class="return" href="/">Volver</a>
      <div class="Filtro_Clientes">
        <p class="start">
          NOMBRE{" "}
          <input
            type="text"
            onInput={(e) => {
              nombremod(e.currentTarget.value);
            }}
          />
        </p>
        <p class="pedido">
          TLF{" "}
          <input
            type="text"
            onInput={(e) => {
              tlfmod(e.currentTarget.value);
            }}
          />
        </p>
        <p class="pedido">
          DIR{" "}
          <input
            type="text"
            onInput={(e) => {
              dirmod(e.currentTarget.value);
            }}
          />
        </p>
        <p class="pedido">
          CORREO{" "}
          <input
            type="text"
            onInput={(e) => {
              correomod(e.currentTarget.value);
            }}
          />
        </p>
        <p class="pedido">
          DNI{" "}
          <input
            type="text"
            onInput={(e) => {
              dnimod(e.currentTarget.value);
            }}
          />
        </p>
        <p class="pedido">
          CP{" "}
          <input
            type="text"
            onInput={(e) => {
              cpmod(e.currentTarget.value);
            }}
          />
        </p>
        <p class="end">
          EMPRESA

          <select
            value={empresa}
            onChange={(e) => {
              empresamod(e.currentTarget.value);
            }}
          >
            <option value={"10"}>TODOS</option>
            <option value={"1"}>SI</option>
            <option value={"0"}>NO</option>
          </select>
        </p>
      </div>
      <Clientes_all
        data={props.data}
        filtros={filtros}
      >
      </Clientes_all>
    </div>
  );
};
