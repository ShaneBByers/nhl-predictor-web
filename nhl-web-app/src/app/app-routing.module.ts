import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferencesComponent } from './conferences/conferences.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { GamesComponent } from './games/games.component';
import { GoalieStatsComponent } from './goalie-stats/goalie-stats.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { SkaterStatsComponent } from './skater-stats/skater-stats.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'conferences', component: ConferencesComponent },
  { path: 'divisions', component: DivisionsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'games', component: GamesComponent },
  { path: 'team-stats', component: TeamStatsComponent },
  { path: 'skater-stats', component: SkaterStatsComponent },
  { path: 'goalie-stats', component: GoalieStatsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
