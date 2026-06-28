import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Promocion } from '../../../interfaces/promocion.interface';
import { PromocionesService } from '../../../services/promociones.service';

@Component({
  selector: 'app-promociones-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './promociones-form.component.html',
  styleUrls: ['./promociones-form.component.scss']
})
export class PromocionesFormComponent implements OnInit {

  @Input()  promocion: Promocion | null = null;
  @Output() guardado  = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  form!:         FormGroup;
  guardando      = false;
  esEdicion      = false;
  imagenPreview  = '';
  dragOver       = false;

  constructor(
    private fb:  FormBuilder,
    private svc: PromocionesService
  ) {}

  ngOnInit() {
    this.esEdicion    = !!this.promocion;
    this.imagenPreview = this.promocion?.imagen ?? '';

    this.form = this.fb.group({
      titulo:      [this.promocion?.titulo      ?? '', [Validators.required, Validators.minLength(5)]],
      descripcion: [this.promocion?.descripcion ?? '', Validators.required],
      imagen:      [this.promocion?.imagen      ?? ''],
      fechaInicio: [this.promocion?.fechaInicio ?? ''],
      fechaFin:    [this.promocion?.fechaFin    ?? ''],
      activa:      [this.promocion?.activa      ?? true]
    });
  }

  get f() { return this.form.controls; }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragOver = true; }
  onDragLeave() { this.dragOver = false; }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver = false;
    const file = e.dataTransfer?.files[0];
    if (file) this.procesarArchivo(file);
  }

  onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.procesarArchivo(file);
  }

  procesarArchivo(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      this.imagenPreview = ev.target?.result as string;
      this.form.patchValue({ imagen: this.imagenPreview });
    };
    reader.readAsDataURL(file);
  }

  abrirSelector() {
    this.fileInput.nativeElement.click();
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const data: Promocion = {
      id:          this.promocion?.id ?? 'promo-' + Date.now(),
      titulo:      this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen:      this.form.value.imagen || 'assets/images/placeholder-promo.jpg',
      fechaInicio: this.form.value.fechaInicio || undefined,
      fechaFin:    this.form.value.fechaFin    || undefined,
      activa:      this.form.value.activa
    };

    setTimeout(() => {
      if (this.esEdicion) {
        this.svc.update(data);
      } else {
        this.svc.add(data);
      }
      this.guardando = false;
      this.guardado.emit();
    }, 500);
  }

  cancelar() {
    this.cancelado.emit();
  }
}