import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { ISkaterStats } from './skater-stats';

@Component({
  selector: 'app-skater-stats',
  templateUrl: './skater-stats.component.html',
  styleUrls: ['./skater-stats.component.css']
})
export class SkaterStatsComponent implements OnInit 
{
  skaterStats: ISkaterStats[] = []
  skaterStatsSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("SKATER_STATS")
    this.skaterStatsSubscription = this.databaseService.getData<ISkaterStats>(request).subscribe(
      {
        next: skaterStats =>
        {
          this.skaterStats = skaterStats
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.skaterStatsSubscription.unsubscribe()
  }
}
