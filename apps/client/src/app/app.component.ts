import { Component } from '@angular/core';
import { Action } from '@multiplayer-game/protobuf';

@Component({
  selector: 'multiplayer-game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  ngOnInit(): void {
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      const message = new Action({
        login: {name: '   x dx   rrr '},
        action: 'login',
      });
      
      const buffer = Action.encode(message).finish();
      
      socket.send(buffer);
    }
  }
}
