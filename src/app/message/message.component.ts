import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService, private chat : ChatService) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    })
    console.log(this.timeStamp)
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }
}
