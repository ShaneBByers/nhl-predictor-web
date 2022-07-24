export class DatabaseWhere
{
    constructor(public columnName: string,
                public operation: string,
                public value: any)
    {
        
    }
}