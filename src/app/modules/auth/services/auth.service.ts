import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/* import { tap } from 'rxjs/operators'; 
Se puede usar la cookie desde el servicio si se quiere 
import { CookieService } from 'ngx-cookie-service';*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api

  constructor(private http: HttpClient/* , private cookie: CookieService */) { }

  sendCredentials(email: string, password: string): Observable<any>{
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/auth/login`, body)
    /* .pipe(
      tap( (responseOK: any) => {  
      const { tokenSession, data } = responseOK
      this.cookie.set('token_service', tokenSession, 4,'/')
      })
    ) */
  }
  suma(a: number, b: number): number {
    return a + b
  }
}
