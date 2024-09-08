import { FunctionComponent } from "preact";

import { useState } from "preact/hooks";

export const Login: FunctionComponent = () => {
  const [user, setuser] = useState<string>("Admin");
  const [_pass, setpass] = useState<string>("");
  const [error, seterror] = useState<string>("");

  return (
    <div class="login">
      <form action="/" method="post">
        <select
          name="usuario"
          value={user}
          onClick={(e) => {
            setuser(e.currentTarget.value);
          }}
        >
          <option value="Admin">Admin</option>
          <option value="Esperanza">Esperanza</option>
          <option value="Angel">Angel</option>
          <option value="Jose">Jose</option>
        </select>
        <input
          name="password"
          placeholder="Contraseña"
          onBlur={(e) => {
            setpass(e.currentTarget.value);
            seterror("");
          }}
        >
        </input>
        <button type="submit" disabled={false}>
          Log-in
        </button>
        {error && error}
      </form>
    </div>
  );
};
