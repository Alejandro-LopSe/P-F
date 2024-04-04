// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $Clientes_layout from "./routes/Clientes/_layout.tsx";
import * as $Clientes_add from "./routes/Clientes/add.tsx";
import * as $Clientes_deactivate from "./routes/Clientes/deactivate.tsx";
import * as $Clientes_index from "./routes/Clientes/index.tsx";
import * as $Pedidos_layout from "./routes/Pedidos/_layout.tsx";
import * as $Pedidos_index from "./routes/Pedidos/index.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_get from "./routes/api/get.ts";
import * as $api_handler from "./routes/api/handler.ts";
import * as $api_loger from "./routes/api/loger.ts";
import * as $index from "./routes/index.tsx";
import * as $Addcliente from "./islands/Addcliente.tsx";
import * as $Clientes from "./islands/Clientes.tsx";
import * as $DeactivateCliente from "./islands/DeactivateCliente.tsx";
import * as $Desactivar from "./islands/Desactivar.tsx";
import * as $Login from "./islands/Login.tsx";
import * as $VersionCliente from "./islands/VersionCliente.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/Clientes/_layout.tsx": $Clientes_layout,
    "./routes/Clientes/add.tsx": $Clientes_add,
    "./routes/Clientes/deactivate.tsx": $Clientes_deactivate,
    "./routes/Clientes/index.tsx": $Clientes_index,
    "./routes/Pedidos/_layout.tsx": $Pedidos_layout,
    "./routes/Pedidos/index.tsx": $Pedidos_index,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/get.ts": $api_get,
    "./routes/api/handler.ts": $api_handler,
    "./routes/api/loger.ts": $api_loger,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Addcliente.tsx": $Addcliente,
    "./islands/Clientes.tsx": $Clientes,
    "./islands/DeactivateCliente.tsx": $DeactivateCliente,
    "./islands/Desactivar.tsx": $Desactivar,
    "./islands/Login.tsx": $Login,
    "./islands/VersionCliente.tsx": $VersionCliente,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
