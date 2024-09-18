import { FunctionalComponent } from "preact";
import { Cliente, state } from "../types.ts";

import { useState } from "preact/hooks";
import { ClientesFiltroModificar } from "../components/ClientesFiltroModificar.tsx";

export const ClientesModificar: FunctionalComponent<
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
    console.log("rendering");

    return (
        <div class="clientesmodificar">
            <a class="return" href="/">Volver</a>

            <div class="first">
                <p class="nombre">
                    NOMBRE{" "}
                    <input
                        class={"filtro"}
                        type="text"
                        onInput={(e) => {
                            nombremod(e.currentTarget.value);
                        }}
                    />
                </p>
                <p class="pedido">
                    DNI{" "}
                    <input
                        class={"filtro"}
                        type="text"
                        onInput={(e) => {
                            dnimod(e.currentTarget.value);
                        }}
                    />
                </p>
                <p class="pedido">
                    TLF{" "}
                    <input
                        class={"filtro"}
                        type="text"
                        onInput={(e) => {
                            tlfmod(e.currentTarget.value);
                        }}
                    />
                </p>
                <p class="pedido">
                    CP{" "}
                    <input
                        class={"filtro"}
                        type="text"
                        onInput={(e) => {
                            cpmod(e.currentTarget.value);
                        }}
                    />
                </p>
                <p class="pedido">
                    DIR{" "}
                    <input
                        class={"filtro"}
                        type="text"
                        onChange={(e) => {
                            dirmod(e.currentTarget.value);
                        }}
                    />
                </p>
                <p class="pedido">
                    CORREO{" "}
                    <input
                        class={"filtro"}
                        type="text"
                        onInput={(e) => {
                            correomod(e.currentTarget.value);
                        }}
                    />
                </p>
                <p class="modificaciones">
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
            <ClientesFiltroModificar
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
            >
            </ClientesFiltroModificar>
        </div>
    );
};
