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


  usersData;

  data: string;

  Users = [{
    "id": 5440,
    "name": "Wanda Lynch",
    "email": "wanda.lynch@example.com"
  },
  {
    "id": 6228,
    "name": "Katrina Graves",
    "email": "katrina.graves@example.com"
  },
  {
    "id": 1654,
    "name": "Louis Daniels",
    "email": "louis.daniels@example.com"
  },
  {
    "id": 1631,
    "name": "Gavin Sullivan",
    "email": "gavin.sullivan@example.com"
  },
  {
    "id": 9880,
    "name": "June Martinez",
    "email": "june.martinez@example.com"
  },
  {
    "id": 8634,
    "name": "Owen Davis",
    "email": "owen.davis@example.com"
  },
  {
    "id": 3918,
    "name": "Megan Harrison",
    "email": "megan.harrison@example.com"
  },
  {
    "id": 3680,
    "name": "Joel Thompson",
    "email": "joel.thompson@example.com"
  },
  {
    "id": 2409,
    "name": "Dora Rose",
    "email": "dora.rose@example.com"
  },
  {
    "id": 4477,
    "name": "Candice Neal",
    "email": "candice.neal@example.com"
  }
  ]
  constructor(private db: AngularFireDatabase,
    private route: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private http: HttpClient) {
    let user: AngularFireList<any> = db.list('/users');
    user.valueChanges().subscribe(usersObj => {
      user[usersObj.length];
      // let i = 0;
      this.usersData = usersObj;
      console.log(this.usersData);
      // for (i = 0; i < usersObj.length; i++) {
      //   this.tempname = JSON.parse(JSON.stringify(usersObj[i].displayName));
      //   this.displayname[i] = this.tempname;
      //   // console.log(this.displayname[i]);
      // }
      // i = 0;
      // for (i = 0; i < usersObj.length; i++) {
      //   this.tempemail = JSON.parse(JSON.stringify(usersObj[i].email));
      //   this.displayemail[i] = this.tempemail;
      //   // console.log(this.displayemail[i]);
      // }
      // i = 0;
      // for (i = 0; i < usersObj.length; i++) {
      //   this.tempname = JSON.parse(JSON.stringify(usersObj[i].displayName));
      //   this.tempemail = JSON.parse(JSON.stringify(usersObj[i].email));
      //   console.log(usersObj[i].displayName);

      //   // this.displays[i].email = this.tempemail;
      //   // this.displays[i].name = this.tempname;
      //   // console.log(this.tempemail);

      //   // console.log(this.displays[i].email);
      // }

    });
  }
  chat(user: string) {
    this.chatService.userName = user;
    // const path = `users/${user}`;
    // this.db.list(path);
    // this.http.post('https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', user)
    this.route.navigate(['chat']);
    // console.log(user)
  }
  ngOnInit() {

  }

}
