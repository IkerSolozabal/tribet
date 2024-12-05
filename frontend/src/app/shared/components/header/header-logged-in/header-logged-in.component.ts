import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header-logged-in',
  standalone: true,
  imports: [],
  templateUrl: './header-logged-in.component.html',
  styleUrl: './header-logged-in.component.css'
})
export class HeaderLoggedInComponent {
  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();  // Llama al método logout del servicio
  }
}
