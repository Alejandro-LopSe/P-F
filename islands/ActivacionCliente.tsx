import { FunctionalComponent } from "preact";
import { Cliente } from "../types.ts";
import { Signal, useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

export const ActivacionCliente: FunctionalComponent<
    { props: { data: Cliente; index: number }; signal: Signal<Cliente[]> }
> = (
    { props, signal },
) => {
    console.log("SIGNALLLL: ", signal.value);

    const [dni, dnimod] = useState<string>(props.data.DNI!);
    const [error, errormod] = useState<string>("");
    const [tlf, tlfmod] = useState<number>(props.data.Telefono!);
    const [cp, cpmod] = useState<number>(props.data.CP!);
    const [dir, dirmod] = useState<string>(props.data.Direccion!);
    const [correo, correomod] = useState<string>(props.data.Correo!);
    const [empresa, empresamod] = useState<number>(props.data.Empresa!);
    const [act, actmod] = useState<number>(props.data.Activo!);

    const send = async () => {
        const body = {
            ...props.data,
            Nombre: props.data.Nombre,
            Apellidos: props.data.Apellidos,
            dni,
            tlf,
            cp,
            dir,
            correo,
            empresa,
        };
        console.log(body);

        const exist = await fetch("http://localhost:8000/Api/actCliente", {
            method: "PUT",
            headers: { "content-type": "apliccation/json" },
            body: JSON.stringify(body),
        });
        const res = await exist.json();

        if (res.includes("Error")) {
            errormod("incorrecto");
            return;
        }
        errormod("correcto");

        return;
    };

    return (
        <>
            {
                <div
                    class={act === 1 ? "activo" : "inactivo"}
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
                    <p
                        href="/Clientes/Activar"
                        class={`buttonmodificar`}
                        onClick={send}
                    >
                        {act === 1 ? "Desactivar" : "Reactivar"}
                    </p>
                </div>
            }
        </>
    );
};
