import { FunctionComponent } from "preact";
import {Cliente} from "../types.ts"

import { cluster_cliente } from "../types.ts";
import { VersionCliente } from "./VersionCliente.tsx";
import { useState } from "preact/hooks";


export const Clientes: FunctionComponent<{data: cluster_cliente[]}>= ({data})=>{
    const[activos,setact] =useState<boolean>(false)

    return(
        <div class="clientes">
            <div class="check"> 
                <input type="checkbox" checked={activos} onClick={(e)=>{setact(e.currentTarget.checked) }}/>Incluir no activos.
            </div>
            <ul>
                {data && data.map((cl: cluster_cliente)=>{
                    return(
                        <VersionCliente data={cl} activos={activos}></VersionCliente>
                    )
                })}
            </ul>
        </div>
    )

}