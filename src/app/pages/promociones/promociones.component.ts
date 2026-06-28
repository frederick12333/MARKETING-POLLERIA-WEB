import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocionesService } from '../../services/promociones.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Promocion } from '../../interfaces/promocion.interface';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  promociones: Promocion[] = [];
  whatsappUrl = '';

  constructor(
    private promocionesService: PromocionesService,
    private configService: ConfiguracionService
  ) {}

  ngOnInit() {
    this.promocionesService.getActivas().subscribe(p => this.promociones = p);
    this.whatsappUrl = this.configService.getWhatsappUrl('Hola, me interesa una promoción 🎉');
  }
}