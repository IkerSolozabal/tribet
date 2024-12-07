import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest/rest.service';
import {CookieHelperService} from '../../../../shared/services/cookie/cookie.service';
import {Endpoints, EventLocations, EventStatusEnum} from '../../../../shared/emuns/endpoints.enum';
import {CommonModule, NgForOf} from '@angular/common';
import {UserAdminCardComponent} from '../../users/user-admin-card/user-admin-card.component';
import {EventAdminCardComponent} from '../event-admin-card/event-admin-card.component';
import {EventService} from '../../../../shared/services/event/event.service';
import {BetCardComponent} from '../../../../components/bets/bet-card/bet-card.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-admin',
  standalone: true,
  imports: [
    NgForOf,
    UserAdminCardComponent,
    EventAdminCardComponent,
    BetCardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './event-admin.component.html',
  styleUrl: './event-admin.component.css'
})
export class EventAdminComponent implements OnInit {
  events: any[] = [];
  eventLocations: string[] = Object.values(EventLocations) as string[];
  eventStatusEnum: string[] = Object.values(EventStatusEnum) as string[];
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

  onSubmit(form: any) {
    if (form.valid) {
      const eventData = form.value;  // Obtiene los datos del formulario
      console.log('Datos del Evento:', eventData);  // Verifica que los datos se están enviando correctamente

      // Llamamos al servicio para crear el evento

    } else {
      console.log('Formulario inválido');
    }
  }
}
