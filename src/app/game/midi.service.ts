import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable()
export class MidiService {
  private context = new AudioContext();
  private oscillators: any = {};

  public noteAccessor = (freq: number) =>
    new Observable((subscriber) => {
      console.log(freq);
      this.playNote(freq);
      subscriber.next('Note played');
      setTimeout(() => {
        this.stopNote(freq);
        subscriber.next('Note stoped');
        subscriber.complete();
      }, 1000);
    });

  constructor() {
    this.requestMidiAccess();
  }

  private midiNoteToFrequency(note: number) {
    return Math.pow(2, (note - 69) / 12) * 440;
  }

  private requestMidiAccess() {
    /* @ts-ignore */
    navigator.requestMIDIAccess().then((access: any) => {
      console.log('access', access);
      access.inputs.values();
    });
  }

  public playNote(frequency: number) {
    this.oscillators[frequency] = this.context.createOscillator();
    this.oscillators[frequency].frequency.value = frequency;
    this.oscillators[frequency].connect(this.context.destination);
    this.oscillators[frequency].start(this.context.currentTime);
  }

  public stopNote(frequency: number) {
    this.oscillators[frequency].stop(this.context.currentTime);
    this.oscillators[frequency].disconnect();
  }
}
