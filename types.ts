//------------------------------------------TYPES DATABASE-----------------------------------------------
export type Cliente = {
  id_cliente?: number;
  Nombre: string;
  Apellidos: string;
  DNI?: string;
  Telefono?: number;
  CP?: number;
  Direccion?: string;
  Correo?: string;
  Empresa: number;
  Fecha_Alta?: string;
  Fecha_Baja?: string;
  Fecha_mod?: string;
  Activo: 0 | 1;
};
export type Articulo = {
  id_articulo: string;
  nombre: string;
  tamano: Tamaños;
  tipo_aceite: Aceite;
  envase: Envase;
  cantidad: number | 1;
  precio: number;
};
export type Pedido = {
  id_pedido: number;
  id_cliente: number;
  ano_fiscal: string;
  mes: number;
  id_empleado: number;
  estado: Estado;
  envio: Envio;
  pago_total: number;
  notas: string;
};
export type Reserva = {
  id_reserva: number;
  id_articulo?: number;
  id_pedido: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

export type User = {
  id_usuario: number;
  user: string;
  pass: string;
};

/*------------------------------------------TYPES TS-----------------------------------------------*/

export type mysql_Cliente = {
  results: Cliente[];
  flieds: [];
};

export type cluster_cliente = {
  id: number;
  v_actual?: Cliente;
  v_anteriores: Cliente[];
};

export type Cookie = {
  key: string;
  value: string;
};

export type state = {
  id_usuario: number;
  user: string;
};

export type Pedido_ts = {
  id_pedido: number;
  id_cliente: number;
  ano_fiscal: string;
  mes: number;
  id_empleado: number;
  estado: Estado;
  envio: Envio;
  pago_total: number;
  notas?: string;
  //-------------------
  articulos: [Articulo];
};
export type addpedido = {
  pedidos: Pedido[];
  clientes: Cliente[];
};
export type Reservaspedido = {
  pedidos: Pedido;
  clientes: Cliente;
  articulos: Articulo[];
};

/*------------------------------------------ENUMS-----------------------------------------------*/

export enum Tamaños {
  L5 = "5 Litros",
  L2 = "2 Litros",
  "L0.5" = "0.5 Litros",
  "L0.25" = "0.25 Litros",
}
export enum Aceite {
  MAD = "Madroñal",
  DO = "Molino",
}
export enum Envase {
  PLASTICO = "Botella",
  LATA = "Lata",
  CRISTAL = "Botella Cristal",
  CAJA_PLASTICO = "Caja de Botellas",
  CAJA_LATA = "Caja de Latas",
  CAJA_CRISTAL = "Caja de Botellas Cristal",
}
export enum Estado {
  PENDIENTE = "PENDIENTE",
  PENDIENTE_PAGO = "PENDIENTE_PAGO",
  FINALIZADO = "FINALIZADO",
}
export enum Envio {
  RECOGIDA = "RECOGIDA",
  ENVIO = "ENVIO",
  LLEVAR = "LLEVAR",
}
