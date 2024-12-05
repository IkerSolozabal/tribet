import { RestService } from '../../../shared/services/rest/rest.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetService } from '../../../shared/services/bet/bet.service';
import { Endpoints } from '../../../shared/emuns/endpoints.enum';

@Component({
  selector: 'app-bet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bet-card.component.html',
  styleUrl: './bet-card.component.css'
})
export class BetCardComponent {
  @Input() bet: any;

  constructor(private betService: BetService, private restService: RestService) { }

  // Método para seleccionar la apuesta
  selectBet(bet: any) {
    this.betService.setSelectedBet(bet); // Almacenar la apuesta seleccionada
  }

  // Getter para acceder a la apuesta seleccionada en el template
  get selectedBet() {
    return this.betService.getSelectedBet()
  }

  getbetProposalId() {
    const bet = this.betService.getSelectedBet() as any
    const betOptionId = bet._id
    return betOptionId;
  }

  placeBet() {
    const betAmount = (document.getElementById('bet-amount') as HTMLInputElement).value;
    if (isNaN(Number(betAmount)) || Number(betAmount) <= 0) {
      console.error("La cantidad apostada no es válida. Debe ser un número mayor que 0.");
    } else {
      console.log("Apuesta correcta", this.bet)
      this.placeBets(Number(betAmount))
    }
  }

  public placeBets(amount: Number) {

    console.log("Apuesta correcta", this.bet.id)

    this.restService.post(Endpoints.PLACE_BET,
      {
        betProposal: this.bet._id,
        amount: amount,
        betType: this.bet.betType
      }).subscribe(res => {
        if (res) {
          console.log("Apuesta correcta")
        }
      });
  }
}

