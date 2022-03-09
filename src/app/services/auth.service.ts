import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authState: any;
  count = 0;
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log('lineno:31', this.authState);
        // this.setUserStatus('online', this.authState);
        this.router.navigate(['friends']);
        localStorage.setItem('uid', this.authState.user.uid);
        console.log('login' + localStorage.getItem('uid'));


      });
  }

  logout() {
    this.setUserStatus('offline', this.authState);
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status, this.authState);
        localStorage.setItem('uid', this.authState.user.uid);
        console.log('signUp' + localStorage.getItem('uid'));
      }).catch(
        error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string, authState: any): void {
    // const path = `users/data`;
    // const path = `users/${email}`;

    // console.log(authState.user.uid);
    const path = `users/${authState.user.uid}`;

    // this.count++;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string, authState: any): void {
    const temp = localStorage.getItem('uid');
    console.log("login" + temp);
    const path = `userstatus/${temp}`;


    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
