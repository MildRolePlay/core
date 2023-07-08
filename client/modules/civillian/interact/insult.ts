import { getHeadingToFaceEntity, randomProb } from "../../../utils";
import { requestAnimDict } from "../../stream/requestAnimDict";

on('target:interact:ai:insult', async (_: any, entity: number) => {
    const e = entity;

    const [x, y, z] = GetEntityCoords(PlayerPedId(), true)
    const [px, py] = GetEntityCoords(e, true);

    const heading = {
        x: px - x,
        y: py - y
    };

    TaskGoStraightToCoord(PlayerPedId(), x, y, z, GetEntitySpeed(e)+1.0, -1, GetHeadingFromVector_2d(heading.x, heading.y), 1.0);

    await requestAnimDict('taxi_hail');

    setTimeout(() => TaskPlayAnim(PlayerPedId(), 'taxi_hail', 'fuck_u', 8.0, 8.0, -1, 0, 0, false, false, false), 1000);

    const t = setTick(async () => {
        if(IsEntityPlayingAnim(PlayerPedId(), 'taxi_hail', 'fuck_u', 2)) {
            return;
        }


        if(GetPedRelationshipGroupDefaultHash(e) == GetHashKey('COP')) {
            await requestAnimDict('mp_arresting');
    
            const [tx, ty, tz] = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0.0, -2.0, 0.0);
            const [ax, ay, az] = GetEntityCoords(PlayerPedId(), true);
    
            TaskGoToCoordWhileAimingAtCoord(e, tx, ty, tz, ax, ay, az, 2.0, false, 1.0, 0.5, false, 513, false, 0xC6EE6B4C);
    
            
            let last = 0;
            const t = setTick(() => {
                if(last != GetScriptTaskStatus(e, 0x19CE5AFC)) {
                    console.log(GetScriptTaskStatus(e, 0x19CE5AFC));
                    last = GetScriptTaskStatus(e, 0x19CE5AFC);
                }
                if(GetScriptTaskStatus(e, 0x19CE5AFC) == 7) {
                    TaskPlayAnim(e, "mp_arresting", "a_uncuff", 8.0, -8.0, -1, 0, 0, false, false, false);
                    SetEnableHandcuffs(PlayerPedId(), true);
                    TaskPlayAnim(PlayerPedId(), 'mp_arresting', 'idle', 8.0, -8, -1, 49, 0, false, false, false);
                    console.log('call anim');
                    clearTick(t);
                    console.log("finish")
                    return;
                }
            });
        } else {
            if(randomProb(5)) {
                SetPedCombatAttributes(e, 5, true);
                SetPedCombatAttributes(e, 46, true);
                console.log("combat");
            }
    
            TaskCombatPed(e, PlayerPedId(), 0, 16);
        }

        clearTick(t);
    });
});

//go_fuck_yourself