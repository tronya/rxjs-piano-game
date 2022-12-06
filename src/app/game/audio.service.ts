import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {
  public audio: HTMLAudioElement | undefined;
  constructor() {}

  private generateLink(note: string) {
    const PATH = `./assets/sounds/${note}.mp3`;
    return PATH;
  }

  public play(note: string) {
    this.audio = new Audio(this.generateLink(note));
    this.audio.play();
  }

  public stop() {
    if (!this.audio) return;
    this.audio.pause();
  }
}
