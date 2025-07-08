import { cliente_filtro, cluster_cliente, Cookie } from "./types.ts";
import { Cliente } from "./types.ts";

export const getdate = (date: Date): string => {
  const year = horas(date.getFullYear());
  const month = horas(date.getMonth() + 1);
  const day = horas(date.getDate());
  const hour = horas(date.getHours());
  const minute = horas(date.getMinutes());
  const second = horas(date.getSeconds());

  return `${year}/${month}/${day}  Hora->${hour}:${minute}:${second}`;
};

export const horas = (value: number): string => {
  if (value < 10) {
    return `0${value}`;
  } else {
    return `${value}`;
  }
};

export const clmap = (data: Cliente[]): cluster_cliente[] => {
  const clients_formated: cluster_cliente[] = data.reduce(
    (acc: cluster_cliente[], cl: Cliente) => {
      const existe: boolean = acc.some((clu: cluster_cliente) => {
        if (clu.id === cl.id_cliente) {
          return true;
        } else {
          return false;
        }
      });

      if (existe) {
        acc.forEach((cluster: cluster_cliente) => {
          if (cl.id_cliente === cluster.id) {
            if (cl.Activo === 1) {
              cluster.v_actual = cl;
              cluster.v_anteriores.push(cl);
            } else {
              cluster.v_anteriores.push(cl);
            }
          }
        });
        return [...acc];
      } else {
        const cluster: cluster_cliente = {
          id: cl.id_cliente!,
          v_actual: cl,
          v_anteriores: [cl],
        };
        return [...acc, cluster];
      }
    },
    [],
  );

  return clients_formated;
};
export const clmap1 = (data: Cliente[]): cluster_cliente => {
  const cluster: cluster_cliente = {
    id: 0,
    v_anteriores: [],
  };
  data.forEach((cl: Cliente) => {
    if (cl.Activo === 1) {
      cluster.v_actual = cl;
    }
    cluster.v_anteriores.push(cl);
  });

  return cluster;
};
export const Expiredate = () => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 10);
  return date;
};

export const cookie_to_json = (raw_cookie: string): Cookie[] => {
  const cookies_raw = raw_cookie.split("; ");
  const cookies: Cookie[] = cookies_raw.map((elem: string) => {
    const cookie = elem.split("=");
    return { key: cookie[0], value: cookie[1] };
  });
  return cookies;
};

export const check_cliente = (
  cliente: Cliente,
  filtros: cliente_filtro,
): boolean => {
  const n = cliente.Nombre || "";
  const a = cliente.Apellidos || "";
  const d = cliente.DNI || "";
  const t = cliente.Telefono?.toString() || "";
  const c = cliente.CP?.toString() || "";
  const dir = cliente.Direccion || "";
  const co = cliente.Correo || "";
  const em = cliente.Empresa_Nombre || "";

  return (
    ((filtros.Nombre == undefined
      ? true
      : n.toLowerCase().includes(filtros.Nombre.toLowerCase())) ||
      (filtros.Nombre == undefined
        ? true
        : a.toLowerCase().includes(filtros.Nombre.toLowerCase()))) &&
    (filtros.DNI == undefined
      ? true
      : d.toLowerCase().includes(filtros.DNI.toLowerCase())) &&
    (filtros.Telefono == undefined
      ? true
      : t.toLowerCase().includes(filtros.Telefono.toLowerCase())) &&
    (filtros.CP == undefined
      ? true
      : c.toLowerCase().includes(filtros.CP.toLowerCase())) &&
    (filtros.Direccion == undefined
      ? true
      : dir.toLowerCase().includes(filtros.Direccion.toLowerCase())) &&
    (filtros.Correo == undefined
      ? true
      : co.toLowerCase().includes(filtros.Correo.toLowerCase())) &&
    (filtros.Empresa == "10"
      ? true
      : filtros.Empresa == "0"
      ? em == ""
      : filtros.Empresa == "1"
      ? em != ""
      : false)
  );
};
