import { useState } from "preact/hooks";
import { FunctionalComponent, JSX } from "preact";

export const AddCliente: FunctionalComponent = () => {
    const [nombre, nombremod] = useState<string>("");
    const [apellidos, apellidosmod] = useState<string>("");
    const [dni, dnimod] = useState<string>("");
    const [tlf, tlfmod] = useState<number>();
    const [cp, cpmod] = useState<number>();
    const [dir, dirmod] = useState<string>("");
    const [correo, correomod] = useState<string>("");
    const [empresa, empresamod] = useState<number>(0);

    const [disabled, disabledmod] = useState<boolean>(true);

    const [error, errormod] = useState<string>("");

    const check = () => {
        if (nombre && apellidos) {
            disabledmod(false);
        } else if (disabled === false) disabledmod(true);
    };

    check();
    const añadir = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();
        const body = {
            nombre: nombre,
            apellidos,
            dni,
            tlf,
            cp,
            dir,
            correo,
            empresa,
        };
        const exist = await fetch("http://localhost:8000/Api/checkCliente", {
            method: "PUT",
            headers: { "content-type": "apliccation/json" },
            body: JSON.stringify(body),
        });
        const res = await exist.text();
        if (res.includes("Error")) {
            errormod(res);
        }
        errormod(res);
    };
    return (
        <div class="login">
            <a class="return" href="/">Volver</a>
            <p>Añadir Cliente</p>
            <form action="/Clientes/Añadir" method="post" onSubmit={añadir}>
                <label for="nombre">*Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    onInput={(e) => {
                        nombremod(e.currentTarget.value);
                    }}
                >
                </input>
                <label for="apellidos">*Apellidos:</label>
                <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    onInput={(e) => {
                        apellidosmod(e.currentTarget.value);
                    }}
                >
                </input>
                <label for="DNI">DNI:</label>
                <input
                    type="text"
                    name="DNI"
                    id="DNI"
                    onInput={(e) => {
                        dnimod(e.currentTarget.value);
                    }}
                >
                </input>
                <label for="TLF">Telefono:</label>
                <input
                    type="text"
                    name="TLF"
                    id="TLF"
                    onInput={(e) => {
                        tlfmod(parseInt(e.currentTarget.value));
                    }}
                >
                </input>
                <label for="CP">CP:</label>
                <input
                    type="text"
                    name="CP"
                    id="CP"
                    onInput={(e) => {
                        cpmod(parseInt(e.currentTarget.value));
                    }}
                >
                </input>
                <label for="DIR">Direccion:</label>
                <input
                    type="text"
                    name="DIR"
                    id="DIR"
                    onInput={(e) => {
                        dirmod(e.currentTarget.value);
                    }}
                >
                </input>
                <label for="correo">Correo:</label>
                <input
                    type="text"
                    name="correo"
                    id="correo"
                    onInput={(e) => {
                        correomod(e.currentTarget.value);
                    }}
                >
                </input>
                <label for="empresa">Empresa:</label>
                <select
                    name="empresa"
                    value={0}
                    onChange={(e) => {
                        empresamod(parseInt(e.currentTarget.value));
                    }}
                >
                    <option value={0}>No</option>
                    <option value={1}>Si</option>
                </select>
                <button type="submit" disabled={disabled}>Añadir</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};
