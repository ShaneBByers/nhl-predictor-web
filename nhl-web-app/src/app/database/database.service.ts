import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, Observable, throwError } from "rxjs";
import { IDatabaseCount } from "./database-count";
import { DatabaseRequest } from "./database-request";
import { DatabaseWhere } from "./database-where";

export class DatabaseService
{
    private selectUrl = 'http://www.api.nhl-predictor.com/select.php'

    constructor(private httpClient: HttpClient,
                private tableName: string,
                private pageSize: number = 100,
                public whereList: DatabaseWhere[] = [])
    {

    }

    getPageCount(): Observable<IDatabaseCount[]>
    {
        let request = new DatabaseRequest();
        request.setCountQuery(this.tableName, this.whereList);
        return this.postRequest<IDatabaseCount[]>(request);
    }

    getDataForPage<T>(page: number): Observable<T[]>
    {
        let startIndex = (page - 1) * this.pageSize;
        let request = new DatabaseRequest();
        request.setQuery(this.tableName, startIndex, this.pageSize, this.whereList);
        return this.postRequest<T[]>(request);
    }

    private postRequest<T>(request: DatabaseRequest): Observable<T>
    {
        console.log(request.queryList[0])
        let body: string = JSON.stringify(request)
        return this.httpClient.request<T>("POST", this.selectUrl, { body: body })
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never>
    {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) 
        {
            errorMessage = `An error occurred: ${err.error.message}`;
        } 
        else 
        {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.text}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}