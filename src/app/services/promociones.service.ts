import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Promocion } from '../interfaces/promocion.interface';

@Injectable({ providedIn: 'root' })
export class PromocionesService {

  private promociones: Promocion[] = [
    {
      id: 'promo-1',
      titulo: '2x1 en Combos de Lunes a Miércoles',
      descripcion: 'Pide un combo para dos y llévate otro igual completamente gratis. Solo de lunes a miércoles hasta las 7pm.',
      imagen: 'assets/images/promociones/promo-2x1.jpg',
      activa: true,
      fechaInicio: '2024-01-01',
      fechaFin:    '2024-12-31'
    },
    {
      id: 'promo-2',
      titulo: 'Menú Ejecutivo S/.15.00',
      descripcion: '1/4 de pollo + papas + bebida + postre. De lunes a viernes de 12pm a 3pm.',
      imagen: 'assets/images/promociones/promo-menu.jpg',
      activa: true,
      fechaInicio: '2024-01-01',
      fechaFin:    '2024-12-31'
    },
    {
      id: 'promo-3',
      titulo: 'Combo Familiar de Fin de Semana',
      descripcion: 'Pollo entero + 3 papas extra + 4 bebidas + postre de la casa. Solo sábados y domingos.',
      imagen: 'assets/images/promociones/promo-familiar.jpg',
      activa: true,
      fechaInicio: '2024-01-01',
      fechaFin:    '2024-12-31'
    },
    {
      id: 'promo-4',
      titulo: 'Cumpleañero Come Gratis',
      descripcion: 'Si es tu cumpleaños, tu cuarto de pollo corre por nuestra cuenta. Presenta tu DNI.',
      imagen: 'assets/images/promociones/promo-cumple.jpg',
      activa: true
    }
  ];

  getAll(): Observable<Promocion[]> {
    return of([...this.promociones]);
  }

  getActivas(): Observable<Promocion[]> {
    return of(this.promociones.filter(p => p.activa));
  }

  add(promo: Promocion) {
    this.promociones.push(promo);
  }

  update(promo: Promocion) {
    const idx = this.promociones.findIndex(p => p.id === promo.id);
    if (idx !== -1) this.promociones[idx] = promo;
  }

  delete(id: string) {
    this.promociones = this.promociones.filter(p => p.id !== id);
  }
}