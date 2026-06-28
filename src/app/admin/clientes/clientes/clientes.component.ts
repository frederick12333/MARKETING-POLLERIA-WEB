import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  todos:     Cliente[] = [];
  filtrados: Cliente[] = [];
  busqueda   = '';

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.clientesService.getAll().subscribe(c => {
      this.todos    = [...c].reverse();
      this.filtrados = this.todos;
    });
  }

  onBusqueda() {
    if (!this.busqueda.trim()) {
      this.filtrados = this.todos;
      return;
    }
    const t = this.busqueda.toLowerCase();
    this.filtrados = this.todos.filter(c =>
      c.nombre.toLowerCase().includes(t) ||
      c.correo.toLowerCase().includes(t) ||
      c.celular.includes(t)
    );
  }

  getInicial(nombre: string): string {
    return nombre.charAt(0).toUpperCase();
  }
}