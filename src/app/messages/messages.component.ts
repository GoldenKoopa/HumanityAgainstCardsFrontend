import { Component, OnInit } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { rxStompServiceFactory } from '../rx-stomp-service-factory';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
})
export class MessagesComponent implements OnInit {
  receivedMessages: string[] = [];

  constructor(private rxStompService: RxStompService) {}

  ngOnInit(): void {
    this.rxStompService
      .watch('/topic/greetings')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });
  }

  onSendMessage() {
    const message = `Message generated at ${new Date()}`;
    this.rxStompService.publish({ destination: '/app/hello', body: message });
  }
}
