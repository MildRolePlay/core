import './player-label';

const hidenComponent = [1,2,3,4,5,10,11,12,13,15,17,18,141];

class HUD {
    public minimap: boolean = true;

    public chat: boolean = true;
    public serverHud: boolean = true;

    private tick: number;

    private minimapScaleform: number;

    public player3DText: boolean = true;

    constructor() {
        this.minimapScaleform = RequestScaleformMovie('minimap');
        this.tick = setTick(this.onTick);
    }

    public displayMinimap(toggle: boolean) {
        if(toggle == this.minimap) {
            return;
        }

        DisplayRadar(toggle);
        this.minimap = toggle;
    }

    public displayServerHud(toggle: boolean) {
        if(toggle == this.serverHud) {
            return;
        }

        SendNUIMessage({type: 'toggle', show: toggle});
        this.serverHud = toggle;
    }

    onTick() {
        hidenComponent.forEach((c) => {
            HideHudComponentThisFrame(c);
        });

        SetRadarBigmapEnabled(false, true);

        BeginScaleformMovieMethod(1, 'SETUP_HEALTH_ARMOUR');
        ScaleformMovieMethodAddParamInt(3);
        EndScaleformMovieMethod();
    }
}

export const HUDManager = new HUD();

globalThis.exports('HUDDisplayMinimap', (toggle: boolean) => HUDManager.displayMinimap(toggle));
globalThis.exports('HUDDisplayServerHud', (toggle: boolean) => HUDManager.displayServerHud(toggle));
globalThis.exports('HUDDisplayPlayerLabel', (toggle: boolean) => {HUDManager.player3DText = toggle})

globalThis.exports('HUDHasMinimap', () => HUDManager.minimap);
globalThis.exports('HUDHasServerHud', () => HUDManager.serverHud);
globalThis.exports('HUDHasPlayerLabel', () => HUDManager.player3DText);