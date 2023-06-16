import { oxmysql } from "@overextended/oxmysql";
import { AccountDto } from "./type";

class _AccountRepo {
    private tableName = 'accounts';

    constructor(private readonly db: typeof oxmysql = oxmysql) {}

    public async findByPseudo(pseudo: string): Promise<AccountDto|undefined> {
        const result = await this.db.single<AccountDto>(`SELECT * FROM \`${this.tableName}\` WHERE \`pseudo\` = ? LIMIT 1`, [pseudo]);
        return result;
    }

    public async create(data: Omit<AccountDto, 'id'|'createdAt'|'updatedAt'|'cgu'>): Promise<AccountDto> {
        const result = await this.db.insert<AccountDto>(`INSERT INTO \`${this.tableName}\` (pseudo, password, cgu, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW(), NOW())`, [data.pseudo, data.password]);
        return result;
    }
}

export const AccountRepository = new _AccountRepo();