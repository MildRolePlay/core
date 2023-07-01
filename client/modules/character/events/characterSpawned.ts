import { Delay } from "../../../utils";

onNet('client:core:character:spawned', async () => {
    DoScreenFadeIn(500);
    await Delay(500);
});