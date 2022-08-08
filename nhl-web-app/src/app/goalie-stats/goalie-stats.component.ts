import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { IGoalieStats } from './goalie-stats';

@Component({
  selector: 'app-goalie-stats',
  templateUrl: './goalie-stats.component.html',
  styleUrls: ['./goalie-stats.component.css']
})
export class GoalieStatsComponent implements OnInit 
{
  goalieStats: IGoalieStats[] = []
  goalieStatsSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("GOALIE_STATS")
    this.goalieStatsSubscription = this.databaseService.getData<IGoalieStats>(request).subscribe(
      {
        next: goalieStats =>
        {
          this.goalieStats = goalieStats
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.goalieStatsSubscription.unsubscribe()
  }
}
