import { FunctionComponent } from "preact";
import Registrar from "../components/Registrar.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact";


const Login: FunctionComponent<{loged?: string}> = ({loged}) => {
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
      return 
    }
  }
  if(!loged){

  return (
    <form action="/" method="post">
        <select name="usuario"  value ="Admin" onChange={(e)=>{setuser(e.currentTarget.value)}}>
            <option value="Admin">Admin</option>
            <option value="Espe">Esperanza</option>
            <option value="Angel">Angel</option>
            <option value="Jose">Jose</option>   
        </select>    
        <input name="password" placeholder="Contraseña" onBlur={(e)=>{setpass(e.currentTarget.value); seterror(""); }}></input>
        <button type="submit" disabled={false} onClick={async (e)=>{}}>Log-in</button>
        {error && error}
    
    </form>
  );
  }else{

  return (
    <></>
  );
  }
};

export default Login;
