import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { IGoalieStats } from './goalie-stats';

@Component({
  selector: 'app-goalie-stats',
  templateUrl: './goalie-stats.component.html'
})
export class GoalieStatsComponent implements OnInit 
{
  pages: number[];
  goalieStats: IGoalieStats[] = [];

  pagesSubscription!: Subscription;
  goalieStatsSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "GOALIE_STATS", this.pageSize);
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
    this.goalieStatsSubscription = this.databaseService.getDataForPage<IGoalieStats>(1).subscribe(
      {
        next: goalieStats =>
        {
          this.goalieStats = goalieStats;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.goalieStatsSubscription = this.databaseService.getDataForPage<IGoalieStats>(page).subscribe(
      {
        next: goalieStats =>
        {
          this.goalieStats = goalieStats;
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.goalieStatsSubscription.unsubscribe();
  }
}
