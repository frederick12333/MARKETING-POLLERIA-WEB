import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({ providedIn: 'root' })
export class CategoriasService {

  private categorias: Categoria[] = [
    { id: 'cat-1', nombre: 'Pollos',  icono: 'bi-egg-fried',   orden: 1 },
    { id: 'cat-2', nombre: 'Combos',  icono: 'bi-bag-heart',   orden: 2 },
    { id: 'cat-3', nombre: 'Bebidas', icono: 'bi-cup-straw',   orden: 3 },
  ];

  getAll(): Observable<Categoria[]> {
    return of([...this.categorias]);
  }

  getById(id: string): Observable<Categoria | undefined> {
    return of(this.categorias.find(c => c.id === id));
  }

  add(categoria: Categoria) {
    this.categorias.push(categoria);
  }

  update(categoria: Categoria) {
    const idx = this.categorias.findIndex(c => c.id === categoria.id);
    if (idx !== -1) this.categorias[idx] = categoria;
  }

  delete(id: string) {
    this.categorias = this.categorias.filter(c => c.id !== id);
  }
}