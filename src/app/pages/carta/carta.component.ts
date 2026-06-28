import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoCardComponent],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {

  todos: Producto[]       = [];
  filtrados: Producto[]   = [];
  categorias: Categoria[] = [];
  categoriaActiva         = 'todas';
  busqueda                = '';

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.productosService.getAll().subscribe(p => {
      this.todos    = p.filter(prod => prod.disponible);
      this.filtrados = [...this.todos];
    });

    this.categoriasService.getAll().subscribe(c => this.categorias = c);
  }

  filtrarPorCategoria(categoriaId: string) {
    this.categoriaActiva = categoriaId;
    this.busqueda = '';
    this.aplicarFiltros();
  }

  onBusqueda() {
    this.categoriaActiva = 'todas';
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    let resultado = [...this.todos];

    if (this.categoriaActiva !== 'todas') {
      resultado = resultado.filter(p => p.categoriaId === this.categoriaActiva);
    }

    if (this.busqueda.trim()) {
      const termino = this.busqueda.toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
      );
    }

    this.filtrados = resultado;
  }

  limpiarBusqueda() {
    this.busqueda = '';
    this.aplicarFiltros();
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregar(producto);
  }

  getNombreCategoria(id: string): string {
    return this.categorias.find(c => c.id === id)?.nombre ?? '';
  }
}