import { FunctionComponent } from "preact";

type MenuProps2 = {
  selected: "Clientes" | "Añadir" | "Desactivar";
};
const Registrar: FunctionComponent = () => {

  
  return (
    <>
    <form action="/">
        <select onChange={(e)=>{}}>

            <option value="Admin">Admin</option>
            <option value="Espe">Esperanza</option>
            <option value="Angel">Angel</option>
            <option value="Jose">Jose</option>   
             
        </select>    
    </form>
    </>
  );
};

export default Registrar;
