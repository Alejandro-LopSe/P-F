import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";

export const CustomHeader: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div>
            <img src="" alt="" />
            <p>{state.user}</p>
            <form action="/login">
                <Logout></Logout>
            </form>
        </div>
    );
};
