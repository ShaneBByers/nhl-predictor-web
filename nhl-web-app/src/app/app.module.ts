import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConferencesComponent } from './conferences/conferences.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { PlayersComponent } from './players/players.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { SkaterStatsComponent } from './skater-stats/skater-stats.component';
import { GoalieStatsComponent } from './goalie-stats/goalie-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    GamesComponent,
    HomeComponent,
    ConferencesComponent,
    DivisionsComponent,
    PlayersComponent,
    TeamStatsComponent,
    SkaterStatsComponent,
    GoalieStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
