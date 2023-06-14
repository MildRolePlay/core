import { NewswireRepository } from "../database/newswire";

global.exports('fetchNewswire', async () => {
    return await NewswireRepository.findAll(true);
});