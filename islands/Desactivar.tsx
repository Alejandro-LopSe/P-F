import { FunctionComponent } from "preact";
import {Cliente} from "../types.ts"
import { useState } from "preact/hooks";
import { cluster_cliente } from "../types.ts";


//@ts-expect-error-
export const Desactivar: FunctionComponent<{data: cluster_cliente, activos: boolean}>= ({data,activos})=>{
    const [newdata,setnewdata] = useState<cluster_cliente>(data)
    const [enable,setenable] = useState<boolean>(true)
    const [nombre,setnombre] = useState<string>(newdata.v_actual!.Nombre)
    const [apellidos,setapellidos] = useState<string>(newdata.v_actual!.Apellidos)
    const [id, setid] = useState<number | undefined>(newdata.v_actual!.id_cliente)
    const [DNI,setdni] = useState<string | undefined>(newdata.v_actual!.DNI)
    const [Telefono,settel] = useState<number | undefined>(newdata.v_actual!.Telefono)
    const [Correp,setcorrep] = useState<string | undefined>(newdata.v_actual!.Correo)
    const [Direcion,setdir] = useState<string | undefined>(newdata.v_actual!.Direccion)
    const [Empresa,setem] = useState<number>(newdata.v_actual!.Empresa)
    const [Cp,setcp] = useState<number | undefined>(newdata.v_actual!.CP)
    const [activo,setact] = useState<number | undefined>(newdata.v_actual!.Activo)
    let clas ="inactivo"
    if(activo===1){
        clas="activo"
    }


    const deletec = async ()=>{
        const cliente: Cliente = {
            id_cliente: id,
            Nombre: nombre,
            Apellidos: apellidos,
            DNI: DNI,
            Telefono: Telefono,
            CP: Cp,
            Direccion: Direcion,
            Correo: Correp,
            Empresa: Empresa,
            Fecha_Alta:  newdata.v_actual!.Fecha_Alta,
            Fecha_Baja: "0",
            Activo: 0
        }
        
        
        const put = await fetch("/api/get",{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cliente),
        })
        const get = await fetch("/api/get",{
            method: "GET"
        })
        const getresponse: cluster_cliente[] = await get.json()
        const newcli: cluster_cliente | undefined = getresponse.find((c: cluster_cliente)=>{
            if(c.id===id)return true
            return false
        })

        
        if(newcli){
            setnewdata(newcli)
        }
        
        
        window.location.reload();
    }
    const reactivatec = async ()=>{
        const cliente: Cliente = {
            id_cliente: id,
            Nombre: nombre,
            Apellidos: apellidos,
            DNI: DNI,
            Telefono: Telefono,
            CP: Cp,
            Direccion: Direcion,
            Correo: Correp,
            Empresa: Empresa,
            Fecha_Alta:  newdata.v_actual!.Fecha_Alta,
            Fecha_Baja: newdata.v_actual!.Fecha_Baja,
            Activo: 1
        }
        
        
        const put = await fetch("/api/get",{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cliente),
        })
        const get = await fetch("/api/get",{
            method: "GET"
        })
        const getresponse: cluster_cliente[] = await get.json()
        const newcli: cluster_cliente | undefined = getresponse.find((c: cluster_cliente)=>{
            if(c.id===id)return true
            return false
        })

        
        if(newcli){
            setnewdata(newcli)
        }
        
        
        window.location.reload();
    }
    const change_v = (cli: string)=>{
        
        

        const c: Cliente = JSON.parse(cli)
        const cluster: cluster_cliente = {
            id: id!,
            v_actual: c,
            v_anteriores: newdata.v_anteriores
        }
        setnewdata(cluster)
    }
        if(!activos && data.v_actual?.Activo===1){

            let it =0
            return(
                <li  class={clas}>
                                <p>ID:  {newdata.v_actual!.id_cliente && newdata.v_actual!.id_cliente}</p>
                                <p>Nombre: {newdata.v_actual!.Nombre && newdata.v_actual!.Nombre}</p>
                                <p>Apellidos: {newdata.v_actual!.Apellidos &&newdata.v_actual!.Apellidos}</p>
                                <p>DNI:  {newdata.v_actual!.DNI &&newdata.v_actual!.DNI}</p>
                                <p>Telefono:  {newdata.v_actual!.Telefono &&newdata.v_actual!.Telefono}</p>
                                <p>Correo: {(newdata.v_actual!.Correo!=="null" && newdata.v_actual!.Correo) &&newdata.v_actual!.Correo}</p>
                                <p>Direccion: {(newdata.v_actual!.Direccion!=="null" && newdata.v_actual!.Direccion) &&newdata.v_actual!.Direccion}</p>
                                {newdata.v_actual!.Empresa===0 && <p>Empresa: No</p>}
                                {newdata.v_actual!.Empresa===1 && <p>Empresa: Si</p>}
                                <p>CP: {newdata.v_actual!.CP &&newdata.v_actual!.CP}</p>
                                <label for="Version:">Version:</label>
                                <select value={JSON.stringify(newdata.v_actual)} label="Version:" onChange={(e)=>{change_v(e.currentTarget.value)}}> 
                                   {data.v_anteriores.length>0 && data.v_anteriores.map((v: Cliente)=>{                                    
                                    return (<option value={JSON.stringify(v)}>V-{it++}: {v.Fecha_mod}</option>)
                                   })}
                                </select>
                                <p>Alta: {newdata.v_actual!.Fecha_Alta && newdata.v_actual!.Fecha_Alta}</p>
                                <p>Modificacion:  {newdata.v_actual!.Fecha_mod!=="0" && newdata.v_actual!.Fecha_mod}</p>
                                <p>Baja: {newdata.v_actual!.Fecha_Baja!=="0" &&newdata.v_actual!.Fecha_Baja}</p>
                               
                                {activo===1 && <button type="submit" onClick={(e)=>{deletec()}}> Desactivar</button>}
                                
                </li>
            )   
        }else if(activos){
            let it =0
            return(
                <li  class={clas}>
                                <p>ID:  {newdata.v_actual!.id_cliente && newdata.v_actual!.id_cliente}</p>
                                <p>Nombre: {newdata.v_actual!.Nombre && newdata.v_actual!.Nombre}</p>
                                <p>Apellidos: {newdata.v_actual!.Apellidos &&newdata.v_actual!.Apellidos}</p>
                                <p>DNI:  {newdata.v_actual!.DNI &&newdata.v_actual!.DNI}</p>
                                <p>Telefono:  {newdata.v_actual!.Telefono &&newdata.v_actual!.Telefono}</p>
                                <p>Correo: {(newdata.v_actual!.Correo!=="null" && newdata.v_actual!.Correo) &&newdata.v_actual!.Correo}</p>
                                <p>Direccion: {(newdata.v_actual!.Direccion!=="null" && newdata.v_actual!.Direccion) &&newdata.v_actual!.Direccion}</p>
                                {newdata.v_actual!.Empresa===0 && <p>Empresa: No</p>}
                                {newdata.v_actual!.Empresa===1 && <p>Empresa: Si</p>}
                                <p>CP: {newdata.v_actual!.CP &&newdata.v_actual!.CP}</p>
                                <label for="Version:">Version:</label>
                                <select value={JSON.stringify(newdata.v_actual)} label="Version:" onChange={(e)=>{change_v(e.currentTarget.value)}}> 
                                   {data.v_anteriores.length>0 && data.v_anteriores.map((v: Cliente)=>{                                    
                                    return (<option value={JSON.stringify(v)}>V-{it++}: {v.Fecha_mod}</option>)
                                   })}
                                </select>
                                <p>Alta: {newdata.v_actual!.Fecha_Alta && newdata.v_actual!.Fecha_Alta}</p>
                                <p>Modificacion:  {newdata.v_actual!.Fecha_mod!=="0" && newdata.v_actual!.Fecha_mod}</p>
                                <p>Baja: {newdata.v_actual!.Fecha_Baja!=="0" &&newdata.v_actual!.Fecha_Baja}</p>
                               
                                {activo===1 && <button type="submit" onClick={(e)=>{deletec()}}> Desactivar</button>}
                                {activo===0 && <button type="submit" onClick={(e)=>{reactivatec()}}> Re-Activar</button>}
                                
                </li>
            )
        }

}