import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({ providedIn: 'root' })
export class ClientesService {

  private clientes: Cliente[] = [
    { id: 'cli-1', nombre: 'María García',   correo: 'maria@gmail.com',   celular: '987654321', fechaRegistro: '2024-03-10' },
    { id: 'cli-2', nombre: 'Juan Pérez',     correo: 'juan@hotmail.com',  celular: '976543210', fechaRegistro: '2024-03-12' },
    { id: 'cli-3', nombre: 'Ana Torres',     correo: 'ana@gmail.com',     celular: '965432109', fechaRegistro: '2024-03-15' },
    { id: 'cli-4', nombre: 'Carlos Quispe',  correo: 'carlos@yahoo.com',  celular: '954321098', fechaRegistro: '2024-03-18' },
    { id: 'cli-5', nombre: 'Lucía Mamani',   correo: 'lucia@gmail.com',   celular: '943210987', fechaRegistro: '2024-03-20' },
  ];

  getAll(): Observable<Cliente[]> {
    return of([...this.clientes]);
  }

  getUltimos(cantidad: number = 5): Observable<Cliente[]> {
    return of([...this.clientes].reverse().slice(0, cantidad));
  }

  registrar(cliente: Omit<Cliente, 'id' | 'fechaRegistro'>): Observable<Cliente> {
    const nuevo: Cliente = {
      ...cliente,
      id: 'cli-' + Date.now(),
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    this.clientes.push(nuevo);
    return of(nuevo);
  }

  buscar(termino: string): Observable<Cliente[]> {
    const t = termino.toLowerCase();
    return of(this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(t) ||
      c.correo.toLowerCase().includes(t) ||
      c.celular.includes(t)
    ));
  }
}