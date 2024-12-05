import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../core/services/rest/rest.service';
import { CookieHelperService } from '../../../core/services/cookie/cookie.service';
import { Endpoints } from '../../../core/enums/endpoints.enum';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit{ 
  events: any[] = [];
  constructor(private restService: RestService, private cookieHelperService: CookieHelperService) {}
  
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
