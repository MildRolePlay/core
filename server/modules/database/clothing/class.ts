import { oxmysql } from "@overextended/oxmysql";
import { ClothesGroupsDB } from "./dts/clothes-groups.dto";

class _ClotheGroup {

    private clothesGroup: ClothesGroupsDB[] = [];

    constructor(private readonly groupTableName: string = "clothesgroups", private readonly clotheTableName: string = "clothes", private readonly db: typeof oxmysql = oxmysql) {}

    public async init(): Promise<ClothesGroupsDB[]> {
        const result = await this.db.query<any[]>(`SELECT *, c.id as cid, cg.id AS cgid, cg.type AS cgtype, c.type AS ctype FROM \`${this.groupTableName}\` as cg LEFT JOIN \`${this.clotheTableName}\` as c ON cg.id = c.groupId ORDER BY cg.createdAt DESC`);

        result.forEach((c) => {
            if(this.findGroupIndex(c.cgid) == -1) {
                this.clothesGroup.push(this.transformDBRowToGroup(c));
            }
            else {
                const i = this.findGroupIndex(c.cgid);
                this.clothesGroup[i].clothes.push({
                    id: c.cid,
                    type: c.ctype,
                    draw: c.draw,
                    texture: c.texture,
                    palette: c.palette
                });
            }
        });

        return this.clothesGroup;
    }

    private findGroupIndex(groupId: number): number {
        return this.clothesGroup.findIndex((c) => c.id == groupId);
    }

    private transformDBRowToGroup(row: any): ClothesGroupsDB {
        return {
            id: row.cgid,
            type: row.cgtype,
            name: row.name,
            gender: row.gender,
            isCreateCharacterAvailable: row.isCreateCharacterAvailable,
            price: row.price,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            clothes: [
                {
                    id: row.cid,
                    type: row.ctype,
                    draw: row.draw,
                    texture: row.texture,
                    palette: row.palette
                }
            ]
        };
    }
}

export const ClotheRepository = new _ClotheGroup();