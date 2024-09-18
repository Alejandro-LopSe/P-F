import { FunctionalComponent } from "preact";
import { Cliente } from "../types.ts";

import { useState } from "preact/hooks";

export const Clientemd: FunctionalComponent<
    { props: { data: Cliente } }
> = (
    { props },
) => {
    const [dni, dnimod] = useState<string>(props.data.DNI!);
    const [error, errormod] = useState<string>("");
    const [tlf, tlfmod] = useState<number>(props.data.Telefono!);
    const [cp, cpmod] = useState<number>(props.data.CP!);
    const [dir, dirmod] = useState<string>(props.data.Direccion!);
    const [correo, correomod] = useState<string>(props.data.Correo!);
    const [empresa, empresamod] = useState<number>(props.data.Empresa!);
    const [disbled, disbledmod] = useState<boolean>(true);
    const send = async () => {
        const body = {
            Nombre: props.data.Nombre,
            Apellidos: props.data.Apellidos,
            dni,
            tlf,
            cp,
            dir,
            correo,
            empresa,
        };
        const exist = await fetch("http://localhost:8000/Api/modCliente", {
            method: "PUT",
            headers: { "content-type": "apliccation/json" },
            body: JSON.stringify(body),
        });
        const res = await exist.text();
        if (res.includes("Error")) {
            errormod("incorrecto");
            return;
        }
        console.log(res);

        errormod("correcto");
    };

    return (
        <>
            {props.data["Activo"] === 1 && (
                <div
                    id={`${props.data.Nombre}${props.data.Apellidos}`}
                >
                    <p class="nombre">
                        {`${props.data.Nombre} ${props.data.Apellidos}`}
                    </p>
                    <input
                        class="pedido"
                        onInput={(e) => {
                            if (disbled) {
                                disbledmod(!disbled);
                            }
                            dnimod(e.currentTarget.value);
                        }}
                        value={dni}
                    >
                    </input>
                    <input
                        type="number"
                        onInput={(e) => {
                            if (disbled) {
                                disbledmod(!disbled);
                            }
                            tlfmod(parseInt(e.currentTarget.value));
                        }}
                        class="pedido"
                        value={tlf}
                    >
                    </input>
                    <input
                        type="number"
                        onInput={(e) => {
                            if (disbled) {
                                disbledmod(!disbled);
                            }
                            cpmod(parseInt(e.currentTarget.value));
                        }}
                        class="pedido"
                        value={cp}
                    >
                    </input>
                    <input
                        onInput={(e) => {
                            if (disbled) {
                                disbledmod(!disbled);
                            }
                            dirmod(e.currentTarget.value);
                        }}
                        class="pedido"
                        value={dir}
                    >
                    </input>
                    <input
                        onInput={(e) => {
                            if (disbled) {
                                disbledmod(!disbled);
                            }
                            correomod(e.currentTarget.value);
                        }}
                        class="pedido"
                        value={correo}
                    >
                    </input>
                    <select
                        class="pedido"
                        name="empresa"
                        value={empresa}
                        onChange={(e) => {
                            if (disbled) {
                                disbledmod(!disbled);
                            }
                            empresamod(parseInt(e.currentTarget.value));
                        }}
                    >
                        <option value={0}>No</option>
                        <option value={1}>Si</option>
                    </select>
                    <button
                        class={`buttonmodificar ${error}`}
                        disabled={disbled}
                        onClick={send}
                    >
                        Modificar
                    </button>
                </div>
            )}
        </>
    );
};
