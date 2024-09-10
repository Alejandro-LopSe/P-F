import { FunctionalComponent } from "preact";

export const Login: FunctionalComponent = () => {
    return (
        <div>
            <p>BIENVENIDO</p>
            <form action="/login" method="post">
                <label for="usuario">Usuario</label>
                <select name="usuario" id="usuario">
                    <option value="Admin">Admin</option>
                    <option value="Espe">Espe</option>
                    <option value="Angel">Angel</option>
                    <option value="Jose">Jose</option>
                </select>
                <label for="contrasena">Contraseña</label>
                <input type="password" name="contrasena" id="contrasena" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};
