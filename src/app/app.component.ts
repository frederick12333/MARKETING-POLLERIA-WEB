import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CarritoSidebarComponent } from './shared/carrito-sidebar/carrito-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CarritoSidebarComponent],
  template: `
    <app-navbar></app-navbar>
    <app-carrito-sidebar></app-carrito-sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <a href="https://wa.me/51999999999" target="_blank" class="whatsapp-float" title="Escríbenos por WhatsApp">
      <i class="bi bi-whatsapp"></i>
    </a>
  `
})
export class AppComponent {}