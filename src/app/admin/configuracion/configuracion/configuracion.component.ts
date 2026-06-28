import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { Configuracion } from '../../../interfaces/configuracion.interface';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  form!:       FormGroup;
  guardando    = false;
  guardadoOk   = false;
  logoPreview  = '';

  constructor(
    private fb:  FormBuilder,
    private svc: ConfiguracionService
  ) {}

  ngOnInit() {
    const c = this.svc.getConfigSnapshot();
    this.logoPreview = c.logo;

    this.form = this.fb.group({
      nombreNegocio:   [c.nombreNegocio,   Validators.required],
      direccion:       [c.direccion,       Validators.required],
      telefono:        [c.telefono,        Validators.required],
      correo:          [c.correo,          [Validators.required, Validators.email]],
      whatsapp:        [c.whatsapp,        Validators.required],
      horario:         [c.horario,         Validators.required],
      facebook:        [c.facebook],
      instagram:       [c.instagram],
      googleMapsUrl:   [c.googleMapsUrl],
      googleMapsEmbed: [c.googleMapsEmbed],
      logo:            [c.logo]
    });
  }

  get f() { return this.form.controls; }

  onLogoChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      this.logoPreview = ev.target?.result as string;
      this.form.patchValue({ logo: this.logoPreview });
    };
    reader.readAsDataURL(file);
  }

  abrirLogoSelector() {
    this.logoInput.nativeElement.click();
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const data: Configuracion = {
      nombreNegocio:   this.form.value.nombreNegocio,
      direccion:       this.form.value.direccion,
      telefono:        this.form.value.telefono,
      correo:          this.form.value.correo,
      whatsapp:        this.form.value.whatsapp,
      horario:         this.form.value.horario,
      facebook:        this.form.value.facebook  || '',
      instagram:       this.form.value.instagram || '',
      googleMapsUrl:   this.form.value.googleMapsUrl   || '',
      googleMapsEmbed: this.form.value.googleMapsEmbed || '',
      logo:            this.form.value.logo || ''
    };

    setTimeout(() => {
      this.svc.updateConfig(data);
      this.guardando  = false;
      this.guardadoOk = true;
      setTimeout(() => this.guardadoOk = false, 3000);
    }, 700);
  }
}