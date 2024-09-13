import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import jwt from "jsonwebtoken";
import { CustomHeader } from "../../components/CustomHeader.tsx";
import { state } from "../../types.ts";

export default function Home(props: PageProps<unknown, state>) {
    return (
        <>
            <CustomHeader state={props.state}></CustomHeader>
        </>
    );
}
