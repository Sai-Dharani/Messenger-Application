import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { AngularFireList } from '@angular/fire/compat/database/interfaces'
import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/user.model';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  getUser() {
    const userId = this.user.email;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push(
      {
        message: msg,
        userName: this.userName,
        email: email,
      }
    );
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list(`message/${this.userName}`, ref => ref.orderByKey().limitToLast(25));
  }

}
