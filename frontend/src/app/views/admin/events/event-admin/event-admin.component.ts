import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest/rest.service';
import {CookieHelperService} from '../../../../shared/services/cookie/cookie.service';
import {Endpoints} from '../../../../shared/emuns/endpoints.enum';
import {NgForOf} from '@angular/common';
import {UserAdminCardComponent} from '../../users/user-admin-card/user-admin-card.component';
import {EventAdminCardComponent} from '../event-admin-card/event-admin-card.component';

@Component({
  selector: 'app-event-admin',
  standalone: true,
  imports: [
    NgForOf,
    UserAdminCardComponent,
    EventAdminCardComponent
  ],
  templateUrl: './event-admin.component.html',
  styleUrl: './event-admin.component.css'
})
export class EventAdminComponent implements OnInit {
  events: any[] = [];

  constructor(private restService: RestService, private cookieHelperService: CookieHelperService) {
  }

  ngOnInit(): void {
    this.loadEvents()
  }

  public loadEvents() {
    this.restService.get(Endpoints.EVENTS).subscribe(res => {
      if (res) {
        // Si el login es exitoso
        const response = res as any;
        const events = response.events
        this.events = events
        console.log('Eventos', events);
      }
    });
  }
}
