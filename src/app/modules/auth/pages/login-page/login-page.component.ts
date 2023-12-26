import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({});

  constructor (private authService: AuthService, 
    private cookie: CookieService,
    private router: Router){}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required, //que haya algo
          Validators.email  //que sea un email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }
  sendLogin(): void{
    const {email, password} = this.formLogin.value
    
    this.authService.sendCredentials(email, password)
    //200 - <400
    .subscribe(responseOk => { //solo si es correcto el login
      /* console.log('Credenciales correctos', responseOk); */
      const { tokenSession, data } = responseOk
      this.cookie.set('token', tokenSession, 4,'/')
      this.router.navigate(['/', 'tracks'] )
    },
    err => { //error 400+
      this.errorSession = true
      console.log('ERROR: Credenciales INcorrectos');
    }
    )

  }
}
