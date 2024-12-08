import {Component, Input} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {EventService} from '../../../../shared/services/event/event.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {EventStatusEnum} from '../../../../shared/emuns/endpoints.enum'; //


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

  constructor(private eventService: EventService, private router: Router) {
  }

  editEvent() {
    this.router.navigate([`/admin/events/${this.event._id}`]);
  }

  protected readonly EventStatusEnum = EventStatusEnum;
}
