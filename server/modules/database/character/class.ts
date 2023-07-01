import { oxmysql } from "@overextended/oxmysql";
import { CharacterDTO } from "./type";

class _CharacterRepo {
    constructor(private readonly tableName: string = 'characters', private readonly db: typeof oxmysql = oxmysql) {}

    public async findByAccountId(accountId: number): Promise<CharacterDTO|undefined> {
        const c = await this.db.single<CharacterDTO>(`SELECT * FROM \`${this.tableName}\` WHERE accountId = ? LIMIT 1`, [accountId]);
        return c;
    }

    public async create(character: Omit<CharacterDTO, 'id'|'lastX'|'lastY'|'lastZ'|'lastRot'|'createdAt'|'updatedAt'>): Promise<number> {
        const result = await this.db.insert(`INSERT INTO \`${this.tableName}\` (accountId, firstName, lastName, sexe, birth, lastX, lastY, lastZ, lastRot, createdAt, updatedAt) VALUES
                                            (?, ?, ?, ?, ?, 0, 0, 0, 0, NOW(), NOW())`, [character.accountId, character.firstName, character.lastName, character.sexe, character.birth]);
        return result;
    }
}

export const CharacterRepository = new _CharacterRepo();