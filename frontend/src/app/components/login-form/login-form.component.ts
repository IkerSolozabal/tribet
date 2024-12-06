import { CookieHelperService } from '../../shared/services/cookie/cookie.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RestService } from '../../shared/services/rest/rest.service';
import { Endpoints } from '../../shared/emuns/endpoints.enum';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega FormsModule y CommonModule a imports
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  name: string = ''; // Para el registro
  alertMessage: string | null = null; // Mensaje de alerta
  alertType: 'primary' | 'danger' = 'primary'; // Tipo de alerta ('primary', 'danger', etc.)

  constructor(private restService: RestService, private cookieHelperService: CookieHelperService) {}

  public login() {
    this.restService.post(Endpoints.LOGIN, {
      email: this.email,
      password: this.password
    }).pipe(
      catchError(err => {
        // Muestra una alerta de error si hay un problema con el login
        this.showAlert('Error en el inicio de sesión. Por favor, verifica tus credenciales.', 'danger');
        console.error(err);
        return of(null); // Retorna un observable vacío para continuar
      })
    ).subscribe(res => {
      if (res) {
        // Si el login es exitoso
        this.showAlert('Inicio de sesión exitoso.', 'primary');
        const response = res as any;
        const token = response.data.token; // Asumiendo que `data.token` es la respuesta
        console.log('Token', token);

        // Guarda el token en una cookie (habilita la línea de abajo si es necesario)
        this.cookieHelperService.setCookie('token', token);

        // Redirige al home después de 2 segundos
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      }
    });
  }

  public register() {
    this.restService.post(Endpoints.REGISTER, {
      email: this.email,
      name: this.name,
      password: this.password
    }).pipe(
      catchError(err => {
        // Muestra una alerta de error si hay un problema con el registro
        this.showAlert('Error en el registro. Por favor, intenta nuevamente.', 'danger');
        console.error(err);
        return of(null); // Retorna un observable vacío para continuar
      })
    ).subscribe(res => {
      if (res) {
        // Si el registro es exitoso
        this.showAlert('Registro exitoso. Redirigiendo al login...', 'primary');
        console.log('Register success:', res);

        // Redirige al login después de 2 segundos
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    });
  }

  private showAlert(message: string, type: 'primary' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null; // Oculta la alerta después de 3 segundos
    }, 3000);
  }
}
