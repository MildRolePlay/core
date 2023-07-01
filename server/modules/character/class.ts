import { CharacterDTO } from "../../modules/database/character";

export class Character {
    public id: number;

    public firstName: string;
    public lastName: string;
    public sexe: boolean;
    public birth: Date;

    public lastX: number;
    public lastY: number;
    public lastZ: number;
    public lastRot: number;

    public createdAt: Date;
    public updatedAt: Date;

    constructor(character: CharacterDTO) {
        this.id = character.id;
        this.firstName = character.firstName;
        this.lastName = character.lastName;
        this.sexe = character.sexe;
        this.birth = character.birth;

        this.lastX = character.lastX;
        this.lastY = character.lastY;
        this.lastZ = character.lastZ;
        this.lastRot = character.lastRot;

    }

    public getLastPosition(): [number, number, number, number] {
        return [this.lastX, this.lastY, this.lastZ, this.lastRot];
    }
}