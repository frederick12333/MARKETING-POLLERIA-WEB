import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const SESSION_KEY = 'admin_session_elchino';

// Credenciales temporales — reemplazar con Firebase Auth
const ADMIN_EMAIL    = 'admin@polleriaelchino.pe';
const ADMIN_PASSWORD = 'admin123';

export interface LoginCredenciales {
  email:      string;
  password:   string;
  recordar:   boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private router: Router) {}

  login(credenciales: LoginCredenciales): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          credenciales.email    === ADMIN_EMAIL &&
          credenciales.password === ADMIN_PASSWORD
        ) {
          const storage = credenciales.recordar ? localStorage : sessionStorage;
          storage.setItem(SESSION_KEY, JSON.stringify({ email: credenciales.email }));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/admin/login']);
  }

  estaAutenticado(): boolean {
    return !!(
      localStorage.getItem(SESSION_KEY) ||
      sessionStorage.getItem(SESSION_KEY)
    );
  }

  getEmail(): string {
    const data =
      localStorage.getItem(SESSION_KEY) ||
      sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data).email : '';
  }
}