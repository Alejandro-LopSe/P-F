import { FunctionComponent } from "preact";
import Registrar from "../components/Registrar.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact";


const Login: FunctionComponent<{loged: boolean}> = ({loged}) => {
  const [user,setuser] =useState<string>("Admin")
  const [pass,setpass] =useState<string>("")
  const [error,seterror] =useState<string>("")

  
  const check = async (e:JSX.TargetedEvent<HTMLButtonElement, Event>)=>{
    if(pass===""){

      seterror("Introduce la contraseña.")
      return
    }
    if(error===""){
      await fetch("/api/loger",{
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
    <div>
        <select name="usuario"  value ="Admin" onChange={(e)=>{setuser(e.currentTarget.value)}}>
            <option value="Admin">Admin</option>
            <option value="Espe">Esperanza</option>
            <option value="Angel">Angel</option>
            <option value="Jose">Jose</option>   
        </select>    
        <input name="password" placeholder="Contraseña" onBlur={(e)=>{setpass(e.currentTarget.value); seterror(""); }}></input>
        <button type="button" disabled={false} onClick={async (e)=>{await check(e)}}>Log-in</button>
        {error && error}

    </div>
  );
  }else{

  return (
    <></>
  );
  }
};

export default Login;
