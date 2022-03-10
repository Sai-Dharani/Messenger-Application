import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  displayname: string[] = [];
  tempname: string;
  tempemail: any;
  displayemail: string[] = [];
  constructor(private db: AngularFireDatabase,
    private route: Router,
    private chatService: ChatService,
    ) {
    let user: AngularFireList<any> = db.list('/users');
    user.valueChanges().subscribe(usersObj => {
      user[usersObj.length];
      let i = 0;

      for (i = 0; i < usersObj.length; i++) {
        this.tempname = JSON.parse(JSON.stringify(usersObj[i].displayName));
        this.displayname[i] = this.tempname;
      }
      i = 0;
      for (i = 0; i < usersObj.length; i++) {
        this.tempemail = JSON.parse(JSON.stringify(usersObj[i].email));
        this.displayemail[i] = this.tempemail;
      }

    });
  }
  chat(user: string) {
    this.chatService.userName = user;
    this.route.navigate(['chat']);
  }
  ngOnInit() {

  }

}
