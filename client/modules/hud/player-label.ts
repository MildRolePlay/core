import { DrawText3D } from '../../modules/3d-label-text';
import {HUDManager} from './index';

setTick(() => {
    if(!HUDManager.player3DText) {
        return;
    }

    (GetActivePlayers() as number[]).forEach((id: number) => {
        if(id == PlayerId()) {
            return;
        }

        if(NetworkIsPlayerActive(id)) {
            const ped = GetPlayerPed(id);
            const name: null|string = Entity(ped).state.name;

            const tvw = Entity(ped).state.vw;
            const pvw = Entity(GetPlayerPed(-1)).state.vw;
            
            if(name && tvw == pvw) {
                const tcoord = GetEntityCoords(ped, false);
                const pcoord = GetEntityCoords(PlayerPedId(), false);

                if(GetDistanceBetweenCoords(tcoord[0], tcoord[1], tcoord[2], pcoord[0], pcoord[1], pcoord[2], true) < 15) {
                    const cast = CastRayPointToPoint(tcoord[0], tcoord[1], tcoord[2], pcoord[0], pcoord[1], pcoord[2], -1, GetPlayerPed(-1), 4);
                    const [_, hit, ___, ____, entityHit] = GetRaycastResult(cast);

                    if(entityHit == ped || !hit) {
                        DrawText3D(tcoord[0], tcoord[1], tcoord[2]+1.0, `${GetPlayerServerId(id)} | ${Entity(ped).state.name}`);
                    }
                }
            }
        }
    });
})