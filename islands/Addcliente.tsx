
import { FunctionComponent, JSX } from "preact";
import {Cliente} from "../types.ts"
import { useState } from "preact/hooks";


export const Addcliente: FunctionComponent=  ()=>{
    const[activos,setact] =useState<boolean>(false)
    const [nombre,setnombre] = useState<string>("")
    const [apellidos,setapellidos] = useState<string>("")
    const [DNI,setdni] = useState<string | undefined>()
    const [Telefono,settel] = useState<number | undefined>()
    const [Corre0,setcorrep] = useState<string | undefined>()
    const [Direcion,setdir] = useState<string | undefined>()
    const [Empresa,setem] = useState<number>()
    const [Cp,setcp] = useState<number | undefined>()
    const [error,seterror ]=useState<string>("")
    const [sub,setsub] =useState<string>("2")

    const check = async () =>{
        const exist = await fetch(`/api/get?Nombre=${nombre}&Apellidos=${apellidos}`)
        const result: Cliente[] = await exist.json()
        
        if(result.length>0){
            seterror("ya existe el cliente")
            
        }else if(nombre==="" || nombre===undefined || apellidos==="" || apellidos===undefined){
            seterror("Debe tener nombre y apellidos.")
            
        }else{
            setsub("1")
        }
    }


    return(
        <div class="addclientes">
            <form action="/Clientes/add" method="post" >
                <p>Nombre: <input name="Nombre" onBlur={(e)=>{setnombre(e.currentTarget.value)}}> </input></p>
                <p>Apellidos:<input name="Apellidos" onBlur={(e)=>{setapellidos(e.currentTarget.value)}}> </input></p>
                <p>DNI:  <input name="DNI" onBlur={(e)=>{setdni(e.currentTarget.value)}}> </input></p>
                <p>Telefono:    <input name="Telefono" onBlur={(e)=>{settel(parseInt(e.currentTarget.value))}}> </input></p>
                <p>Correo:    <input name="Correo" onBlur={(e)=>{setcorrep(e.currentTarget.value)}}></input></p>
                <p> Direccion:    <input name="Direccion" onBlur={(e)=>{setdir(e.currentTarget.value)}}> </input></p>
                <p>CP:    <input name="CP" onBlur={(e)=>{setcp(parseInt(e.currentTarget.value))}}> </input></p>
                <p>Empresa:    <select name="Empresa" value= {Empresa} onBlur={(e)=>{setem(parseInt(e.currentTarget.value))}}> 
                    <option value="1">Si</option>
                    <option value="0">No</option>
                </select></p>
                    {sub === "2" && <button type="button" onClick={async (e)=>{await check()}}> comprobar</button>}
                    {sub === "1" && <button type="submit"> Añadir</button>}
            </form>
            {error && <p class="error">{error}</p>}
        </div>
    )

}