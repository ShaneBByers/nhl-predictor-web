import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { ISkaterStats } from './skater-stats';

@Component({
  selector: 'app-skater-stats',
  templateUrl: './skater-stats.component.html'
})
export class SkaterStatsComponent implements OnInit 
{
  pages: number[];
  skaterStats: ISkaterStats[] = [];

  pagesSubscription!: Subscription;
  skaterStatsSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "SKATER_STATS", this.pageSize);
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
    this.skaterStatsSubscription = this.databaseService.getDataForPage<ISkaterStats>(1).subscribe(
      {
        next: skaterStats =>
        {
          this.skaterStats = skaterStats;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.skaterStats = []
    this.skaterStatsSubscription = this.databaseService.getDataForPage<ISkaterStats>(page).subscribe(
      {
        next: skaterStats =>
        {
          this.skaterStats = skaterStats;
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.skaterStatsSubscription.unsubscribe();
  }
}
