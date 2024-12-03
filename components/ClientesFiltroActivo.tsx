import { FunctionalComponent } from "preact";
import { Cliente } from "../types.ts";
import { ActivacionCliente } from "../islands/ActivacionCliente.tsx";
import { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const ClientesFiltroActivo: FunctionalComponent<
    {
        props: Signal;
        filtros: {
            Nombre: string;
            DNI: string;
            Telefono: string;
            CP: string;
            Direccion: string;
            Correo: string;
            Empresa: string;
        };
    }
> = (
    { props },
) => {
    if (!props.value) {
        return <></>;
    }
    if (!IS_BROWSER) return <></>;
    console.log("valores  ", props.value);

    return (
        <>
            {props.value &&
                props.value.map((cliente: Cliente, index: number) => {
                    console.log(cliente, index);

                    return (
                        <ActivacionCliente
                            props={{ data: cliente, index }}
                            signal={props}
                        >
                        </ActivacionCliente>
                    );
                })}
        </>
    );
};
