import {Injectable} from '@angular/core';
import {CookieHelperService} from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieHelperService: CookieHelperService) {
  }

  logout() {
    // Aquí eliminas el token y rediriges a la página de inicio o login
    this.cookieHelperService.deleteCookie('token');
    window.location.href = '/';
  }

}
