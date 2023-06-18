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