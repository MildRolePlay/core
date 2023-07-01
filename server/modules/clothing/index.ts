import { ClotheRepository } from "../../modules/database/clothing/class";
import { Clothes } from "./class";

on('onResourceStart', async (resource: string) => {
    if(resource === GetCurrentResourceName()) {
        console.log(`[Clothes] initializing...`)
        const clothes = await ClotheRepository.init();
        Clothes.setClotheLib(clothes);
        console.log(`[Clothes] initialized ${clothes.length}`)
    }
});

onNet('client:clothes:fetch', () => {
    const s = source;

    const clothes = {male: Clothes.find(false, true), female: Clothes.find(true, true)};
    emitNet('server:clothes:responseList', s, JSON.stringify(clothes));
});

onNet('client:clothes:apply', (id: number) => {
    Clothes.applyPedClothe(source, id);
});