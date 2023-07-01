export interface CharacterDTO {
    id: number,
    accountId: number,
    firstName: string,
    lastName: string,
    sexe: boolean,
    birth: Date,
    lastX: number,
    lastY: number,
    lastZ: number,
    lastRot: number,
    createdAt: Date,
    updatedAt: Date
}

export type CharacterInsertDB = Omit<CharacterDTO, 'id'|'lastX'|'lastY'|'lastZ'|'lastRot'|'createdAt'|'updatedAt'>