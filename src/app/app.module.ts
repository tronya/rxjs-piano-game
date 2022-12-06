import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { GameService } from './game/game.service';
import { MidiService } from './game/midi.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { AudioService } from './game/audio.service';
@NgModule({
  declarations: [AppComponent, GameComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [GameService, MidiService, AudioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
