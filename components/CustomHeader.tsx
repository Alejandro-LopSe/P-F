import { FunctionalComponent } from "preact";
import { state } from "../types.ts";
import { Logout } from "../islands/Logout.tsx";

export const CustomHeader: FunctionalComponent<{ state: state }> = (
    { state },
) => {
    return (
        <div class="customheader">
            <div class="user">
                <img src="/userimg.png" alt="" />
                <p>{state.user}</p>
            </div>
            <form class="formm" action="/login">
                <Logout></Logout>
            </form>
        </div>
    );
};
