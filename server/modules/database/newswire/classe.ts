import { oxmysql } from "@overextended/oxmysql"
import { NewswireObject } from "./types";

export class _NewswireRepo {
    private tableName: string = 'newswires';

    constructor(private readonly database: typeof oxmysql = oxmysql) {}

    async findAll(inGame: boolean = true): Promise<NewswireObject[]> {
        const response = await this.database.query<NewswireObject[]>(`SELECT * FROM \`${this.tableName}\` ORDER BY createdAt DESC`);

        if(inGame) {
            return response.filter((v) => v.inGame);
        }

        return response;
    }
}

export const NewswireRepository = new _NewswireRepo();