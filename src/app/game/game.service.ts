import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  delay,
  filter,
  from,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GameAllowedKeys, GamePosibleDirrections } from './game.model';

@Injectable()
export class GameService {
  private gameKeysChain: GamePosibleDirrections[] = [];

  public keyAction: Observable<GamePosibleDirrections> =
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      // distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type),
      filter((event) => Object.keys(GameAllowedKeys).includes(event.code)),
      map(
        (event) => GameAllowedKeys[event.code as keyof typeof GameAllowedKeys]
      )
    );

  public randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public mouseCliked: Observable<Event> = merge(
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'mousedown'),
    fromEvent(document, 'mousemove')
  ).pipe(
    map((event) => {
      console.log(event);
      return event;
    })
  );

  public getRandomKey(): GamePosibleDirrections {
    const randomNumber = this.randomIntFromInterval(0, 3);
    console.log(randomNumber);
    const possibleKeys: GamePosibleDirrections[] =
      Object.values(GameAllowedKeys);

    console.log(possibleKeys[randomNumber]);
    return possibleKeys[randomNumber];
  }

  public pushKeyToChain() {
    return this.gameKeysChain.push(this.getRandomKey());
  }

  public startGame(): Observable<GamePosibleDirrections> {
    console.log(
      '%c Game started',
      'color:green; font-size:24px; display:block; text-transform: uppercase'
    );
    this.pushKeyToChain();

    console.log(this.gameKeysChain)

    return from(this.gameKeysChain).pipe(
      concatMap((val) => of(val as GamePosibleDirrections).pipe(delay(1000)))
    );
  }
}
