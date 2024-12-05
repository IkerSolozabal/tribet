import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();  // Llama al método logout del servicio
  }
}
