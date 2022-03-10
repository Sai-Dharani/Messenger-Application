import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
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
  

  constructor(private chatService:ChatService) {
    this.displayName = this.chatService.userName;
   }
  

  ngOnInit() {
  }

}
