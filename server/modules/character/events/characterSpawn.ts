import { Players } from '../../../modules/player/classe';
import EVENTS from '../event'

export const spawnCharacter = (source: number) => {
    const src = source;
    const player = Players.find(source);

    const character = player.character;

    if(character.lastX == 0.0 && character.lastY == 0.0 && character.lastZ == 0.0) {
        SetEntityCoords(GetPlayerPed(src.toString()), -1087.5032958984375, -2728.589111328125, -7.4190673828125, true, false, false, false);
    }
    else {
        SetEntityCoords(GetPlayerPed(src.toString()), player.character.lastX, player.character.lastY, player.character.lastZ, true, false, false, false);
    }

    SetEntityHeading(GetPlayerPed(src.toString()), player.character.lastRot);

    player.setRoutingBucket(0);
    
    Entity(GetPlayerPed(source.toString())).state.set('name', `${character.firstName} ${character.lastName}`, true);

    emitNet(EVENTS.spawned, src);
}

onNet(EVENTS.spawn, () => {
    const src = source;
    spawnCharacter(src);
});