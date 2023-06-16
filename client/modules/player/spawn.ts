import { generateEventName } from "../../utils";
import HUD_EVENTS from '../hud/events';

on('onClientResourceStart', (resource: string) => {
    if(resource !== GetCurrentResourceName()) {
        return;
    }

    globalThis.exports.spawnmanager.setAutoSpawn(false);
});

on('client:loadingscreen:loaded', () => {
    emit(HUD_EVENTS.CLIENT_HIDE);
    emitNet(generateEventName('loadingscreen:passed', true));
});