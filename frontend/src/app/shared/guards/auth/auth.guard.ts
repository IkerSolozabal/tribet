import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieHelperService} from '../../services/cookie/cookie.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserRoles} from '../../emuns/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cookieHelperService: CookieHelperService,
    private router: Router  // Inyecta Router en el constructor
  ) {
  }

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

  getUserRole(): UserRoles | null {
    const token = this.cookieHelperService.getCookie('token');

    if (!token || !this.isAuthenticated()) {
      return null; // Si no está autenticado, no tiene un rol
    }

    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token); // Decodificar el token

    // Verificar si el token contiene el campo `role` (esto depende de cómo esté estructurado tu JWT)
    const role = decodedToken?.role; // O cualquier otro nombre que uses en el payload

    if (role === 'admin') {
      return UserRoles.ADMIN;
    } else if (role === 'user') {
      return UserRoles.USER;
    }

    return null;
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    const expectedRoles = route.data['roles'] as Array<UserRoles>; // Los roles esperados (ahora usando el enum)
    const userRole = this.getUserRole() as UserRoles; // Asegúrate de que el servicio devuelva un valor compatible con el enum

    if (expectedRoles.includes(userRole)) {
      return true; // El usuario tiene acceso
    } else {
      this.router.navigate(['/unauthorized']); // Redirigir si no tiene acceso
      return false;
    }
  }
}
