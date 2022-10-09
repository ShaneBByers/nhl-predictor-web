import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { ITeam } from './team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit, OnDestroy
{
  pages: number[];
  teams: ITeam[] = [];

  pagesSubscription!: Subscription;
  teamsSubscription!: Subscription;
  
  private databaseService: DatabaseService;
  private pageSize = 100;

  constructor(httpClient: HttpClient) 
  { 
    this.pages = [1];
    this.databaseService = new DatabaseService(httpClient, "TEAMS", this.pageSize);
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
    this.teamsSubscription = this.databaseService.getDataForPage<ITeam>(1).subscribe(
      {
        next: teams =>
        {
          this.teams = teams;
        }
      }
    );
  }

  goToPage(page: number): void
  {
    this.teamsSubscription = this.databaseService.getDataForPage<ITeam>(page).subscribe(
      {
        next: teams =>
        {
          this.teams = teams;
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.pagesSubscription.unsubscribe();
    this.teamsSubscription.unsubscribe();
  }
}
