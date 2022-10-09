import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { IDivision } from './division';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html'
})
export class DivisionsComponent implements OnInit 
{
  pages: number[];
  divisions: IDivision[] = [];

  pagesSubscription!: Subscription;
  divisionsSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "DIVISIONS", this.pageSize);
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
    this.divisionsSubscription = this.databaseService.getDataForPage<IDivision>(1).subscribe(
      {
        next: divisions =>
        {
          this.divisions = divisions;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.divisionsSubscription = this.databaseService.getDataForPage<IDivision>(page).subscribe(
      {
        next: divisions =>
        {
          this.divisions = divisions;
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.divisionsSubscription.unsubscribe();
  }
}
