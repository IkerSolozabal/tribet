import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest/rest.service';
import {CookieHelperService} from '../../../../shared/services/cookie/cookie.service';
import {Endpoints} from '../../../../shared/emuns/endpoints.enum';
import {CommonModule, NgForOf} from '@angular/common';
import {UserAdminCardComponent} from '../user-admin-card/user-admin-card.component';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [
    UserAdminCardComponent,
    NgForOf
  ],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent implements OnInit {
  users: any[] = [];

  constructor(private restService: RestService, private cookieHelperService: CookieHelperService) {
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  public loadUsers() {
    this.restService.get(Endpoints.USERS).subscribe(res => {
      if (res) {
        // Si el login es exitoso
        const response = res as any;
        const users = response.data
        this.users = users
        console.log('Usuarios', users);
      }
    });
  }

}
