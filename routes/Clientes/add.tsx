import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../../DB/SQLConnection.ts";
import { Addcliente } from "../../islands/Addcliente.tsx";
import { cluster_cliente } from "../../types.ts";
import { clmap, getdate } from "../../funciones.ts";
import { Cliente } from "../../types.ts";




export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext) => {

        const iscookied  = _req.headers.get("cookie")
        if(iscookied){
            return ctx.render();
        }
        return Response.redirect("http://localhost:8000/")
    },
    POST: async (_req: Request, ctx: FreshContext) => {
        if(_req.headers.get("cookie")){

            const form =  await _req.formData()
            const Nombre = form.get("Nombre")!.toString()
            const Apellidos = form.get("Apellidos")!.toString()
            const DNI = form.get("DNI")!.toString()
            const Telefono = parseInt(form.get("Telefono")!.toString()) || 0
            const Correo = form.get("Correo")!.toString()
            const Direccion = form.get("Direccion")!.toString()
            const CP = parseInt(form.get("CP")!.toString()) || 0
            const Empresa = parseInt(form.get("Empresa")!.toString()) || 0
            const clientetoadd:Cliente= {
                Nombre: Nombre,
                Apellidos: Apellidos,
                DNI: DNI,
                Telefono: Telefono,
                Correo: Correo,
                Direccion: Direccion,
                CP: CP,
                Empresa: Empresa,
                Activo: 1
            }
            const date = getdate(new Date)
            
            await db!.query(`
            INSERT INTO Clientes (
                Nombre, Apellidos, DNI, Telefono, CP, Direccion, Correo, Empresa, Fecha_Alta, Fecha_Baja, Fecha_mod, Activo
            ) 
            VALUES (
                ${clientetoadd.Nombre ? `'${clientetoadd.Nombre}'`: 'NULL'},
                ${clientetoadd.Apellidos ? `'${clientetoadd.Apellidos}'`: 'NULL'},
                ${clientetoadd.DNI ? `'${clientetoadd.DNI}'` : 'NULL'},
                ${clientetoadd.Telefono ? `'${clientetoadd.Telefono}'` : 'NULL'},
                ${clientetoadd.CP ? `'${clientetoadd.CP}'` : 'NULL'},
                ${clientetoadd.Direccion ? `'${clientetoadd.Direccion}'` : 'NULL'},
                ${clientetoadd.Correo ? `'${clientetoadd.Correo}'` : 'NULL'}, ${clientetoadd.Empresa},
                '${date}',
                '0',
                '0',
                ${clientetoadd.Activo}
            );`
            )
            
            return ctx.render();
        }
        return Response.redirect("http://localhost:8000/")
    }
}
export default function Page(props: PageProps<cluster_cliente[]>){

    
    return(
    <>
    <Addcliente></Addcliente>
    
    </>
    )
}