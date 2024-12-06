import {Component, Input} from '@angular/core';
import {DatePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-user-admin-card',
  standalone: true,
  imports: [
    DatePipe,
    UpperCasePipe
  ],
  templateUrl: './user-admin-card.component.html',
  styleUrl: './user-admin-card.component.css'
})
export class UserAdminCardComponent {
  @Input() id: string = '';          // ID del usuario
  @Input() name: string = '';        // Nombre del usuario
  @Input() email: string = '';       // Correo electrónico del usuario
  @Input() balance: number = 0;      // Balance del usuario
  @Input() role: string = '';        // Rol del usuario
  @Input() createdAt: string = '';
}
