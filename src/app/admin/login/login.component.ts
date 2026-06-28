import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-light-bg)">
      <div style="text-align:center;padding:40px">
        <h2 style="font-family:var(--font-display);color:var(--color-primary)">Panel Administrador</h2>
        <p style="color:var(--color-gray)">En construcción — próxima etapa</p>
        <a routerLink="/" class="btn-primary-custom">← Volver al sitio</a>
      </div>
    </div>
  `
})
export class LoginComponent {}