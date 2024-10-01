import { FunctionalComponent } from "preact";
import { Cliente } from "../types.ts";
import { Signal, useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

export const ActivacionCliente: FunctionalComponent<
    { props: { data: Cliente }; señal: Signal }
> = (
    { props, señal },
) => {
    const [dni, dnimod] = useState<string>(props.data.DNI!);
    const [error, errormod] = useState<string>("");
    const [tlf, tlfmod] = useState<number>(props.data.Telefono!);
    const [cp, cpmod] = useState<number>(props.data.CP!);
    const [dir, dirmod] = useState<string>(props.data.Direccion!);
    const [correo, correomod] = useState<string>(props.data.Correo!);
    const [empresa, empresamod] = useState<number>(props.data.Empresa!);

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
        const exist = await fetch("http://localhost:8000/Api/actCliente", {
            method: "PUT",
            headers: { "content-type": "apliccation/json" },
            body: JSON.stringify(body),
        });
        const res = await exist.text();
        if (res.includes("Error")) {
            errormod("incorrecto");
            return;
        }
        señal.value = señal.value === 1 ? 0 : 1;
        console.log(señal);

        console.log(res);
        errormod("correcto");
        return;
    };

    return (
        <>
            {
                <div
                    class={props.data["Activo"] === 1 ? "activo" : "inactivo"}
                    id={`${props.data.Nombre}${props.data.Apellidos}`}
                >
                    <p class="nombre">
                        {`${props.data.Nombre} ${props.data.Apellidos}`}
                    </p>
                    <p class="pedido">{dni}</p>
                    <p
                        type="number"
                        class="pedido"
                        value={tlf}
                    >
                        {tlf}
                    </p>
                    <p
                        type="number"
                        class="pedido"
                        value={cp}
                    >
                        {cp}
                    </p>
                    <p
                        class="pedido"
                        value={dir}
                    >
                        {dir}
                    </p>
                    <p
                        class="pedido"
                        value={correo}
                    >
                        {correo}
                    </p>
                    <p class="pedido">
                        {empresa === 1 ? "Si" : "No"}
                    </p>
                    <a
                        href="/Clientes/Activar"
                        class={`buttonmodificar ${error}`}
                        onClick={send}
                    >
                        {props.data["Activo"] === 1
                            ? "Desactivar"
                            : "Reactivar"}
                    </a>
                </div>
            }
        </>
    );
};
