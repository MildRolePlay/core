export type ClotheType = 'mask'|'hair'|'torso'|'leg'|'bag'|'shoes'|'accessory'|'undershirt'|'kevlar'|'badge'|'torso_2'|'hat'|'glass'|'ear'|'watch'|'bracelet'

export interface BaseClothe {
    id: number;
    type: ClotheType;
    draw: number;
    texture: number;
    palette: number;
}