import { onNUI } from "./utils";

RegisterCommand('toggle-vue', (source: number, args: string[], raw: string) => {
    const toggle = Number(args[0]) == 0 ? false : true;
    SendNUIMessage({
        type: "toggle",
        show: toggle,
    });
}, false);

RegisterCommand('increment', (source: number, args: string[], raw: string)  => {
    SendNUIMessage({
        type: 'increment',
        other: 1
    });
}, false);

onNUI<{current: number}>('increment', (data) => {
    console.log(data.current);
});