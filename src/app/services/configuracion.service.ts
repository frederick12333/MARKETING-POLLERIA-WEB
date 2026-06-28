import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configuracion } from '../interfaces/configuracion.interface';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {

  private config: Configuracion = {
    nombreNegocio:  'Pollería El Chino',
    direccion:      'Av. Los Próceres 456, Arequipa',
    telefono:       '054-123456',
    whatsapp:       '51999999999',
    correo:         'contacto@polleriaelchino.pe',
    facebook:       'https://facebook.com/polleriaelchino',
    instagram:      'https://instagram.com/polleriaelchino',
    horario:        'Lun - Dom: 11:00 am - 11:00 pm',
    googleMapsUrl:  'https://maps.google.com/?q=Arequipa',
    googleMapsEmbed:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30377.386647808956!2d-71.56299!3d-16.40904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a5db46e5a91%3A0xb0cffc90c1ab62b1!2sArequipa!5e0!3m2!1ses!2spe!4v1709000000000!5m2!1ses!2spe',
    logo:           'assets/images/logo.png'
  };

  private config$ = new BehaviorSubject<Configuracion>(this.config);

  getConfig() {
    return this.config$.asObservable();
  }

  getConfigSnapshot(): Configuracion {
    return this.config$.value;
  }

  updateConfig(nuevaConfig: Configuracion) {
    this.config$.next(nuevaConfig);
  }

  getWhatsappUrl(mensaje?: string): string {
    const numero = this.config$.value.whatsapp;
    const texto = mensaje ? encodeURIComponent(mensaje) : '';
    return `https://wa.me/${numero}?text=${texto}`;
  }
}