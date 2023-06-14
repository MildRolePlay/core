import './modules/newswire';

on('onResourceStart', async (resource: string) => {
    if(resource === GetCurrentResourceName()) {
        console.log(`${resource} ready to use !`)
    }
});