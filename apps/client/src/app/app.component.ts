import { Component, ViewChild, ElementRef } from '@angular/core';

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
    Game.init(this.viewport.nativeElement);
  }
}