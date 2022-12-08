import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AudioService } from './audio.service';
import { GamePosibleDirrections, MIDI_NOTES } from './game.model';
import { GameService } from './game.service';
import { InputService } from './input.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public keys = this.gameService.gameKeysChain$;

  constructor(
    public gameService: GameService,
    private audioService: AudioService,
    private inputService: InputService
  ) {}

  public buttonPress(key: GamePosibleDirrections) {
    console.log(`${key} pressed`);
    this.audioService.play(MIDI_NOTES[key]);
    this.gameService.pushKeyNote(key);
  }

  public gameStart() {
    this.gameService.startGame();
  }

  ngOnInit(): void {
    this.inputService.keyAction.subscribe((direction) => {
      this.buttonPress(direction);
    });

    this.gameService
      .gameChain()
      .pipe(
        map((note: GamePosibleDirrections) => {
          this.audioService.play(MIDI_NOTES[note]);
        })
      )
      .subscribe((flow) => {
        console.info('==>', flow);
      });
  }
}
