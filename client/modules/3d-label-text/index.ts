import './manager.class';

export const DrawText3D = (x: number, y: number, z: number, text: string): void => {
    const [screen, sx, sy] = GetScreenCoordFromWorldCoord(x, y, z);
    const [cx, cy, cz] = GetGameplayCamCoord();
    const dist = GetDistanceBetweenCoords(cx, cy, cz, x, y, z, true);

    let scale = (4.00001/dist) * 0.3;
    if(scale > 0.2) {
        scale = 0.2
    } else if(scale < 0.15) {
        scale = 0.15
    }

    const fov = (1/GetGameplayCamFov())*100;
    scale = scale * fov;

    if(screen) {
        SetTextFont(4)
		SetTextScale(scale, scale)
		SetTextProportional(true)
		SetTextColour(210, 210, 210, 180)
		SetTextCentre(true)
		SetTextDropshadow(50, 210, 210, 210, 255)
		SetTextOutline()
		SetTextEntry("STRING")
		AddTextComponentString(text)
		DrawText(sx, sy - 0.025)
    }
    return;
}

global.exports('DrawText3D', DrawText3D);