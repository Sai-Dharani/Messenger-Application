// import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth} from '@angular/fire/compat/auth'
// import { FormBuilder, FormGroup,Validators } from '@angular/forms';
// import * as firebase from 'firebase/auth';
// import "firebase/auth";
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthResponseData } from '../services/auth.service';

// @Component({
//   selector: 'app-messages',
//   templateUrl: './messages.component.html',
//   styleUrls: ['./messages.component.css']
// })
// export class MessagesComponent implements OnInit {
//   chatForm: FormGroup;
//   message = '';
//   currentMsg = '';
//   constructor(private formBuilder: FormBuilder,private afAuth:AngularFireAuth, private http:HttpClient) {  

//    }

//   ngOnInit(): void {
//     this.chatForm = this.formBuilder.group({
//       'message' : ['', Validators.required]
//     });
//   }
//   onFormSubmit(form: any) {
//     const chat = form;
//     chat.type = 'message';
//     this.chatForm = this.formBuilder.group({
//       'message' : ['', Validators.required]
//     });
//     console.log(form.value)
//    this.http.post('https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',form.value).subscribe(response => console.log(response)) 
//   }
//   showMsg(message:any){
//     this.currentMsg=message;
    
//   }
// }
