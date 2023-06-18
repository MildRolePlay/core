import './modules/newswire';
import './modules/player';
import './modules/clothing';

on('onResourceStart', async (resource: string) => {
    if(resource === GetCurrentResourceName()) {
        console.log(`${resource} ready to use !`)
    }
});

RegisterCommand('pos', (source: number, args: string[], raw: string) => {
    const [x, y, z] = GetEntityCoords(GetPlayerPed(source.toString()));
    console.log(`${args[0] || 'pos'} | x: ${x} | y: ${y} | z: ${z}`);
}, false);

//create | x: -167.1824188232422 | y: -301.22637939453125 | z: 39.7266845703125
//cam | x: -167.4989013671875 | y: -300.1846008300781 | z: 39.7266845703125