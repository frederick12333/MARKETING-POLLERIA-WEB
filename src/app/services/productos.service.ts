import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  private productos: Producto[] = [
    {
      id: 'prod-1',
      nombre: '1/4 Pollo a la Brasa',
      descripcion: 'Cuarto de pollo dorado a la brasa con nuestro marinado secreto.',
      precio: 18.00,
      categoriaId: 'cat-1',
      imagen: 'assets/images/productos/cuarto-pollo.jpg',
      disponible: true,
      destacado: true,
      incluye: ['Papas fritas', 'Ensalada fresca', 'Crema huancaína', 'Ají especial']
    },
    {
      id: 'prod-2',
      nombre: '1/2 Pollo a la Brasa',
      descripcion: 'Medio pollo jugoso a la brasa, perfecto para dos personas.',
      precio: 32.00,
      categoriaId: 'cat-1',
      imagen: 'assets/images/productos/medio-pollo.jpg',
      disponible: true,
      destacado: true,
      incluye: ['Papas fritas', 'Ensalada fresca', 'Crema huancaína', 'Ají especial']
    },
    {
      id: 'prod-3',
      nombre: 'Pollo Entero a la Brasa',
      descripcion: 'Pollo entero a la brasa, ideal para toda la familia.',
      precio: 58.00,
      categoriaId: 'cat-1',
      imagen: 'assets/images/productos/pollo-entero.jpg',
      disponible: true,
      destacado: false,
      incluye: ['Papas fritas', 'Ensalada fresca', 'Crema huancaína', 'Ají especial', 'Pan']
    },
    {
      id: 'prod-4',
      nombre: 'Combo Familiar N°1',
      descripcion: 'Pollo entero + 2 porciones de papas extra + 2 bebidas 500ml.',
      precio: 72.00,
      categoriaId: 'cat-2',
      imagen: 'assets/images/productos/combo-familiar.jpg',
      disponible: true,
      destacado: true,
      incluye: ['Pollo entero', 'Papas extra', '2 Bebidas', 'Ensalada', 'Cremas']
    },
    {
      id: 'prod-5',
      nombre: 'Combo Pareja',
      descripcion: '1/2 Pollo + 2 porciones de papas + 2 bebidas 500ml.',
      precio: 45.00,
      categoriaId: 'cat-2',
      imagen: 'assets/images/productos/combo-pareja.jpg',
      disponible: true,
      destacado: true,
      incluye: ['1/2 Pollo', 'Papas fritas', '2 Bebidas', 'Ensalada', 'Cremas']
    },
    {
      id: 'prod-6',
      nombre: 'Combo Personal',
      descripcion: '1/4 Pollo + papas fritas + bebida 500ml.',
      precio: 24.00,
      categoriaId: 'cat-2',
      imagen: 'assets/images/productos/combo-personal.jpg',
      disponible: true,
      destacado: false,
      incluye: ['1/4 Pollo', 'Papas fritas', '1 Bebida', 'Ensalada', 'Crema']
    },
    {
      id: 'prod-7',
      nombre: 'Coca Cola 500ml',
      descripcion: 'Bebida refrescante Coca Cola personal.',
      precio: 5.00,
      categoriaId: 'cat-3',
      imagen: 'assets/images/productos/coca-cola.jpg',
      disponible: true,
      destacado: false
    },
    {
      id: 'prod-8',
      nombre: 'Inka Kola 500ml',
      descripcion: 'La bebida de sabor nacional, bien fría.',
      precio: 5.00,
      categoriaId: 'cat-3',
      imagen: 'assets/images/productos/inka-kola.jpg',
      disponible: true,
      destacado: false
    },
    {
      id: 'prod-9',
      nombre: 'Agua San Luis 625ml',
      descripcion: 'Agua mineral San Luis sin gas.',
      precio: 3.50,
      categoriaId: 'cat-3',
      imagen: 'assets/images/productos/agua.jpg',
      disponible: true,
      destacado: false
    },
    {
      id: 'prod-10',
      nombre: 'Chicha Morada 1L',
      descripcion: 'Chicha morada artesanal preparada con maíz morado y especias.',
      precio: 8.00,
      categoriaId: 'cat-3',
      imagen: 'assets/images/productos/chicha-morada.jpg',
      disponible: true,
      destacado: false
    }
  ];

  getAll(): Observable<Producto[]> {
    return of([...this.productos]);
  }

  getDestacados(): Observable<Producto[]> {
    return of(this.productos.filter(p => p.destacado && p.disponible));
  }

  getByCategoria(categoriaId: string): Observable<Producto[]> {
    return of(this.productos.filter(p => p.categoriaId === categoriaId && p.disponible));
  }

  getById(id: string): Observable<Producto | undefined> {
    return of(this.productos.find(p => p.id === id));
  }

  add(producto: Producto) {
    this.productos.push(producto);
  }

  update(producto: Producto) {
    const idx = this.productos.findIndex(p => p.id === producto.id);
    if (idx !== -1) this.productos[idx] = producto;
  }

  delete(id: string) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  toggleDisponible(id: string) {
    const p = this.productos.find(p => p.id === id);
    if (p) p.disponible = !p.disponible;
  }
}