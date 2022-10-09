import { DatabaseLogin } from "./database-login"
import { DatabaseWhere } from "./database-where"

export class DatabaseRequest
{
    databaseLogin = new DatabaseLogin()
    queryList: string[] = []

    setQuery(tableName: string,
             startIndex: number,
             rowCount: number,
             whereList: DatabaseWhere[] = [])
    {
        let query = this.getBaseQuery(tableName, whereList);
        query += " LIMIT " + startIndex + "," + rowCount + ";";
        this.queryList = [query];
    }

    setCountQuery(tableName: string,
                  whereList: DatabaseWhere[] = []): void
    {
        let query = this.getBaseQuery(tableName, whereList);
        query = "SELECT COUNT(*) AS NUM_ROWS FROM (" + query + ") AS QUERY;";
        this.queryList = [query];
    }

    private getBaseQuery(tableName: string,
                         whereList: DatabaseWhere[]): string
    {
        let query = "SELECT * FROM " + tableName;
        if (whereList.length)
        {
            query += " WHERE (";
            for (const where of whereList)
            {
                const valueString = isNaN(where.value) ? "'" + where.value + "'" : where.value;
                query += where.columnName + " " + where.operation + " " + valueString + " AND ";
            }
            query = query.slice(0, -5);
            query += ")";
        }
        return query;
    }
}