import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseWhere } from '../database/database-where';
import { DatabaseService } from '../database/database.service';
import { ITeam } from './team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy
{
  teams: ITeam[] = []
  teamsSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("TEAMS")
    this.teamsSubscription = this.databaseService.getData<ITeam>(request).subscribe(
      {
        next: teams =>
        {
          this.teams = teams
          console.log(this.teams)
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.teamsSubscription.unsubscribe()
  }
}
