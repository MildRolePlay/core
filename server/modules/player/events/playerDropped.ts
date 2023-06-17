import { AccountRepository } from "../../../modules/database/account";
import { Players } from "../classe";

on('playerDropped', async (reason: string) => {
    const src = source;
    const p = Players.find(src);

    if(!p) {
        return;
    }

    await AccountRepository.save({id: p.accountId});
});