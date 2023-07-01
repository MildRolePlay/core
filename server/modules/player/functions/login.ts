import { loadCharacter } from "../../../modules/character/functions/loadCharacter";
import { AccountDto } from "../../../modules/database/account";
import {Player, Players } from '../classe';

export const login = (source: number, account: AccountDto) => {
    const p = new Player(source, account.pseudo, account.id);
    Players.add(p);

    loadCharacter(p);
}