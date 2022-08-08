import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseRequest } from '../database/database-request';
import { DatabaseService } from '../database/database.service';
import { IConference } from './conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit 
{
  conferences: IConference[] = []
  conferencesSubscription!: Subscription

  constructor(private databaseService: DatabaseService) 
  { 

  }

  ngOnInit(): void 
  {
    const request = new DatabaseRequest("CONFERENCES")
    this.conferencesSubscription = this.databaseService.getData<IConference>(request).subscribe(
      {
        next: conferences =>
        {
          this.conferences = conferences
        }
      }
    )
  }

  ngOnDestroy(): void
  {
    this.conferencesSubscription.unsubscribe()
  }
}
