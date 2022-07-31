import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'games', component: GamesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
