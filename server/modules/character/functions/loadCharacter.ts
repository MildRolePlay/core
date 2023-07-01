import { CharacterRepository } from "../../../modules/database/character"
import { Player } from "../../../modules/player/classe"
import { Character } from "../class";

import EVENT from '../event';

export const loadCharacter = async (player: Player) => {
    const character = await CharacterRepository.findByAccountId(player.accountId);

    if(!character) {
        emit(EVENT.notFound, player.source);
    } else {
        emit(EVENT.found, player.source, JSON.stringify(character));
        const _c = new Character(character);
        player.addCharacter(_c);
    }

    return true;
}