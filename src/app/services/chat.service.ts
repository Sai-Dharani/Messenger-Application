import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/auth';
import { ChatMessage } from '../models/chat-message.model';
import { keyframes } from '@angular/animations';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: string;
  list:any

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(auth => {
          if (auth !== undefined && auth !== null) {
            this.user = auth;
          }
         this.list= this.getUser().valueChanges()
         this.list.subscribe(a => {
            this.userName = a.displayName;
          });
        });
    }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push([
      {
      message: msg,
      userName: this.userName,
      timeSent: timestamp,
      email: email 
    }
  ]
      );
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    // query to create our message feed binding
    //console.log(this.db.list('messages'))
    return this.db.list('messages')
 
    // , {
    //   query: {
    //     limitToLast: 25,
    //     orderByKey: true,
    //   }
    // }
  }
  getTimeStamp(): Date{
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    return now;
  }
}
