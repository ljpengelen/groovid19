import { Component, OnInit } from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';

@Component({
  selector: 'app-synchronizer',
  templateUrl: './synchronizer.component.html',
  styleUrls: ['./synchronizer.component.scss']
})
export class SynchronizerComponent implements OnInit {
  isSynchronizing = false;
  eventBus: EventBus.EventBus;

  constructor() {}

  ngOnInit(): void {
    this.eventBus = new EventBus('http://localhost:3003/eventBus');

    this.eventBus.onopen = () => {
      this.isSynchronizing = true;
      console.log('Opened connection to event bus');

      this.eventBus.registerHandler(
        'eventsFromServerToClients',
        {},
        (error, message) => {
          console.log('Received event', error, message);
        }
      );
    };

    this.eventBus.onclose = () => {
      this.isSynchronizing = false;
      console.log('Closed connection to event bus');
    };

    this.eventBus.onerror = (error) => {
      console.log('error', error.message);
    };
  }

  toggleSynchronization() {
    console.log('sending');
    this.eventBus.publish(
      'eventsFromClientsToServer',
      { message: 'hello from client' },
      {}
    );
  }
}
