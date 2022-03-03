import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatform',
  templateUrl: './chatform.component.html',
  styleUrls: ['./chatform.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
    console.log(this.message)
  }

  handleSubmit(event: { keyCode: number; }) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}