import { Character } from '../../modules/character/class';
import { setRoutingBucket } from './functions/setRoutingBucket';

export class Player {
    public accountId: number;
    public pseudo: string;

    public character: Character;
    
    constructor(readonly source: number, pseudo: string, accountId: number) {
        this.pseudo = pseudo;
        this.accountId = accountId;
    };

    public addCharacter(character: Character) {
        this.character = character;
    }

    public setRoutingBucket(bucket: number): void {
        if(bucket == 0) {
            setRoutingBucket(this.source, 0, true, true);
            return;
        }

        setRoutingBucket(this.source, bucket, false, false);
    }
};

class _Players {
    public players: Player[] = [];

    constructor() {}


    public add(player: Player): void {
        this.players.push(player);
    }

    public remove(playerOrSource: Player|number): boolean {
        const index = this.players.findIndex((p) => p.source === (typeof playerOrSource === "number" ? playerOrSource : playerOrSource.source));

        if(index === -1) {
            return false;
        }

        this.players.splice(index, 1);
        return true;
    }

    public find(source: number): Player|undefined {
        return this.players.find((p) => p.source == source);
    }
}

export const Players = new _Players();