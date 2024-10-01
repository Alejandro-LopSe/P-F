import { FunctionalComponent } from "preact";
import { Cliente } from "../types.ts";
import { ActivacionCliente } from "./ActivacionCliente.tsx";
import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export const ClientesFiltroActivo: FunctionalComponent<
    {
        props: { data: Cliente[] };
        filtros: {
            Nombre: string;
            DNI: string;
            Telefono: string;
            CP: string;
            Direccion: string;
            Correo: string;
            Empresa: string;
        };
        señal: Signal;
    }
> = (
    { props, filtros, señal },
) => {
    useEffect(() => {
        console.log(señal.value);
    }, [señal.value]);
    if (!props.data) {
        return <></>;
    }
    const filtrado = props.data.reduce((arr: Cliente[], cliente: Cliente) => {
        const cli = {
            Nombre: `${cliente.Nombre} ${cliente.Apellidos}`,
            DNI: cliente.DNI,
            Telefono: cliente.Telefono,
            CP: cliente.CP,
            Direccion: cliente.Direccion,
            Correo: cliente.Correo,
            Empresa: cliente.Empresa,
        };
        const itis = Object.keys(cli).every((key: string) => {
            //@ts-expect-errors
            if (!filtros[`${key}`]) {
                return true;
            }
            //@ts-expect-errors
            if (cli[`${key}`] === null && filtros[`${key}`]) {
                return false;
            }
            //@ts-expect-errors
            if (typeof cli[`${key}`] === "number") {
                if (
                    //@ts-expect-errors
                    (`${cli[`${key}`]}`).includes(
                        //@ts-expect-errors
                        filtros[`${key}`],
                        //@ts-expect-errors
                    ) || filtros[`${key}`] === "10"
                ) {
                    return true;
                } else {
                    return false;
                }
            }
            //@ts-expect-errors
            if (cli[`${key}`].includes(filtros[`${key}`])) {
                return true;
            } else {
                return false;
            }
        });
        if (itis) {
            return [...arr, cliente];
        } else {
            return arr;
        }
    }, []);
    const filtradosordenados = filtrado.sort((a: Cliente, b: Cliente) => {
        return (a.Nombre > b.Nombre ? -1 : 1);
    });
    return (
        <>
            {filtradosordenados &&
                filtradosordenados.map((cliente: Cliente) => {
                    return (
                        <ActivacionCliente
                            props={{ data: cliente }}
                            señal={señal}
                        >
                        </ActivacionCliente>
                    );
                })}
        </>
    );
};
