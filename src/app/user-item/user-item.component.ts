import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ChatMessage } from '../models/chat-message.model';
 import { User } from '../models/user.model';
 import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  displayName: any;
  

  constructor(private chatService:ChatService, private db: AngularFireDatabase,private http:HttpClient) {
    this.displayName = this.chatService.userName;
    console.log(this.displayName)
    this.http.post('https://chat-app-feec7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', this.displayName)
   }
  

  ngOnInit() {
  }

}
