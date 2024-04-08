import { FunctionComponent } from "preact";

import { useState } from "preact/hooks";
import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal } from "@preact/signals";


const Login: FunctionComponent<{loged?: Signal<boolean>}> = ({loged}) => {
  const [user,setuser] =useState<string>("Admin")
  const [pass,setpass] =useState<string>("")
  const [error,seterror] =useState<string>("")
  
  
  const check = async (e:JSX.TargetedEvent<HTMLButtonElement, Event>)=>{
    if(pass===""){

      seterror("Introduce la contraseña.")
      return
      
    }
    if(error===""){
      const c = await fetch("/api/loger",{
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({usuario: user, password: pass})
      })
     
      seterror("1")
      
      return 
    }
  }
  //to get token on client console.log("-------document----",IS_BROWSER && document.cookie);
  if(!loged){
    return (
      <div class="login">
        <form action="/" method="post" >
          <select name="usuario"  value ={user} onChange={(e)=>{setuser(e.currentTarget.value)}}>
              <option value="Admin">Admin</option>
              <option value="Espe">Esperanza</option>
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
