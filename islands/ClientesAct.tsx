import { FunctionalComponent } from "preact";
import { Cliente, state } from "../types.ts";
import { Signal, useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

import { ClientesFiltroActivo } from "./ClientesFiltroActivo.tsx";

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
    const activo = useSignal<number[]>(props.data.map((a) => {
        return a.Activo;
    }));
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
            <ClientesFiltroActivo
                props={props}
                filtros={{
                    Nombre: nombre,
                    DNI: dni,
                    Telefono: tlf,
                    CP: cp,
                    Direccion: dir,
                    Correo: correo,

                    Empresa: empresa,
                }}
                señal={activo}
            >
            </ClientesFiltroActivo>
        </div>
    );
};
