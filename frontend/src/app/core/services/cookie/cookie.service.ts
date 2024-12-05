// cookie.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieHelperService {

  constructor(private cookieService: CookieService) { }

  // Establece una cookie
  setCookie(name: string, value: string, days: number = 7): void {
    this.cookieService.set(name, value, days);
  }

  // Obtiene una cookie
  getCookie(name: string): string | null {
    return this.cookieService.get(name);
  }

  // Elimina una cookie
  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }

  // Verifica si una cookie existe
  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }
}
