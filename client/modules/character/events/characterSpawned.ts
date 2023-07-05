import { HUDManager } from "../../hud";
import { Delay } from "../../../utils";

onNet('client:core:character:spawned', async () => {
    DoScreenFadeIn(500);
    await Delay(500);

    HUDManager.displayChat(true);
    HUDManager.displayMinimap(true);
    HUDManager.displayServerHud(true);
});