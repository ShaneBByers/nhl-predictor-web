import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { IConference } from './conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html'
})
export class ConferencesComponent implements OnInit 
{
  pages: number[];
  conferences: IConference[] = [];

  pagesSubscription!: Subscription;
  conferencesSubscription!: Subscription;

  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "CONFERENCES", this.pageSize);
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
    this.conferencesSubscription = this.databaseService.getDataForPage<IConference>(1).subscribe(
      {
        next: conferences =>
        {
          this.conferences = conferences;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.conferencesSubscription = this.databaseService.getDataForPage<IConference>(page).subscribe(
      {
        next: conferences =>
        {
          this.conferences = conferences;
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.conferencesSubscription.unsubscribe();
  }
}
