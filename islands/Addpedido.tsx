import { FunctionComponent, JSX } from "preact";
import { Cliente } from "../types.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Addreserva } from "./Addreserva.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const Addpedido: FunctionComponent<
    { id_cliente?: number; empleado: number }
> = (
    { id_cliente, empleado },
) => {
    const [ids_clientes, ids] = useState<number[]>([]);
    const get_clientes = async () => {
        const clientes = await fetch("http://localhost:8000/api/custom", {
            method: "put",
            headers: {
                "Content-Type": "text",
            },
            body: "SELECT DISTINCT id_cliente FROM clientes WHERE activo=1;",
        });
        const data = await clientes.json();
        console.log("ids", ids_clientes);

        ids(data.map((cl: { id_cliente: number }) => {
            return cl.id_cliente;
        }));
    };
    if (!id_cliente && IS_BROWSER && ids_clientes.length === 0) {
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
                                    {ids_clientes.length !== 0 &&
                                        ids_clientes.map(
                                            (elem: number) => {
                                                return (
                                                    <option
                                                        value={elem}
                                                    >
                                                        {elem}
                                                    </option>
                                                );
                                            },
                                        )}
                                </select>
                            </p>
                            <input type="hidden" value={empleado} />
                            <p>
                                Año Fiscal:{" "}
                                <input
                                    type="text"
                                    value={new Date().getFullYear()}
                                />
                            </p>
                            <p>
                                Mes:{" "}
                                <input
                                    type="text"
                                    value={new Date().getMonth()}
                                />
                            </p>
                            <p>
                                Tipo de envio:{" "}
                                <select name="envio" value={"RECOGIDA"}>
                                    <option value="RECOGIDA">RECOGIDA</option>
                                    <option value="ENVIO">ENVIO</option>
                                    <option value="LLEVAR">LLEVAR</option>
                                </select>
                            </p>
                            <p>
                                <Addreserva id_pedido={0}></Addreserva>
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
                                Año Fiscal:{" "}
                                <input
                                    type="text"
                                    value={new Date().getFullYear()}
                                />
                            </p>
                            <p>
                                Mes:{" "}
                                <input
                                    type="text"
                                    value={new Date().getMonth()}
                                />
                            </p>
                            <p>
                                Tipo de envio:{" "}
                                <select name="envio" value={"RECOGIDA"}>
                                    <option value="RECOGIDA">RECOGIDA</option>
                                    <option value="ENVIO">ENVIO</option>
                                    <option value="LLEVAR">LLEVAR</option>
                                </select>
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
