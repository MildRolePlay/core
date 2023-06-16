import './modules/newswire';
import './modules/player';

on('onResourceStart', async (resource: string) => {
    if(resource === GetCurrentResourceName()) {
        console.log(`${resource} ready to use !`)
    }
});