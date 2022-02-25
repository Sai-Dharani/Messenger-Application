import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
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
  form!: NgForm;
  countries: Array<any> = [
    { name: 'India', value: 'india' },
    { name: 'France', value: 'france' },
    { name: 'USA', value: 'USA' },
    { name: 'Germany', value: 'germany' },
    { name: 'Japan', value: 'Japan' }
  ];

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    this.form = fb.group({
      selectedCountries: new FormArray([])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }






  onCheckboxChange(event: any) {
    const selectedCountries = (this.form.controls.selectedCountries as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountries.controls
        .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
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
