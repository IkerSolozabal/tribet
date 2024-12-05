import { Component } from '@angular/core';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { CookieHelperService } from '../../services/cookie/cookie.service';
import { CommonModule } from '@angular/common';
import {HeaderNotLoggedInComponent} from './header-not-logged-in/header-not-logged-in.component';
import {HeaderLoggedInComponent} from './header-logged-in/header-logged-in.component';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import {UserRoles} from '../../emuns/endpoints.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderNotLoggedInComponent, HeaderLoggedInComponent, HeaderAdminComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthGuard, private cookieHelperService: CookieHelperService) {}

  // Llama al servicio para verificar si el usuario está autenticado
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get userRole(): UserRoles | null {
    return this.authService.getUserRole()
  }

  logout() {
    // Aquí eliminas el token y rediriges a la página de inicio o login
    this.cookieHelperService.deleteCookie('token');
    window.location.href = '/login';
  }

  protected readonly UserRoles = UserRoles;
}
