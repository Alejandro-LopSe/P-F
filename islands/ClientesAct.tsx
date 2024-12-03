import { FunctionalComponent } from "preact";
import { Cliente, state } from "../types.ts";
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

import { ClientesFiltroActivo } from "../components/ClientesFiltroActivo.tsx";

export const ClientesAct: FunctionalComponent<
    { props: { state: state; data: Cliente[] } }
> = (
    { props },
) => {
    const [nombre, nombremod] = useState<string>("");
    const [dni, dnimod] = useState<string>("");
    const [tlf, tlfmod] = useState<string>("");
    const [cp, cpmod] = useState<string>("");
    const [dir, dirmod] = useState<string>("");
    const [correo, correomod] = useState<string>("");
    const [empresa, empresamod] = useState<string>("10");
    const [r, rr] = useState(props.data);
    const clientes = useSignal<Cliente[]>(props.data);

    const check = async () => {
        const exist = await fetch("http://localhost:8000/Api/checkCliente");
        const dataa = await exist.json();

        if (clientes.value !== dataa) {
            clientes.value = dataa;
        }
    };
    useEffect(() => {
        rr(clientes.value);
    }, [clientes.value]);
    clientes.value = clientes.value.sort(
        (a: Cliente, b: Cliente) => {
            return (a.Nombre > b.Nombre ? -1 : 1);
        },
    );

    const send = async (e: Cliente) => {
        console.log(e);

        const exist = await fetch("http://localhost:8000/Api/actCliente", {
            method: "PUT",
            headers: { "content-type": "apliccation/json" },
            body: JSON.stringify(e),
        });
        const res = await exist.json();
        clientes.value = res[0];
        if (res.includes("Error")) {
            return;
        }

        return;
    };

    return (
        <div class="clientes">
            <a class="return" href="/">Volver</a>

            <div class="first">
                <p class="nombre">
                    NOMBRE{" "}
                    <input
                        type="text"
                        onInput={(e) => {
                            nombremod(e.currentTarget.value);
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
                    TLF{" "}
                    <input
                        type="text"
                        onInput={(e) => {
                            tlfmod(e.currentTarget.value);
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
                <p>Invertir</p>
            </div>
            <>
                <>
                    {clientes.value.map((e: Cliente) => {
                        return (
                            <div
                                class={e.Activo === 1 ? "activo" : "inactivo"}
                            >
                                <p class="nombre">
                                    {`${e.Nombre} ${e.Apellidos}`}
                                </p>
                                <p class="pedido">{dni}</p>
                                <p
                                    type="number"
                                    class="pedido"
                                    value={e.Telefono}
                                >
                                    {e.Telefono}
                                </p>
                                <p
                                    type="number"
                                    class="pedido"
                                    value={e.CP}
                                >
                                    {e.CP}
                                </p>
                                <p
                                    class="pedido"
                                    value={e.Direccion}
                                >
                                    {e.Direccion}
                                </p>
                                <p
                                    class="pedido"
                                    value={e.Correo}
                                >
                                    {e.Correo}
                                </p>
                                <p class="pedido">
                                    {e.Empresa === 1 ? "Si" : "No"}
                                </p>
                                <p
                                    href="/Clientes/Activar"
                                    class={`buttonmodificar`}
                                    onClick={() => send(e)}
                                >
                                    {e.Activo === 1
                                        ? "Desactivar"
                                        : "Reactivar"}
                                </p>
                            </div>
                        );
                    })}
                </>
            </>
        </div>
    );
};
