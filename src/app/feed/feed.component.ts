import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: any;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.getMessages().valueChanges().subscribe(data => {
      this.feed = data;
      })
  }

  ngOnChanges() {
    this.chat.getMessages().valueChanges().subscribe(data => {
      this.feed = data;
    })
  }

}
