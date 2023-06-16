export class Player {
    private accountId: number;
    public pseudo: string;
    
    constructor(readonly source: number, pseudo: string, accountId: number) {
        this.pseudo = pseudo;
        this.accountId = accountId;
    };
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
}

export const Players = new _Players();