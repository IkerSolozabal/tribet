import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../core/services/rest/rest.service';
import { CookieHelperService } from '../../../core/services/cookie/cookie.service';
import { Endpoints } from '../../../core/enums/endpoints.enum';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  userName: string | null = null;
  balance: number | null = null;

  constructor(private restService: RestService, private cookieHelperService: CookieHelperService) { }

  ngOnInit(): void {
    this.loadUserInfo()
  }

  public loadUserInfo() {
    this.restService.get(Endpoints.USER_INFO).subscribe(res => {
      if (res) {
        // Si el login es exitoso
        const response = res as any;
        const user = response.data
        this.userName = user.name
        this.balance = user.balance
      }
    });
  }

}