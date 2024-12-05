
import { CanActivate } from '@angular/router';
import { CookieHelperService } from '../../services/cookie/cookie.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cookieHelperService: CookieHelperService,
    private router: Router  // Inyecta Router en el constructor
  ) { }



  // Asegúrate de instalar la librería si no lo has hecho

  isAuthenticated(): boolean {
    const token = this.cookieHelperService.getCookie('token');

    if (!token) {
      return false;  // Si no hay token, no está autenticado
    }

    // Crear una instancia de JwtHelperService para usar sus métodos
    const jwtHelper = new JwtHelperService();

    // Verificar si el token ha expirado
    const isTokenExpired = jwtHelper.isTokenExpired(token);

    // Retornar true solo si el token existe y no ha expirado
    return !isTokenExpired;
  }

  canActivate(): boolean {
    

    // Si no hay token, redirigir al login
    if (!this.isAuthenticated()) {
      this.redirectToLogin();  // Llama a la función para redirigir
      return false;  // Evita que la ruta se active
    }

    return true;  // Permite el acceso a la ruta
  }

  // Función para redirigir al login
  private redirectToLogin() {
    this.router.navigate(['/login']);  // Redirige a la página de login
  }
}