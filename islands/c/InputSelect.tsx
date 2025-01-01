import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { addpedido, Cliente as Cliente_type } from "../../types.ts";
import { C } from "../../signals/Cliente.ts";

export const InputSelect: FunctionalComponent<{ data: addpedido }> = (
  { data },
) => {
  const [currentdata, setD] = useState<Cliente_type[]>(data.clientes);
  const [nombre, setN] = useState<string>("");
  const update = async (id: number | string) => {
    const resp = await fetch(
      `/Api/getCliente?id=${id}`,
    );
    const data = await resp.json();
    console.log(data);
    C.value = data[0];
  };
  useEffect(() => {
  }, [C.value]);

  const change = (name: string) => {
    setN(name);
    setD(
      data.clientes?.reduce((acc: Cliente_type[], cliente: Cliente_type) => {
        if (cliente.Nombre.includes(name)) {
          return [...acc, cliente];
        } else {
          return acc;
        }
      }, []),
    );
  };

  return (
    <>
      <div class="inpselecft">
        <input
          class={"return"}
          type="text"
          name={"nombre"}
          value={nombre}
          onChange={(e) => {
            change(e.currentTarget.value);
          }}
        />
        <select
          name="cliente"
          id="cliente"
          class={"return"}
          onChange={(e) => {
            console.log(1);
            update(e.currentTarget.value);
          }}
          value={""}
        >
          {currentdata.map((cliente: Cliente_type) => {
            return <option value={cliente.id_cliente}>{cliente.Nombre}</option>;
          })}
        </select>
      </div>
    </>
  );
};
