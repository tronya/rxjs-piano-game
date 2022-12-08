import { Injectable } from '@angular/core';
import {
  concatMap,
  delay, Observable,
  of,
  Subject,
  switchMap
} from 'rxjs';
import { GameAllowedKeys, GamePosibleDirrections } from './game.model';

@Injectable()
export class GameService {
  private gameKeysChain: GamePosibleDirrections[] = [];
  public gameKeysChain$: Subject<GamePosibleDirrections[]> = new Subject();
  private iteration: number = 0;

  public randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public pushKeyNote(key: GamePosibleDirrections) {
    if (this.gameKeysChain[this.iteration] === key) {
      console.log('good');
      this.iteration++;
    } else {
      console.log('bad');
      this.iteration = 0;
    }

    if (this.gameKeysChain.length === this.iteration) {
      console.log('this game raund is finished');
      this.pushNoteToChain();
      this.iteration = 0;
    }
  }

  public getRandomKey(): GamePosibleDirrections {
    const randomNumber = this.randomIntFromInterval(0, 3);
    const possibleKeys: GamePosibleDirrections[] =
      Object.values(GameAllowedKeys);
    return possibleKeys[randomNumber];
  }

  public pushNoteToChain() {
    this.gameKeysChain.push(this.getRandomKey());
    this.gameKeysChain$.next(this.gameKeysChain);
  }

  public startGame() {
    if (!this.gameKeysChain.length) {
      this.pushNoteToChain();
    }
  }
  public gameChain(): Observable<GamePosibleDirrections> {
    return this.gameKeysChain$.pipe(
      delay(1000),
      switchMap((r) => r),
      concatMap((val) => {
        console.log(val);
        return of(val).pipe(delay(1000));
      })
    );
  }
}
