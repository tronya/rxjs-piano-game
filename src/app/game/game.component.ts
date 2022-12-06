import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service';
import { GamePosibleDirrections, MIDI_NOTES } from './game.model';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    public gameService: GameService,
    private audioService: AudioService
  ) {}

  public buttonPress(key: GamePosibleDirrections) {
    console.log(`${key} pressed`);
    this.audioService.play(MIDI_NOTES[key]);
  }

  public gameStart() {
    this.gameService.startGame().subscribe((flow: GamePosibleDirrections) => {
      console.info('==>', flow);
      this.audioService.play(MIDI_NOTES[flow]);
    });
  }
  ngOnInit(): void {
    this.gameService.keyAction.subscribe((direction) => {
      this.buttonPress(direction);
    });

    //this.gameService.mouseCliked.subscribe((event: Event) => console.log("mouse", event))
  }
}
