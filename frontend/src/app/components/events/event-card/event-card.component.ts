import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() eventName: string = '';
  @Input() location: string = '';
  @Input() status: string = '';
  @Input() startDate: string = '';
  @Input() eventId: string = ''; // ID del evento

  constructor(private router: Router) {}

  redirectToEventBet() {
    this.router.navigate([`/events/${this.eventId}`]);
  }
}
