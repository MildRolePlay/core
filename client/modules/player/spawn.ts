import { HUDManager } from "../../modules/hud";
import { generateEventName } from "../../utils";

on('onClientResourceStart', (resource: string) => {
    if(resource !== GetCurrentResourceName()) {
        return;
    }

    globalThis.exports.spawnmanager.setAutoSpawn(false);
});

on('client:loadingscreen:loaded', () => {
    HUDManager.displayServerHud(false);

    emitNet(generateEventName('loadingscreen:passed', true));

    NetworkSetFriendlyFireOption(true);
    SetCanAttackFriendly(GetPlayerPed(-1), true, true);
});