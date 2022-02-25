import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  error: string = '';


  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }



  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(resData => {
      if (resData.registered) {

        console.log('display redirect');
        this.router.navigate(['/temp']);

      }
      console.log(resData);
    },
      errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);

      })

    form.reset();
  }

  ngOnInit(): void {
  }

}
