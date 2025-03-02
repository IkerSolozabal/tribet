import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CookieHelperService} from '../../../shared/services/cookie/cookie.service';
import {RestService} from '../../../shared/services/rest/rest.service';
import {BetService} from '../../../shared/services/bet/bet.service';
import {Endpoints} from '../../../shared/emuns/endpoints.enum';
import {WinnerBetsComponent} from '../winner-bets/winner-bets.component';
import {NgForOf} from '@angular/common';
@Component({
  selector: 'app-winner-bet-card',
  standalone: true,
  imports: [
    NgForOf,
    WinnerBetsComponent
  ],
  templateUrl: './winner-bet-card.component.html',
  styleUrl: './winner-bet-card.component.css'
})
export class WinnerBetCardComponent {
  eventId: string | null = null;
  winnerBets: any[] = [];

  constructor(private route: ActivatedRoute, private cookieHelperService: CookieHelperService, private restService: RestService, private betService: BetService) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    console.log('Event ID:', this.eventId);
    this.loadBets()
    // Aquí puedes cargar datos relacionados con el evento según el eventId
  }

  public loadBets() {
    this.restService.get(`${Endpoints.BET_PROPOSAL}/${this.eventId}`).subscribe(res => {
      if (res) {
        // Si el login es exitoso
        const response = res as any;
        const bets = response.bets
        console.log('AvailableBets', bets);
        this.winnerBets = bets.winnerBets

      }
    });
  }

  selectBet(bet: any) {
    this.betService.setSelectedBet(bet);
  }
}
