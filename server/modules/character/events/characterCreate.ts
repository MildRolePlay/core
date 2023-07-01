import { Players } from '../../../modules/player/classe';
import { CharacterInsertDB } from '../../../modules/database/character';
import { Character } from '../class';
import EVENTS from '../event';
import { createCharacter } from '../functions/createCharacter';
import { spawnCharacter } from './characterSpawn';

onNet(EVENTS.create, async (data: string) => {
    console.log(source, data);
    
    const src = source;
    console.log(source, src, Players.players);
    const player = Players.find(src);

    console.log(player);

    const _c = JSON.parse(data) as Omit<CharacterInsertDB, 'accountId'>;
    const _pc = await createCharacter({accountId: player.accountId, ..._c});

    const character = new Character(_pc);
    player.addCharacter(character);

    spawnCharacter(src);
})