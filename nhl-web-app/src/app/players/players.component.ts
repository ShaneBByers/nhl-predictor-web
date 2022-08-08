import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { IPlayer } from './player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit 
{
  players: IPlayer[] = []
  playersSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("PLAYERS")
    this.playersSubscription = this.databaseService.getData<IPlayer>(request).subscribe(
      {
        next: players =>
        {
          this.players = players
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.playersSubscription.unsubscribe()
  }
}
