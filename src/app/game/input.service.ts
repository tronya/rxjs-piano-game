import { Injectable } from '@angular/core';
import { Observable, fromEvent, filter, map, merge } from 'rxjs';
import { GamePosibleDirrections, GameAllowedKeys } from './game.model';

@Injectable()
export class InputService {
  public keyAction: Observable<GamePosibleDirrections> =
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      // distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type),
      filter((event) => Object.keys(GameAllowedKeys).includes(event.code)),
      map(
        (event) => GameAllowedKeys[event.code as keyof typeof GameAllowedKeys]
      )
    );

  public mouseCliked: Observable<Event> = merge(
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'mousedown'),
    fromEvent(document, 'mousemove')
  ).pipe(
    map((event) => {
      return event;
    })
  );
}
