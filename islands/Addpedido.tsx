import { FunctionComponent, JSX } from "preact";
import { Cliente } from "../types.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export const Addpedido: FunctionComponent<
    { id_cliente?: number; empleado: number }
> = (
    { id_cliente, empleado },
) => {
    const ids_clientes = useSignal("null");
    const get_clientes = async () => {
        const clientes = await fetch("http://localhost:8000/api/custom", {
            method: "put",
            headers: {
                "Content-Type": "text",
            },
            body: "SELECT DISTINCT id_cliente FROM clientes;",
        });
        ids_clientes.value = await clientes.text();

        /*ids_clientes = data.map((cl: { id_cliente: number }) => {
            return cl.id_cliente;
        });*/
    };
    if (!id_cliente) {
        get_clientes();
    }

    return (
        <div class="addclientes">
            <form
                action="/Pedidos/add"
                method="post"
            >
                {!id_cliente
                    ? (
                        <>
                            <p>
                                Cliente:{" "}
                                <select
                                    name="Nombre"
                                    value={""}
                                >
                                    {ids_clientes.value !== "null" &&
                                        JSON.parse(ids_clientes.value).map(
                                            (elem: { id_cliente: number }) => {
                                                return (
                                                    <option
                                                        value={elem.id_cliente}
                                                    >
                                                        {elem.id_cliente}
                                                    </option>
                                                );
                                            },
                                        )}
                                </select>
                            </p>
                            <input type="hidden" value={empleado} />
                            <p>
                                Año Fiscal: <input type="text" />
                            </p>
                            <p>
                                Mes:{" "}
                                <input
                                    type="text"
                                    value={new Date().getMonth()}
                                />
                            </p>
                            <p>
                                Estado: <input type="text" />
                            </p>
                            <p>
                                Tipo de envio: <input type="text" />
                            </p>
                            <p>
                                Pago total:
                            </p>
                            <p>
                                Notas: <input type="text" />
                            </p>
                        </>
                    )
                    : (
                        <>
                            <p>
                                Cliente: {id_cliente}
                            </p>
                            <input type="hidden" value={empleado} />
                            <p>
                                Año Fiscal: <input type="text" />
                            </p>
                            <p>
                                Mes:{" "}
                                <input
                                    type="text"
                                    value={new Date().getMonth()}
                                />
                            </p>
                            <p>
                                Estado: <input type="text" />
                            </p>
                            <p>
                                Tipo de envio: <input type="text" />
                            </p>
                            <p>
                                Pago total:
                            </p>
                            <p>
                                Notas: <input type="text" />
                            </p>
                        </>
                    )}
            </form>
        </div>
    );
};
