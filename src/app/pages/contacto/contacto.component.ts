import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Configuracion } from '../../interfaces/configuracion.interface';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  config: Configuracion = {
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

  form: FormGroup;
  enviando  = false;
  enviadoOk = false;

  constructor(
    private configService: ConfiguracionService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      correo:  ['', [Validators.required, Validators.email]],
      asunto:  ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.configService.getConfig().subscribe(c => this.config = c);
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando = true;
    setTimeout(() => {
      this.enviando  = false;
      this.enviadoOk = true;
      this.form.reset();
      setTimeout(() => this.enviadoOk = false, 5000);
    }, 1500);
  }

  get f() { return this.form.controls; }

  getWhatsappUrl(): string {
    return this.configService.getWhatsappUrl('Hola, necesito información 👋');
  }
}