import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { PromocionesService } from '../../services/promociones.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto.interface';
import { Promocion } from '../../interfaces/promocion.interface';
import { Configuracion } from '../../interfaces/configuracion.interface';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductoCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  destacados:  Producto[]    = [];
  promociones: Promocion[]   = [];
  config:      Configuracion = {
    nombreNegocio: '', direccion: '', telefono: '', whatsapp: '',
    correo: '', horario: '', facebook: '', instagram: '',
    googleMapsUrl: '', googleMapsEmbed: '', logo: ''
  };

  carouselItems = [
    { titulo: 'El Mejor Pollo a la Brasa',    subtitulo: 'Receta secreta de más de 20 años',        badge: '🔥 El favorito de Arequipa',     bg: 'slide-1' },
    { titulo: 'Combos para Toda la Familia',  subtitulo: 'Precios especiales de lunes a viernes',    badge: '🍱 Ahorra más con nuestros combos', bg: 'slide-2' },
    { titulo: 'Delivery a Tu Puerta',          subtitulo: 'Pide por WhatsApp en minutos',             badge: '🛵 Rápido y caliente',              bg: 'slide-3' }
  ];

  // La info rápida ahora se construye desde config
  get infoRapida() {
    return [
      { icono: 'bi-clock',     texto: this.config.horario   || '—', label: 'Horario'   },
      { icono: 'bi-telephone', texto: this.config.telefono  || '—', label: 'Teléfono'  },
      { icono: 'bi-geo-alt',   texto: this.config.direccion || '—', label: 'Dirección' },
      { icono: 'bi-whatsapp',  texto: this.config.whatsapp  ? '+' + this.config.whatsapp : '—', label: 'WhatsApp' }
    ];
  }

  constructor(
    private productosService:   ProductosService,
    private promocionesService: PromocionesService,
    private configService:      ConfiguracionService,
    private carritoService:     CarritoService
  ) {}

  ngOnInit() {
    this.productosService.getDestacados().subscribe(p => this.destacados = p);
    this.promocionesService.getActivas().subscribe(p => this.promociones = p.slice(0, 3));
    this.configService.getConfig().subscribe(c => this.config = c);
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregar(producto);
  }

  getWhatsappUrl(): string {
    return this.configService.getWhatsappUrl('Hola, deseo hacer un pedido 🍗');
  }
}