import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  list: any[] = [];
  isLoginMode = true;
  error: string = '';
  form: FormGroup;
  countries: Array<any> = [
    { name: 'Painting', value: 'painting' },
    { name: 'Cooking ', value: 'cooking' },
    { name: 'Cat', value: 'cat' },
    { name: 'Dogs', value: 'dogs' },
    { name: 'Angular', value: 'angular' }
  ];

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private http:HttpClient) {
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
      console.log(this.form.value);

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
      this.http.post('https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', resData.email).subscribe(response => console.log(response))
    },
      errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);

      })

    form.reset();
  }
  get result() {
    return this.list.filter(item => item.checked);
  }
  changeCheckbox(event: Event) {
    console.log(event.target);
  }
  ngOnInit(): void {
    this.list = [
      {
        id: 1,
        country: 'India',
        checked: true,
      },
      {
        id: 2,
        country: 'France',
        checked: false,
      },
      {
        id: 3,
        country: 'USA',
        checked: true,
      },
      {
        id: 4,
        country: 'Germany',
        checked: false,
      },
    ]
  }

}
