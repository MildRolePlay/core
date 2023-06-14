export const generateEventName = (name: string) => {
    return `server:${GetCurrentResourceName()}:${name}`
};