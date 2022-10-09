import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { IGame } from './game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit 
{
  pages: number[];
  games: IGame[] = [];

  pagesSubscription!: Subscription;
  gamesSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "GAMES", this.pageSize);
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
    this.gamesSubscription = this.databaseService.getDataForPage<IGame>(1).subscribe(
      {
        next: games =>
        {
          this.games = games;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.gamesSubscription = this.databaseService.getDataForPage<IGame>(page).subscribe(
      {
        next: games =>
        {
          this.games = games;
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.gamesSubscription.unsubscribe();
  }

}
