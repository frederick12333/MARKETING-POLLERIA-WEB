import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'carta',
    loadComponent: () =>
      import('./pages/carta/carta.component').then(m => m.CartaComponent)
  },
  {
    path: 'promociones',
    loadComponent: () =>
      import('./pages/promociones/promociones.component').then(m => m.PromocionesComponent)
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(m => m.ContactoComponent)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];