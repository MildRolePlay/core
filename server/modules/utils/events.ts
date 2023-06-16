export const generateEventName = (name: string, remote: boolean = false) => {
    return `${!remote ? 'server':'client'}:${GetCurrentResourceName()}:${name}`
};