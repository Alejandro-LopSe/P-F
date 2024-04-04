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
  Fecha_Alta?:  string; 
  Fecha_Baja?: string; 
  Fecha_mod?: string; 
  Activo: 0 | 1;
}

export type mysql_Cliente = {
  results: Cliente[]
  flieds: []
}

export type cluster_cliente = {
  id: number
  v_actual?: Cliente
  v_anteriores: Cliente[]
}

