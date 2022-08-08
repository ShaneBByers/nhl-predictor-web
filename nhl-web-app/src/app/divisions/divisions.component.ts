import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { IDivision } from './division';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit 
{
  divisions: IDivision[] = []
  divisionsSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("DIVISIONS")
    this.divisionsSubscription = this.databaseService.getData<IDivision>(request).subscribe(
      {
        next: divisions =>
        {
          this.divisions = divisions
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.divisionsSubscription.unsubscribe()
  }
}
