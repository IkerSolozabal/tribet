import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-admin-card',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './event-admin-card.component.html',
  styleUrl: './event-admin-card.component.css'
})
export class EventAdminCardComponent {
  @Input() eventName: string = '';
  @Input() location: string = '';
  @Input() status: string = '';
  @Input() startDate: string = '';
  @Input() eventId: string = ''; // ID del evento
}
