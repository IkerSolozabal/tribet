import {Component, input, Input} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {EventService} from '../../../../shared/services/event/event.service';


@Component({
  selector: 'app-event-admin-card',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './event-admin-card.component.html',
  styleUrl: './event-admin-card.component.css'
})
export class EventAdminCardComponent {
  @Input() event: any;

  constructor(private eventService: EventService) {
  }

  selectEvent(event: any) {
    this.eventService.setSelectedEvent(event);
    console.log('EVENT', event)
  }

  get selectedEvent() {
    return this.eventService.getSelectedEvent()
  }
}
