import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { Producto } from '../../../interfaces/producto.interface';
import { Categoria } from '../../../interfaces/categoria.interface';
import { ProductosFormComponent } from '../productos-form/productos-form.component';

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductosFormComponent],
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit {

  productos:  Producto[]  = [];
  categorias: Categoria[] = [];
  filtrados:  Producto[]  = [];
  busqueda    = '';
  filtroCategoria = 'todas';
  filtroEstado    = 'todos';

  mostrarForm  = false;
  productoEdit: Producto | null = null;

  mostrarConfirm    = false;
  productoAEliminar: Producto | null = null;

  constructor(
    private productosService:  ProductosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
    this.cargar();
    this.categoriasService.getAll().subscribe(c => this.categorias = c);
  }

  cargar() {
    this.productosService.getAll().subscribe(p => {
      this.productos = p;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    let r = [...this.productos];

    if (this.filtroCategoria !== 'todas') {
      r = r.filter(p => p.categoriaId === this.filtroCategoria);
    }

    if (this.filtroEstado === 'activos') {
      r = r.filter(p => p.disponible);
    } else if (this.filtroEstado === 'inactivos') {
      r = r.filter(p => !p.disponible);
    }

    if (this.busqueda.trim()) {
      const t = this.busqueda.toLowerCase();
      r = r.filter(p =>
        p.nombre.toLowerCase().includes(t) ||
        p.descripcion.toLowerCase().includes(t)
      );
    }

    this.filtrados = r;
  }

  getNombreCategoria(id: string): string {
    return this.categorias.find(c => c.id === id)?.nombre ?? '—';
  }

  nuevo() {
    this.productoEdit = null;
    this.mostrarForm  = true;
  }

  editar(p: Producto) {
    this.productoEdit = { ...p };
    this.mostrarForm  = true;
  }

  toggleDisponible(p: Producto) {
    this.productosService.toggleDisponible(p.id);
    this.cargar();
  }

  confirmarEliminar(p: Producto) {
    this.productoAEliminar = p;
    this.mostrarConfirm    = true;
  }

  eliminar() {
    if (this.productoAEliminar) {
      this.productosService.delete(this.productoAEliminar.id);
      this.mostrarConfirm    = false;
      this.productoAEliminar = null;
      this.cargar();
    }
  }

  cancelarEliminar() {
    this.mostrarConfirm    = false;
    this.productoAEliminar = null;
  }

  onFormGuardado() {
    this.mostrarForm = false;
    this.cargar();
  }

  onFormCancelado() {
    this.mostrarForm = false;
  }
}