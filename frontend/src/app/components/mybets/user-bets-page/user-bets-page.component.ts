import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { RestService } from '../../../core/services/rest/rest.service';
import { CookieHelperService } from '../../../core/services/cookie/cookie.service';
import { Endpoints } from '../../../core/enums/endpoints.enum';

@Component({
  selector: 'app-user-bets-page',
  standalone: true,
  imports: [UserInfoComponent],
  templateUrl: './user-bets-page.component.html',
  styleUrl: './user-bets-page.component.css'
})
export class UserBetsPageComponent implements OnInit {
  bets: any[] = [];
  constructor(private restService: RestService, private cookieHelperService: CookieHelperService) { }

  ngOnInit(): void {
    this.loadUserBets()
  }

  public loadUserBets() {
    this.restService.get(Endpoints.USER_BETS).subscribe(res => {
      if (res) {
  
        const response = res as any;
        const bets = response.bets
        this.bets = bets
        console.log('BETS:', bets)
      }
    });
  }
}
