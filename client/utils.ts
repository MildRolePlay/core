export const Delay = async (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export function onNUI<TData = any, TResponse = any>(event: string, callback: (data: TData, cb: (response: TResponse) => void) => void): void {
    RegisterNuiCallbackType(event);
    on(`__cfx_nui:${event}`, callback);
}

export const generateEventName = (event: string, remote: boolean = false) => {
    return `${!remote ? 'client':'server'}:${GetCurrentResourceName()}:${event}`;
}

export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomProb(n: number): boolean {
    const randomNumber = Math.floor(Math.random() * n) + 1;
    return randomNumber === 1;
}

export function getHeadingToFaceEntity(source: number, target: number): number {
    const [x, y, _] = GetEntityCoords(source, true)
    const [px, py] = GetEntityCoords(target, true);

    const heading = {
        x: px - x,
        y: py - y
    };

    return GetHeadingFromVector_2d(heading.x, heading.y);
}