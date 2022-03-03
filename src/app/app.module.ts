import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { ChatFormComponent } from './chatform/chatform.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';


const config = {
  apiKey: 'AIzaSyBcwC1JIR64E1MyFrtPNGO1g-NcU-FMlbg',
  authDomain: 'chat-app-feec7.firebaseapp.com',
  databaseURL: 'https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-app-feec7',
  storageBucket: 'chat-app-feec7.appspot.com',
  messagingSenderId: '1027487966847',
  appId: '1:1027487966847:web:2a2f04b9cea40de1e2414a'
}

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
