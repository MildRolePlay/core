export type ClotheComponentType = 'mask'|'torso'|'leg'|'bag'|'shoes'|'accessory'|'undershirt'|'kevlar'|'badge'|'torso_2'|'hat'|'glass'|'ear'|'watch'|'bracelet'
export type ClotheGroupType = "leg"|'top'|'shoes'|'mask'|'bag'|'kevlar'|'hat'|'glasses'|'ears'|'watch'|'bracelet';

export interface components {
    type: ClotheComponentType,
    draw: number,
    texture: number,
    palette: number
}

export interface clothe {
    gender: boolean,
    name: string,
    type: ClotheComponentType,
    isCreateCharacterAvailable: boolean,
    price: number,
    clothes: components[]
}