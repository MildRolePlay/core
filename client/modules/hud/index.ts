const hidenComponent = [1,2,3,4,5,10,11,12,13,15,17,18,141];

class HUD {
    public minimap: boolean = true;

    public chat: boolean = true;
    public serverHud: boolean = true;

    private tick: number;

    private minimapScaleform: number;

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
        BeginScaleformMovieMethod(this.minimapScaleform, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
        
        hidenComponent.forEach((c) => {
            HideHudComponentThisFrame(c);
        })
    }
}

export const HUDManager = new HUD();

globalThis.exports('HUDDisplayMinimap', (toggle: boolean) => HUDManager.displayMinimap(toggle));
globalThis.exports('HUDDisplayServerHud', (toggle: boolean) => HUDManager.displayServerHud(toggle));

globalThis.exports('HUDHasMinimap', () => HUDManager.minimap);
globalThis.exports('HUDHasServerHud', () => HUDManager.serverHud);