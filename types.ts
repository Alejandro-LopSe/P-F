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
  tamaño: Tamaños;
  aceite: Aceite;
  envase: Envase;
  Precio_ud: number;
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
  id_articulo: number;
  id_pedido: number;
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

/*------------------------------------------ENUMS-----------------------------------------------*/

export enum Tamaños {
  L5 = "L5",
  L2 = "L2",
  L05 = "L0.5",
  L025 = "L0.25",
}
export enum Aceite {
  MAD = "MAD",
  DO = "DO",
}
export enum Envase {
  PLASTICO = "PLASTICO",
  LATA = "LATA",
  CRISTAL = "CRISTAL",
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
