import { onNUI } from "../../utils";
import { RayCastCameraResult, Vector3 } from "./target.types";
import { BoxZoneCreationOption } from "./types/box-zone.type";
import { TargetInteractMenu, TargetInteractMenuItem } from "./types/target-menu.type";

export class _Target {
    public active = false;
    public selected = false;

    public tick: number;

    public zones: Record<string, {coords: Vector3, menu: TargetInteractMenu}> = {};
    public props: Record<number, TargetInteractMenu> = {};

    public AICivilianMenu: TargetInteractMenu = {items: []};

    constructor() {
        this.tick = setTick(() => this.onTick());

        onNUI<null, boolean>('target:selected', (_, cb) => this.onSelected(_, cb));
        onNUI<{entity: number, item: TargetInteractMenuItem}, boolean>('target:selectMenuItem', (data, cb) => this.onInteractItem(data, cb));
    }

    public toggle(display: boolean) {
        SendNUIMessage({
            type: 'toggleSelector',
            show: display,
        });

        this.active = display;

        if(!this.active) {
            SetNuiFocus(false, false);
            SetNuiFocusKeepInput(true);
            this.selected = false;
        }
    }

    public addBoxZone(center: Vector3, length: number, width: number, options: BoxZoneCreationOption, menu: TargetInteractMenu): void {
        const id = `target_${Object.keys(this.zones).length}`;
        globalThis.exports.PolyZone.addBoxZone(id, center, length, width, {name: id, ...options});

        this.zones[id] = {coords: center, menu: menu};
    }

    public addPropsInteract(props: string[], menu: TargetInteractMenu): void {
        props.forEach(p => {
            this.props[GetHashKey(p)] = menu;
        })
    }

    private rotationToDirection(rotation: Vector3): Vector3 {
        const adjustRotation = {
            x: (Math.PI / 180) * rotation.x,
            y: (Math.PI / 180) * rotation.y,
            z: (Math.PI / 180) * rotation.z,
        }

        const direction = {
            x: -Math.sin(adjustRotation.z)*Math.abs(Math.cos(adjustRotation.x)),
            y: Math.cos(adjustRotation.z)*Math.abs(Math.cos(adjustRotation.x)),
            z: Math.sin(adjustRotation.x)
        };

        return direction;
    }

    private RayCastGameplayCamera(distance: number = 15.0): RayCastCameraResult {
        const camRot = GetGameplayCamRot(0);
        const camCoords = GetGameplayCamCoord();
        const direction = this.rotationToDirection({x: camRot[0], y: camRot[1], z: camRot[2]});

        const destination = {
            x: camCoords[0] + direction.x * distance,
            y: camCoords[1] + direction.y * distance,
            z: camCoords[2] + direction.z * distance,
        }

        const [_, hit, endCoord, __, entity] = GetShapeTestResult(StartShapeTestRay(camCoords[0], camCoords[1], camCoords[2], destination.x, destination.y, destination.z, -1, PlayerPedId(), 0));
        return {
            hit, endCoords: {x: endCoord[0], y: endCoord[1], z: endCoord[2]}, entity
        };
    }

    onTick() {
        if(!this.active || this.active && this.selected) {
            return;
        }

        DisableControlAction(0, 24, true);
        DisableControlAction(1, 24, true);

        SetCursorLocation(0.5, 0.5);
        SetNuiFocus(true, false);
        SetNuiFocusKeepInput(true);

        const pos = GetEntityCoords(PlayerPedId(), true);

        const ray = this.RayCastGameplayCamera(20.0);
        const peds = GetGamePool('CPed');

        const points: {x: number, y: number, menu?: TargetInteractMenu, entity: number}[] = [];
        const [resX, resY] = GetScreenActiveResolution();

        if(this.AICivilianMenu.items.length > 0) {
            peds.forEach((ped: number) => {
                if(ped == PlayerPedId() || IsPedAPlayer(ped)) {
                    return;
                }

                const tCoord = GetEntityCoords(ped, true);

                if(GetDistanceBetweenCoords(tCoord[0], tCoord[1], tCoord[2], pos[0], pos[1], pos[2], true) > 20) {
                    return;
                }

                const [is, x, y] = GetScreenCoordFromWorldCoord(tCoord[0], tCoord[1], tCoord[2]);

                if(is) {
                    points.push({x: Math.round(resX * x), y: Math.round(resY * y), entity: ray.entity, menu: this.AICivilianMenu});
                }
            });
        }

        Object.keys(this.zones).forEach((key: string) => {
            if(GetDistanceBetweenCoords(this.zones[key].coords.x, this.zones[key].coords.y, this.zones[key].coords.z, pos[0], pos[1], pos[2], true) > 20) {
                return;
            }

            const [is, x, y] = GetScreenCoordFromWorldCoord(this.zones[key].coords.x, this.zones[key].coords.y, this.zones[key].coords.z);

            if(is) {
                points.push({x: Math.round(resX * x), y: Math.round(resY * y), menu: this.zones[key].menu, entity: ray.entity});
            }
        });

        if(Object.keys(this.props).length > 0) {
            const objects: number[] = GetGamePool('CObject');

            objects.forEach(o => {
                const model = GetEntityModel(o);

                if(this.props[model]) {
                    const [ox, oy, oz] = GetEntityCoords(o, false);

                    if(GetDistanceBetweenCoords(ox, oy, oz, pos[0], pos[1], pos[2], true) > 20) {
                        return;
                    }
        
                    const [is, x, y] = GetScreenCoordFromWorldCoord(ox, oy, oz);
        
                    if(is) {
                        points.push({x: Math.round(resX * x), y: Math.round(resY * y), menu: this.props[model], entity: ray.entity});
                    }
                }
            });
        }

        SendNUIMessage({
            type: 'ray_result',
            ...ray,
        });

        console.log(points);

        SendNUIMessage({
            type: 'points',
            points
        })
    }

    onSelected(_: null, cb: (response: boolean) => void): void {
        this.selected = true;

        SetNuiFocus(true, true);
        SetNuiFocusKeepInput(false);

        cb(true);
    }

    onInteractItem(data: {entity: number, item: TargetInteractMenuItem}, cb: (response: boolean) => void): void {
        console.log(data);
        this.toggle(false);

        if(data.item.client) {
            emit(data.item.client, data.item.metadata, data.entity);
        }

        cb(true);
    }
}

export const TargetClass = new _Target();