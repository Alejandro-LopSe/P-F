import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { Clientes } from "../../islands/Clientes.tsx";
import { cluster_cliente, state } from "../../types.ts";
import { clmap } from "../../funciones.ts";
import { Cliente } from "../../types.ts";
import { useSignal } from "@preact/signals";

export const handler: Handlers<unknown, state> = {
    GET: async (_req: Request, ctx: FreshContext<state>) => {
        const iscookied = _req.headers.get("cookie");
        if (iscookied) {
            const response = await db!.query(`SELECT * FROM Clientes;`);
            const [data] = response;
            const cluster = clmap(data as Cliente[]);
            return ctx.render(cluster);
        }
        return Response.redirect("http://localhost:8000/");
    },
    POST: async (_req: Request, ctx: FreshContext<state>) => {
        const iscookied = _req.headers.get("cookie");
        if (iscookied) {
            const form = await _req.formData();
            const tamaño = form.get("tamaño");
            const envase = form.get("envase");
            const aceite = form.get("aceite");
            const Precios = form.get("Precio");

            await db!.query(`
                INSERT INTO Articulos (
                    Tamano,Envase,Tipo_aceite,Precio
                ) 
                VALUES (
                    '${tamaño}','${envase}','${aceite}','${Precios}'
                    
                );`);
            return ctx.render();
        }
        return Response.redirect("http://localhost:8000/");
    },
};
export default function Page(props: PageProps) {
    return (
        <div class="addclientes">
            <form action="/Articulos" method="post">
                <p>
                    Tamaño:{" "}
                    <select name="tamaño" id="tamaño">
                        <option value="L5">L5</option>
                        <option value="L2">L2</option>
                        <option value="L05">L05</option>
                        <option value="L025">L025</option>
                    </select>
                </p>
                <p>
                    Aceite:{" "}
                    <select name="aceite" id="aceite">
                        <option value="MAD">MAD</option>
                        <option value="DO">DO</option>
                    </select>
                </p>
                <p>
                    Envase:{" "}
                    <select name="envase" id="envase">
                        <option value="PLASTICO">PLASTICO</option>
                        <option value="LATA">LATA</option>
                        <option value="CRISTAL">CRISTAL</option>
                    </select>
                </p>
                <p>
                    Precio: <input name="Precio" type="number" />
                </p>
                <button type="submit">+</button>
            </form>
        </div>
    );
}
