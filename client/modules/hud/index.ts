import { Delay } from '../../utils';
import './player-label';

const hidenComponent = [1,2,3,4,5,10,11,12,13,15,17,18,141];

class HUD {
    public minimap: boolean = true;

    public chat: boolean = true;
    public serverHud: boolean = false;

    public player3DText: boolean = true;
    private _minimap: number;

    private tick: number;

    private health: number = 100;

    constructor() {
        this._minimap = RequestScaleformMovie("minimap")
        this.tick = setTick(() => {this.onTick()});
    }

    public remove(): void {
        clearTick(this.tick);
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

    public updateNeed(health: number, food: number, drink: number) {
        SendNUIMessage({
            type: 'updateNeed',
            health,
            food,
            drink
        });
    }

    private getMinimapPosition(): {x: number, y: number, width: number, height: number} {
        const [resX, resY] = GetActiveScreenResolution();
        const ratio = GetAspectRatio(true);

        const scaleX = 1/resX;
        const scaleY = 1/resY;

        const raw = {x: 0, y: 0};
        const size = {x: 0, y: 0};

        SetScriptGfxAlign(76, 66);

        if(IsBigmapActive()) {
            [raw.x, raw.y] = GetScriptGfxPosition(-0.003975, 0.022 + (-0.460416666));
            size.x = scaleX*(resX/(2.52*ratio));
            size.y = scaleY*(resY/(2.3374));
        } else {
            [raw.x, raw.y] = GetScriptGfxPosition(-0.0045, 0.002 + (-0.188888));
            size.x = scaleX*(resX/(4*ratio));
            size.y = scaleY*(resY/(5.674));
        }

        ResetScriptGfxAlign();

        return {
            x: raw.x,
            y: raw.y,
            width: size.x,
            height: size.y
        }
    }

    onTick = () => {
        BeginScaleformMovieMethod(this._minimap, 'SETUP_HEALTH_ARMOUR');
        ScaleformMovieMethodAddParamInt(3);
        EndScaleformMovieMethod();

        hidenComponent.forEach((c) => {
            HideHudComponentThisFrame(c);
        });

        if(this.health != GetEntityHealth(PlayerPedId())) {
            this.health = GetEntityHealth(PlayerPedId());

            this.updateNeed(Math.floor((this.health - 100) / (GetEntityMaxHealth(PlayerPedId()) - 100) * 100), 100, 100)
        }
    }
}

export const HUDManager = new HUD();

globalThis.exports('HUDDisplayMinimap', (toggle: boolean) => HUDManager.displayMinimap(toggle));
globalThis.exports('HUDDisplayServerHud', (toggle: boolean) => HUDManager.displayServerHud(toggle));
globalThis.exports('HUDDisplayPlayerLabel', (toggle: boolean) => {HUDManager.player3DText = toggle})

globalThis.exports('HUDHasMinimap', () => HUDManager.minimap);
globalThis.exports('HUDHasServerHud', () => HUDManager.serverHud);
globalThis.exports('HUDHasPlayerLabel', () => HUDManager.player3DText);

on('onClientResourceStop', (resource: string) => {
    if(resource == GetCurrentResourceName()) {
        HUDManager.remove();
    }
})