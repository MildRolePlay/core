import { getHeadingToFaceEntity, randomIntFromInterval, randomProb } from "../../../utils";
import { requestAnimDict } from "../../stream/requestAnimDict";

on('target:interact:ai:hello', async (_: any, entity: number) => {
    const e = entity;

    const [x, y, z] = GetOffsetFromEntityInWorldCoords(e, 0.0, 2.5, 0.0)
    const [px, py, pz] = GetEntityCoords(e, true);

    const heading = {
        x: px - x,
        y: py - y
    };

    TaskGoStraightToCoord(PlayerPedId(), x, y, z, GetEntitySpeed(e)+1.0, -1, GetHeadingFromVector_2d(heading.x, heading.y), 1.0);

    const tick = await new Promise<number>((resolve) => {
        let speed_check = 0;

        const t = setTick(() => {
            if(IsControlJustReleased(0, 18)) {
                resolve(t);
            }

            if(GetEntitySpeed(PlayerPedId()) == 0) {
                speed_check ++;
            }

            if(speed_check > 100) {
                resolve(t);
            }
        })
    });

    clearTick(tick);

    ClearPedTasks(PlayerPedId());

    if(IsPedAPlayer(e)) {
        TaskLookAtEntity(e, PlayerPedId(), 500, -1, 2048);
        ClearPedTasks(e);
    }

    await requestAnimDict('gestures@m@standing@casual');
    TaskPlayAnim(PlayerPedId(), 'gestures@m@standing@casual', 'gesture_hello', 8.0, 8.0, -1, 0, 0, false, false, false);

    TaskGoStraightToCoord(e, px, py, pz, GetEntitySpeed(e)+1.0, -1, getHeadingToFaceEntity(e, PlayerPedId()), 2.0);

    if(randomProb(2)) {
        const [armed, w] = GetCurrentPedWeapon(e, true)

        if(armed) {
            SetCurrentPedWeapon(e, GetHashKey("weapon_unarmed"), true);
        }

        await new Promise<void>((res) => {setTimeout(() => {TaskPlayAnim(e, 'gestures@m@standing@casual', 'gesture_hello', 8.0, 8.0, -1, 0, 0, false, false, false); res();}, 600)});

        if(armed) {
            setTimeout(() => {
                SetCurrentPedWeapon(e, w, true);
            }, 800)
        }
    } else {
        TaskLookAtEntity(e, PlayerPedId(), 500, -1, 3)
        await new Promise<void>((res) => {setTimeout(() => {TaskPlayAnim(e, 'gestures@m@standing@casual', 'gesture_nod_no_hard', 8.0, 8.0, -1, 0, 0, false, false, false); res();}, 600)});
    }
});