import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { IPlayer } from './player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit 
{
  pages: number[];
  players: IPlayer[] = [];

  pagesSubscription!: Subscription;
  playersSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "PLAYERS", this.pageSize);
  }

  ngOnInit(): void 
  {
    this.pagesSubscription = this.databaseService.getPageCount().subscribe(
      {
        next: databaseCountList =>
        {
          let pageCount = Math.ceil(databaseCountList[0].NUM_ROWS / this.pageSize);
          let pages = []
          for (let i = 1; i < pageCount + 1; i++)
          {
            pages.push(i);
          }
          this.pages = pages;
        }
      }
    );
    this.playersSubscription = this.databaseService.getDataForPage<IPlayer>(1).subscribe(
      {
        next: players =>
        {
          this.players = players;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.players = []
    this.playersSubscription = this.databaseService.getDataForPage<IPlayer>(page).subscribe(
      {
        next: players =>
        {
          this.players = players;
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.playersSubscription.unsubscribe();
  }
}
