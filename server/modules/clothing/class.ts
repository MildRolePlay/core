import { ClotheGroupType, ClotheType, ClothesGroupsDB } from "../../modules/database/clothing";

class _Clothes {
    constructor(private clothes: ClothesGroupsDB[]) {}

    public setClotheLib(clothes: ClothesGroupsDB[]) {
        this.clothes = clothes;
    }

    public appendClothe(clothe: ClothesGroupsDB) {
        this.clothes.push(clothe);

        console.log(this.clothes);
    }

    public findAllClothesByType(type: ClotheGroupType, gender: boolean, isCreateCharacter: boolean = false): ClothesGroupsDB[] {
        return this.clothes.filter((c) => c.type === type && c.gender == gender && isCreateCharacter == isCreateCharacter)
    }

    public applyPedClothe(source: number, clotheGroupId: number): void {
        const clothe = this.findByIndex(clotheGroupId);
        
        clothe.clothes.forEach((c) => {
            const apply = this.getApplyFunction(c.type);
            apply(GetPlayerPed(source.toString()), this.getApplyIndex(c.type), c.draw, c.texture, c.palette);
        })
    }

    private findByIndex(id: number): ClothesGroupsDB {
        return this.clothes.find((c) => c.id == id);
    }

    private getApplyFunction(type: ClotheType): Function {
        switch(type) {
            case 'hat': case "glass": case 'ear': case 'watch': case 'bracelet':
                return SetPedPropIndex
            default:
                return SetPedComponentVariation
        }
    }

    private getApplyIndex(type: ClotheType): number {
        switch (type) {
            case 'hat': return 0;
            case 'mask': case 'glass': return 1;
            case 'ear': return 2;
            case 'torso': return 3;
            case 'leg': return 4;
            case 'bag': return 5;
            case 'shoes': case 'watch': return 6;
            case 'accessory': case 'bracelet': return 7;
            case 'undershirt': return 8;
            case 'kevlar': return 9;
            case 'badge': return 10;
            case 'torso_2': return 11;
        }
    }

    
    public find(gender: boolean, createCharacter: boolean): {id: number, name: string, price: number, type: string}[] {
        return this.clothes.filter((c) => c.gender === gender && c.isCreateCharacterAvailable == createCharacter).map<{id: number, name: string, price: number, type: string}>((c) => {return {id: c.id, name: c.name, price: c.price, type: c.type};});
    }
}

export const Clothes = new _Clothes([]);

global.exports('ClothingsFindClothes', (gender: boolean, createCharacter: boolean) => Clothes.find(gender, createCharacter));
global.exports('ClothingsApply', (source: number, id: number) => Clothes.applyPedClothe(source, id));