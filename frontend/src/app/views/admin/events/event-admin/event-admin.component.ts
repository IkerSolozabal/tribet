import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest/rest.service';
import {CookieHelperService} from '../../../../shared/services/cookie/cookie.service';
import {Endpoints, EventLocations, EventStatusEnum} from '../../../../shared/emuns/endpoints.enum';
import {CommonModule, NgForOf} from '@angular/common';
import {UserAdminCardComponent} from '../../users/user-admin-card/user-admin-card.component';
import {EventAdminCardComponent} from '../event-admin-card/event-admin-card.component';
import {EventService} from '../../../../shared/services/event/event.service';
import {BetCardComponent} from '../../../../components/bets/bet-card/bet-card.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-admin',
  standalone: true,
  imports: [
    NgForOf,
    UserAdminCardComponent,
    EventAdminCardComponent,
    BetCardComponent,
    CommonModule
  ],
  templateUrl: './event-admin.component.html',
  styleUrl: './event-admin.component.css'
})
export class EventAdminComponent implements OnInit {
  events: any[] = [];

  constructor(private restService: RestService, private cookieHelperService: CookieHelperService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadEvents()
  }

  goToNewEvent() {
    this.router.navigate(['/admin/events/new']);
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
