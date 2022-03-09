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
  displayname: string[] = [];
  tempname: string;
  tempemail: any;
  displayemail: string[] = [];
  constructor(private db: AngularFireDatabase,
    private route: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private http: HttpClient) {
    let user: AngularFireList<any> = db.list('/users');
    user.valueChanges().subscribe(usersObj => {
      user[usersObj.length];
      let i = 0;

      for (i = 0; i < usersObj.length; i++) {
        this.tempname = JSON.parse(JSON.stringify(usersObj[i].displayName));
        this.displayname[i] = this.tempname;
        console.log(this.displayname[i]);
      }
      i = 0;
      for (i = 0; i < usersObj.length; i++) {
        this.tempemail = JSON.parse(JSON.stringify(usersObj[i].email));
        this.displayemail[i] = this.tempemail;
        console.log(this.displayemail[i]);
      }

    });
  }
  chat(user: string) {
    this.chatService.userName = user;
    // const path = `users/${user}`;
    // this.db.list(path);
    // this.http.post('https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', user)
    this.route.navigate(['chat']);
    console.log(user)
  }
  ngOnInit() {

  }

}
