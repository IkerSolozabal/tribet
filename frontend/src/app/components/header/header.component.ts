import { Component } from '@angular/core';
import { AuthGuard } from '../../core/guards/auth/auth.guard';
import { CookieHelperService } from '../../core/services/cookie/cookie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthGuard, private cookieHelperService: CookieHelperService) {}

  // Llama al servicio para verificar si el usuario está autenticado
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout() {
    // Aquí eliminas el token y rediriges a la página de inicio o login
    this.cookieHelperService.deleteCookie('token');
    window.location.href = '/login';
  }
}
