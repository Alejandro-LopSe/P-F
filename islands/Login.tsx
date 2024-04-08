import { FunctionComponent } from "preact";

import { useState } from "preact/hooks";
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal } from "@preact/signals";


const Login: FunctionComponent<{loged?: string}> = ({loged}) => {
  const [user,setuser] =useState<string>("Admin")
  const [pass,setpass] =useState<string>("")
  const [error,seterror] =useState<string>("")
  
 
  //to get token on client console.log("-------document----",IS_BROWSER && document.cookie);
  if(!loged){
    return (
      <div class="login">
        <form action="/" method="post" >
          <select name="usuario"  value ={user} onClick={(e)=>{setuser(e.currentTarget.value)}}>
              <option value="Admin">Admin</option>
              <option value="Esperanza">Esperanza</option>
              <option value="Angel">Angel</option>
              <option value="Jose">Jose</option>   
          </select>    
          <input name="password" placeholder="Contraseña" onBlur={(e)=>{setpass(e.currentTarget.value); seterror(""); }}></input>
          <button type="submit" disabled={false} onClick={ (e)=>{}}>Log-in</button>
          {error && error}
          
      
        </form>
      </div>
    );
  }else{

  return (
    <></>
  );
  }
};

export default Login;
