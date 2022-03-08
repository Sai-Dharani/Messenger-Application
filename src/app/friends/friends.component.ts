import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
// import { User } from '../models/user.model';
// import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  // @Input() user:User;
  users: any[];
  usermail: any[];
  constructor(private db: AngularFireDatabase,
    private route:Router,
    private chatService:ChatService,
    private authService:AuthService,
    private http:HttpClient) { 
    const userRef: AngularFireList<any> = db.list('/username');
    const usermailRef: AngularFireList<any> = db.list('/usermail');

    userRef.valueChanges().subscribe(users => {
      this.users = users;
      //console.log('hi');
      //console.log(this.users);

    });

    usermailRef.valueChanges().subscribe(usermail => {
      this.usermail = usermail;
     // console.log('hi');
      //console.log(this.usermail); 

    });
  }
chat(user: string){
  this.chatService.userName=user;
  // const path = `users/${user}`;
  // this.db.list(path);
  // this.http.post('https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', user)
  this.route.navigate(['chat']);
  console.log(user)
}
  ngOnInit() {
    
  }

}
