import { BaseClothe } from "./clothes.dts";

export type ClotheGroupType = "leg"|'top'|'shoes'|'mask'|'bag'|'kevlar'|'hat'|'glasses'|'ears'|'watch'|'bracelet';

export interface ClothesGroupsDB {
    id: number;
    name: string;

    type: ClotheGroupType;

    gender: boolean;
    isCreateCharacterAvailable: boolean;
    price: number;

    createdAt: Date;
    updatedAt: Date;

    clothes: BaseClothe[]
}