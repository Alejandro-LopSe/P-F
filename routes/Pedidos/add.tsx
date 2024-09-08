import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { getdate } from "../../funciones.ts";
import { Addpedido } from "../../islands/Addpedido.tsx";
import { Cliente, state } from "../../types.ts";

export const handler: Handlers<number | undefined, state> = {
    GET: (_req: Request, ctx: FreshContext<state, number | undefined>) => {
        if (!ctx.state.user) {
            return Response.redirect("http://localhost:8000/");
        }
        const url = new URL(_req.url);
        const id_cliente = url.searchParams.get("id_cliente");
        console.log(id_cliente);
        if (id_cliente) {
            return ctx.render(parseInt(id_cliente));
        }
        return ctx.render();
    },

    POST: async (_req: Request, ctx: FreshContext) => {
        if (_req.headers.get("cookie")) {
            const form = await _req.formData();
            const Nombre = form.get("Nombre")!.toString();
            const Apellidos = form.get("Apellidos")!.toString();
            const DNI = form.get("DNI")!.toString();
            const Telefono = parseInt(form.get("Telefono")!.toString()) || 0;
            const Correo = form.get("Correo")!.toString();
            const Direccion = form.get("Direccion")!.toString();
            const CP = parseInt(form.get("CP")!.toString()) || 0;
            const Empresa = parseInt(form.get("Empresa")!.toString()) || 0;
            const clientetoadd: Cliente = {
                Nombre: Nombre,
                Apellidos: Apellidos,
                DNI: DNI,
                Telefono: Telefono,
                Correo: Correo,
                Direccion: Direccion,
                CP: CP,
                Empresa: Empresa,
                Activo: 1,
            };
            const date = getdate(new Date());

            await db!.query(`
            INSERT INTO Clientes (
                Nombre, Apellidos, DNI, Telefono, CP, Direccion, Correo, Empresa, Fecha_Alta, Fecha_Baja, Fecha_mod, Activo
            ) 
            VALUES (
                ${clientetoadd.Nombre ? `'${clientetoadd.Nombre}'` : "NULL"},
                ${
                clientetoadd.Apellidos ? `'${clientetoadd.Apellidos}'` : "NULL"
            },
                ${clientetoadd.DNI ? `'${clientetoadd.DNI}'` : "NULL"},
                ${
                clientetoadd.Telefono ? `'${clientetoadd.Telefono}'` : "NULL"
            },
                ${clientetoadd.CP ? `'${clientetoadd.CP}'` : "NULL"},
                ${
                clientetoadd.Direccion ? `'${clientetoadd.Direccion}'` : "NULL"
            },
                ${
                clientetoadd.Correo ? `'${clientetoadd.Correo}'` : "NULL"
            }, ${clientetoadd.Empresa},
                '${date}',
                '0',
                '0',
                ${clientetoadd.Activo}
            );`);

            return ctx.render();
        }
        return Response.redirect("http://localhost:8000/");
    },
};
export default function Page(props: PageProps<number | undefined, state>) {
    return (
        <>
            <Addpedido
                empleado={props.state.id_usuario}
                id_cliente={props.data}
            >
            </Addpedido>
        </>
    );
}
