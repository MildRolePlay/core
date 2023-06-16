export const Delay = async (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export function onNUI<T extends any>(event: string, callback: (data: T) => void): void {
    RegisterNuiCallbackType(event);
    on(`__cfx_nui:${event}`, callback);
}

export const generateEventName = (event: string, remote: boolean = false) => {
    return `${!remote ? 'client':'server'}:${GetCurrentResourceName()}:${event}`;
}