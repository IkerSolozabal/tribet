import { CookieHelperService } from '../cookie/cookie.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private cookieHelperService: CookieHelperService) { }

  public get(url: string) {
    // Obtén el token de alguna parte, por ejemplo, del almacenamiento local o de un servicio de autenticación.

    // Cambia esto por la lógica que uses para obtener el token
    const token = this.cookieHelperService.getCookie('token')
    // Crear los headers, incluyendo el Authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizamos la solicitud GET pasando el header
    return this.http.get(url, { headers });
  }

  public post(url: string, body: any) {
    // Obtener el token desde las cookies (o cualquier otro almacenamiento que estés usando)
    const token = this.cookieHelperService.getCookie('token');

    // Crear los headers, incluyendo el Authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizamos la solicitud POST pasando el body y los headers
    return this.http.post(url, body, { headers });
  }
}
