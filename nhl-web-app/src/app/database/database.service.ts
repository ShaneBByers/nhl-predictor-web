import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, Observable, throwError } from "rxjs";
import { DatabaseRequest } from "./database-request";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DatabaseService
{
    private selectUrl = 'http://www.api.nhl-predictor.com/select.php'

    constructor(private httpClient: HttpClient)
    {
        
    }

    getData<T>(request: DatabaseRequest): Observable<T[]>
    {
        console.log(request.queryList)
        let body: string = JSON.stringify(request)
        return this.httpClient.request<T[]>("POST", this.selectUrl, { body: body })
        .pipe(
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse): Observable<never>
    {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.text}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}