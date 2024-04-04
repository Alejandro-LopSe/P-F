import { FreshContext, Handlers} from "$fresh/server.ts";
import {  db } from "../../DB/SQLConnection.ts";
import { clmap, getdate } from "../../funciones.ts";

import {Cliente} from "../../types.ts"


export const handler: Handlers = {
    async GET(_req: Request,_ctx: FreshContext) {
        console.log("Getting\n");
        const url = new URL(_req.url)
        const filtro_N=url.searchParams.get("Nombre") || ""
        const filtro_A=url.searchParams.get("Apellidos") || ""
        
        const response =  await db.query(`SELECT * FROM Clientes WHERE  Nombre='${filtro_N}' AND  Apellidos='${filtro_A}' AND Activo=1;`)
        const [data]= response
        const cluster = clmap(data as Cliente[])
        console.log("get.ts L-18",cluster);
        console.log("_ctx.destination "  ,_ctx.destination);
        
       return new Response(JSON.stringify(cluster),{ 
        headers: {"location": "/"},
        status: 200
       })

    },

    async DELETE(req: Request,_ctx: FreshContext) {
        console.log("Deactivating\n");
        if(!req.body){

            return new Response("No se ha proporcionado un Cliente.",{ 
                headers: {"location": "/"},
                status: 404
            })
        }
        
        
        
        const cl: Cliente= await req.json()
        const date = getdate(new Date())
        console.log(date)
        const cliente = {
            id_cliente: cl.id_cliente,
            Nombre: cl.Nombre,
            Apellidos: cl.Apellidos,
            DNI: cl.DNI || null, 
            Telefono: cl.Telefono || 0, 
            CP: cl.CP || 0, 
            Direccion: cl.Direccion || " ",
            Correo: cl.Correo || " ",
            Empresa: cl.Empresa || 0,
            Fecha_Baja: `${date}`,
            Fecha_mod: `${date}`, 
            Activo: cl.Activo,
        }
        
        if(cl.Activo===1){
            const [_update] = await db.query(`
            UPDATE Clientes SET
                Fecha_Baja='0',
                Activo='1'
            WHERE  Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';
        `);
        }else if(cl.Activo===0){
            const [_update] = await db.query(`
            UPDATE Clientes SET
                Fecha_Baja='${date}',
                Activo='0'
            WHERE  Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';
        `);
        }
        
    

        return new Response("",{ 
            headers: {"location": "/"},
            status: 200
        })

    },
    
    
    
    async PUT(req: Request,_ctx: FreshContext) {
        console.log("Updating\n");
        if(!req.body){

            return new Response("",{ 
                headers: {"location": "/"},
                status: 404
            })
        }
        
        
        
        const cl: Cliente= await req.json()
        const date = getdate(new Date())
        console.log(cl.Telefono)
        const cliente = {
            id_cliente: cl.id_cliente,
            Nombre: cl.Nombre,
            Apellidos: cl.Apellidos,
            DNI: cl.DNI ||  " ", 
            Telefono: cl.Telefono || 1, 
            CP: cl.CP || 1, 
            Direccion: cl.Direccion || " ",
            Correo: cl.Correo || " ",
            Empresa: cl.Empresa || 1,
            Fecha_Baja: cl.Fecha_Baja || 1,
            Fecha_mod: `${date}`, 
            Activo: 1,
        }
        
        
        const [results]=  await db.query(`SELECT * FROM Clientes WHERE  Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}' AND Activo=1;`)
        console.log(cliente);
        
        //@ts-expect-error>
        const clienteold = results.at(0) 
        
        const [_update] = await db.query(`
            UPDATE Clientes SET
                Fecha_Baja='${date}',
                Activo=0
            WHERE  id_cliente='${cl.id_cliente}' AND Nombre='${cl.Nombre}' AND  Apellidos='${cl.Apellidos}';
        `);
        
        const response = await db.query(`
        INSERT INTO Clientes (id_cliente, Nombre, Apellidos, DNI, Telefono, CP, Direccion, Correo, Empresa, Fecha_Alta, Fecha_Baja, Fecha_mod, Activo ) 
        VALUES (
            '${clienteold.id_cliente}',
            '${clienteold.Nombre}',
            '${clienteold.Apellidos}',
            '${cliente.DNI}',
            '${cliente.Telefono}', 
            '${cliente.CP}',
            '${cliente.Direccion}', 
            '${cliente.Correo}', 
            '${cliente.Empresa}', 
            '${clienteold.Fecha_Alta}', 
            '0', 
            '${date}', 
            '${cliente.Activo}'
        )
    `);

    return new Response(JSON.stringify(response),{ 
        headers: {"location": "/"},
        status: 200
    })

    },
}