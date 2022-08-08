import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { ITeamStats } from './team-stats';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit 
{
  teamStats: ITeamStats[] = []
  teamStatsSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("TEAM_STATS")
    this.teamStatsSubscription = this.databaseService.getData<ITeamStats>(request).subscribe(
      {
        next: teamStats =>
        {
          this.teamStats = teamStats
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.teamStatsSubscription.unsubscribe()
  }
}
