import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { IGame } from './game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit 
{
  games: IGame[] = []
  gamesSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("GAMES")
    this.gamesSubscription = this.databaseService.getData<IGame>(request).subscribe(
      {
        next: games =>
        {
          this.games = games
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.gamesSubscription.unsubscribe()
  }

}
