import { DatabaseLogin } from "./database-login"
import { DatabaseWhere } from "./database-where"

export class DatabaseRequest
{
    databaseLogin = new DatabaseLogin()
    queryList: string[] = []

    constructor(tableName: string, whereList: DatabaseWhere[] = [])
    {
        let query = "SELECT * FROM " + tableName
        if (whereList.length)
        {
            query += " WHERE ("
            for (const where of whereList)
            {
                const valueString = isNaN(where.value) ? "'" + where.value + "'" : where.value;
                query += where.columnName + " " + where.operation + " " + valueString + " AND ";
            }
            query = query.slice(0, -5);
            query += ")"
        }
        query += ";"
        this.queryList.push(query)
    }
}