import { AminClotheEvent } from "./events"

RegisterCommand('clothe', (source: number) => {
    console.log(source);
    emitNet(AminClotheEvent.create, source);
}, false)