import { ClotheComponentType } from "./types"

export const getApplyFunction = (type: ClotheComponentType): Function => {
    switch(type) {
        case 'hat': case "glass": case 'ear': case 'watch': case 'bracelet':
            return SetPedPropIndex
        default:
            return SetPedComponentVariation
    }
}

export const getApplyIndex = (type: ClotheComponentType): number => {
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

export const getMaxDrawableFunction = (type: ClotheComponentType): Function => {
    switch(type) {
        case 'hat': case "glass": case 'ear': case 'watch': case 'bracelet':
            return GetNumberOfPedPropDrawableVariations
        default:
            return GetNumberOfPedDrawableVariations
    }
}

export const getMaxTextureFunction = (type: ClotheComponentType): Function => {
    switch(type) {
        case 'hat': case "glass": case 'ear': case 'watch': case 'bracelet':
            return GetNumberOfPedPropTextureVariations
        default:
            return GetNumberOfPedTextureVariations
    }
}