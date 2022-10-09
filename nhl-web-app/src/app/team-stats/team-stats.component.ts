import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { ITeamStats } from './team-stats';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html'
})
export class TeamStatsComponent implements OnInit 
{
  pages: number[];
  teamStats: ITeamStats[] = [];

  pagesSubscription!: Subscription;
  teamStatsSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "TEAM_STATS", this.pageSize);
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
    this.teamStatsSubscription = this.databaseService.getDataForPage<ITeamStats>(1).subscribe(
      {
        next: teamStats =>
        {
          this.teamStats = teamStats;
        }
      }
    );
  }
  
  goToPage(page: number): void
  {
    this.teamStatsSubscription = this.databaseService.getDataForPage<ITeamStats>(page).subscribe(
      {
        next: teamStats =>
        {
          this.teamStats = teamStats;
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.teamStatsSubscription.unsubscribe();
  }
}
