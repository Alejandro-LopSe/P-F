import { FunctionalComponent } from "preact";
import { state } from "../types.ts";

export const Logout: FunctionalComponent = () => {
    const logout = () => {
        document.cookie = "auth= ; Max-Age=0,1;";
    };
    return (
        <>
            <button
                type="submit"
                onClick={() => {
                    logout();
                }}
            >
                Cerrar Sesion
            </button>
        </>
    );
};
