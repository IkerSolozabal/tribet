import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private selectedBet: any = null;

  setSelectedBet(bet: any) {
    this.selectedBet = bet;
  }

  getSelectedBet() {
    return this.selectedBet;
  }
}
