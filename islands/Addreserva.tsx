import { FunctionComponent, JSX } from "preact";
import { Articulo, Cliente } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Tamaños } from "../types.ts";
import { Envase } from "../types.ts";
import { Aceite } from "../types.ts";

export const Addreserva: FunctionComponent<{ id_pedido: number }> = (
    { id_pedido },
) => {
    const [articulos, Setartculos] = useState<Articulo[]>([]);

    const getarticulos = async () => {
        const response = await fetch("http://localhost:8000/api/articulos");
        const data = await response.json();
        Setartculos(data);
        console.log("DATA", data);
    };

    useEffect(() => {
        console.log("efect");
        if (articulos.length === 0) {
            getarticulos();
        }
    });

    return (
        <div class="addclientes">
            <p>
                Articulo:
                <select name="articulo" value={"a"}>
                    {articulos.map((elem: Articulo) => {
                        return (
                            <option value={elem.id_articulo}>
                                {console.log(elem)}
                                {elem.Tamano as Tamaños}/{elem
                                    .Tipo_aceite as Aceite}/{elem
                                    .Envase as Envase}
                            </option>
                        );
                    })}
                </select>
            </p>
            <input type="hidden" name="id_pedido" value={id_pedido} />
            <p>
                Cantidad: <input type="number" value={0} />
            </p>
        </div>
    );
};
