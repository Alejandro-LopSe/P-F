import { FunctionComponent } from "preact";
import {Cliente} from "../types.ts"
import { useState } from "preact/hooks";
import { cluster_cliente } from "../types.ts";
import { clmap, clmap1 } from "../funciones.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Login from "./Login.tsx";
import { Signal } from "@preact/signals";


export const VersionCliente: FunctionComponent<{data: cluster_cliente, activos: boolean, signal: Signal<number>}>= ({data,activos,signal})=>{
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
    const [error,seterror ]=useState<string>("")
    let clas ="inactivo"
    if(activo===1){
        clas="activo"
    }
    const check  = ()=>{
        if(IS_BROWSER && document.cookie===""){
            console.log(signal);
            
        }
    }
    check()
    const checkifchange=(a: Cliente,b:Cliente)=>{
        const values_a= Object.values(a)
        const values_b= Object.values(b)

        const chequer = values_a.some((elem,index)=>{

            if(index===9)return true
            if(elem===values_b.at(index))return false
            return false
        })


        console.log(chequer);
        
        return chequer
    }

    const modify = async ()=>{

        check()
        const cliente: Cliente = {
            id_cliente: id,
            Nombre: nombre,
            Apellidos: apellidos,
            DNI: DNI,
            Telefono: Telefono|| 1,
            CP: Cp || 1,
            Direccion: Direcion,
            Correo: Correp,
            Empresa: Empresa,
            Fecha_Alta:  newdata.v_actual!.Fecha_Alta,
            Fecha_Baja: "0",
            Activo: 1
        }
        const checks = checkifchange(cliente,newdata!.v_actual!)

        
        if(checks){
            setenable(!enable)
            return
        }
        const put = await fetch("/api/get",{
            method: "PUT",
            headers: {"Content-Type": "application/json",
            Location: "/Clientes"},
            body: JSON.stringify(cliente),
        })
        const x: Cliente[] = await put.json();
        
        const getresponse: cluster_cliente = clmap1(x)


        
        setnewdata(getresponse)


        
        return
    }
    const change_v = (cli: string)=>{
        
        
        check()
        const c: Cliente = JSON.parse(cli)
        const cluster: cluster_cliente = {
            id: id!,
            v_actual: c,
            v_anteriores: newdata.v_anteriores
        }
        setnewdata(cluster)
    }


        if(activos || activo){
            if(enable){
                let it =0
                return(
                    <li  class={clas}>
                                    <p>ID:  {newdata.v_actual!.id_cliente && newdata.v_actual!.id_cliente}</p>
                                    <p>Nombre: {newdata.v_actual!.Nombre && newdata.v_actual!.Nombre}</p>
                                    <p>Apellidos: {newdata.v_actual!.Apellidos &&newdata.v_actual!.Apellidos}</p>
                                    <p>DNI:  {newdata.v_actual!.DNI &&newdata.v_actual!.DNI}</p>
                                    <p>Telefono:  {newdata.v_actual!.Telefono && newdata.v_actual!.Telefono!==1 && newdata.v_actual!.Telefono }</p>
                                    <p>Correo: {(newdata.v_actual!.Correo!=="null" && newdata.v_actual!.Correo) &&newdata.v_actual!.Correo}</p>
                                    <p>Direccion: {(newdata.v_actual!.Direccion!=="null" && newdata.v_actual!.Direccion) &&newdata.v_actual!.Direccion}</p>
                                    {newdata.v_actual!.Empresa===0 && <p>Empresa: No</p>}
                                    {newdata.v_actual!.Empresa===1 && <p>Empresa: Si</p>}
                                    <p>CP: {newdata.v_actual!.CP && newdata.v_actual!.CP!==1 && newdata.v_actual!.CP}</p>
                                    <label for="Version:">Version:</label>

                                    <select value={JSON.stringify(newdata.v_actual)} label="Version:" onChange={(e)=>{change_v(e.currentTarget.value)}}> 
                                        <option value={JSON.stringify(newdata.v_actual!)}>V-{"Last"}: {newdata.v_actual!.Fecha_mod}</option>
                                    {data.v_anteriores.length>0 && data.v_anteriores.map((v: Cliente)=>{
                                    
                                        return (<option value={JSON.stringify(v)}>V-{it++}: {v.Fecha_mod}</option>)
                                    })}
                                    </select>
                                    <p>Alta: {newdata.v_actual!.Fecha_Alta && newdata.v_actual!.Fecha_Alta}</p>
                                    <p>Modificacion:  {newdata.v_actual!.Fecha_mod!=="0" && newdata.v_actual!.Fecha_mod}</p>
                                    <p>Baja: {newdata.v_actual!.Fecha_Baja!=="0" &&newdata.v_actual!.Fecha_Baja}</p>
                                
                                {activo===1 && <button type="button" onClick={(e)=>{check(); setenable(!enable)}}> Modificar</button>}
                    </li>
                )
            }else{ 
                return(
                    <li class={clas}>
                        <p>ID:  {newdata.v_actual!.id_cliente && newdata.v_actual!.id_cliente}</p>
                        <p>Nombre: {newdata.v_actual!.Nombre && newdata.v_actual!.Nombre}</p>
                        <p>Apellidos: {newdata.v_actual!.Apellidos && newdata.v_actual!.Apellidos}</p>
                        <p>DNI:  <input type="dni" value={DNI} onBlur={(e)=>{setdni(e.currentTarget.value)}}/></p>
                        <p>Telefono:  <input type="telefono" value={Telefono} onBlur={(e)=>{settel(parseInt(e.currentTarget.value))}}/></p>
                        <p>Correo:  <input type="correo" value={Correp} onBlur={(e)=>{setcorrep(e.currentTarget.value)}}/></p>
                        <p>Direccion:  <input type="direccion" value={Direcion} onBlur={(e)=>{setdir(e.currentTarget.value)}}/></p>
                        <p>Empresa:  
                            <select type="empresa" value={Empresa} onChange={(e)=>{setem(parseInt(e.currentTarget.value))}} >
                                <option value="1">Si</option>
                                <option value="0">No</option>
                            </select></p>
                        <p>CP:  <input type="cp" value={Cp} onBlur={(e)=>{setcp(parseInt(e.currentTarget.value))}}/></p>
        
                        {document.cookie!=="" && <button type="button" onClick={async (e)=>{await modify()}}> Listo</button>}
                        {document.cookie=="" && <form action="/"><button type="submit" class={clas}> Listo</button></form>}
                        {error && error}
                    </li>
                )
            }
        }else{return<></>}

    

}