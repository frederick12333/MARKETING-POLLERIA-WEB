export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: string;
  imagen: string;
  disponible: boolean;
  destacado?: boolean;
  incluye?: string[];   // Ej: ["Papas", "Ensalada", "Cremas"]
}