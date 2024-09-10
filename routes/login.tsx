import { FreshContext, Handlers } from "$fresh/server.ts";
import { Login } from "../components/Login.tsx";
import { db } from "../DB/SQLConnection.ts";
import jwt from "jsonwebtoken";

export const handler: Handlers = {
    POST: async (req: Request, ctx: FreshContext) => {
        try {
            const form = await req.formData();
            const usuario = form.get("usuario");
            const contrasena = form.get("contrasena");

            const check = await db?.query(
                `SELECT * FROM usuarios WHERE Nombre='${usuario}' AND Password=${contrasena}`,
            );
            console.log("LOGIN 15: ", check![0]);
            //@ts-expect-errora
            const user = check![0][0];
            if (user) {
                const token = jwt.sign(JSON.stringify(user), "secreto");
                console.log("Token: ", token);
                const headers = new Headers({
                    "Set-Cookie": `auth=${token}`,
                    location: "/portal",
                });

                ctx.state = { user: user.Nombre, id_usuario: user.id_usuario };
                return new Response("", {
                    headers,
                    status: 302,
                });
            }
            return ctx.render();
        } catch (error) {
            console.log(error);

            return ctx.render();
        }
    },
};
export default function Home() {
    return <Login></Login>;
}
