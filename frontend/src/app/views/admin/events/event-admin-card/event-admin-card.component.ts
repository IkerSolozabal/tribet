import {Component, input, Input} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {EventService} from '../../../../shared/services/event/event.service';
import {EventLocations, EventStatusEnum} from '../../../../shared/emuns/endpoints.enum';
import { FormsModule } from '@angular/forms'; //


@Component({
  selector: 'app-event-admin-card',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './event-admin-card.component.html',
  styleUrl: './event-admin-card.component.css'
})
export class EventAdminCardComponent {
  @Input() event: any;
  eventLocations: string[] = Object.values(EventLocations) as string[];
  eventStatusEnum: string[] = Object.values(EventStatusEnum) as string[];

  constructor(private eventService: EventService) {
  }

  selectEvent(event: any) {
    this.eventService.setSelectedEvent(event);
    console.log('EVENT', event)
  }

  get selectedEvent() {
    return this.eventService.getSelectedEvent()
  }

  protected readonly EventLocations = EventLocations;
}
