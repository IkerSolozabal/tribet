import { RestService } from '../../../core/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieHelperService } from '../../../core/services/cookie/cookie.service';
import { Endpoints } from '../../../core/enums/endpoints.enum';
import { CommonModule } from '@angular/common';
import { BetCardComponent } from '../bet-card/bet-card.component';
import { BetService } from '../../../core/services/bet/bet.service';

@Component({
  selector: 'app-bet-page',
  standalone: true,
  imports: [CommonModule, BetCardComponent],
  templateUrl: './bet-page.component.html',
  styleUrl: './bet-page.component.css'
})
export class BetPageComponent implements OnInit {
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
        console.log('BetOptions', bets);
        this.winnerBets = bets.winnerBets
        
      }
    });
  }

  selectBet(bet: any) {
    this.betService.setSelectedBet(bet);
  }
}
