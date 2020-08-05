import { Component, ViewChild, ElementRef } from '@angular/core';

import { Action } from '@multiplayer-game/protobuf';
import Game from '../game/main';

@Component({
  selector: 'multiplayer-game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  @ViewChild('viewport', {static: true}) viewport: ElementRef;

  ngOnInit(): void {
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      const message = new Action({
        login: {name: '   x dx   rrr '},
        action: 'login',
      });
      
      const buffer = Action.encode(message).finish();
      
      socket.send(buffer);

      Game.init(this.viewport.nativeElement);
    }
  }
}
