import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Configuracion } from '../../interfaces/configuracion.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  configuracion: Configuracion = {
    nombreNegocio:   '',
    direccion:       '',
    telefono:        '',
    whatsapp:        '',
    correo:          '',
    facebook:        '',
    instagram:       '',
    horario:         '',
    googleMapsUrl:   '',
    googleMapsEmbed: '',
    logo:            ''
  };

  anio = new Date().getFullYear();

  constructor(private configService: ConfiguracionService) {}

  ngOnInit() {
    this.configService.getConfig().subscribe(c => this.configuracion = c);
  }
}