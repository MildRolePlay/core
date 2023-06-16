import EVENTS from './events';

onNet(EVENTS.SERVER_HIDE, () => {
    toggle(false);
});

on(EVENTS.CLIENT_HIDE, () => {
    toggle(false);
})

const toggle = (show: boolean|undefined = undefined) => {
    SendNUIMessage({type: 'toggle', show});
}

