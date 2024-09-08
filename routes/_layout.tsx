import { FreshContext, PageProps } from "$fresh/server.ts";

import { Menu } from "../components/Menu.tsx";
import { state } from "../types.ts";

export default function Layout(
  props: PageProps<unknown, state>,
) {
  return (
    <>
      <Menu state={props.state} />
      <props.Component />
    </>
  );
}
