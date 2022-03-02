// import { BrowserModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TempComponent } from './temp/temp.component';
import {getDatabase} from 'firebase/database'
import { initializeApp } from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBcwC1JIR64E1MyFrtPNGO1g-NcU-FMlbg',
  authDomain: 'chat-app-feec7.firebaseapp.com',
  databaseURL: 'https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-app-feec7',
  storageBucket: 'chat-app-feec7.appspot.com',
  messagingSenderId: '1027487966847',
  appId: '1:1027487966847:web:2a2f04b9cea40de1e2414a'
}
// const app = initializeApp(config)
// const database = getDatabase(app)

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
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
