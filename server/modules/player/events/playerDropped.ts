import { CharacterRepository } from "../../database/character";
import { AccountRepository } from "../../../modules/database/account";
import { Players } from "../classe";

on('playerDropped', async (reason: string) => {
    const src = source;
    const p = Players.find(src);

    if(!p) {
        return;
    }

    if(p.character) {
        const lastPos = GetEntityCoords(GetPlayerPed(src.toString()));
        const lastHead = GetEntityHeading(GetPlayerPed(src.toString()));

        const c = p.character;

        c.lastX = lastPos[0];
        c.lastY = lastPos[1];
        c.lastZ = lastPos[2];
        c.lastRot = lastHead;

        await CharacterRepository.save(c);
    }

    await AccountRepository.save({id: p.accountId});
});