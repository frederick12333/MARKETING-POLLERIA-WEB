export interface Promocion {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  activa: boolean;
  fechaInicio?: string;
  fechaFin?: string;
}