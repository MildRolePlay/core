import { Delay } from "../../utils";

const url = 'https://gifer.com/embed/1klM';
let dui: string;
let duiObj: number;

const dictName = 'v_serv_metro_advertstand1';
const textname = 'ah_metroscroll3';

RegisterCommand('dui_test', async () => {
    duiObj = CreateDui(url, 256, 512);
    dui = GetDuiHandle(duiObj)

    while(!IsDuiAvailable(duiObj)) {
        await Delay(100);
    }

    const dictReplace = 'risitastxd';
    const textreplace = 'risitastx';

    const txd = CreateRuntimeTxd(dictReplace);
    CreateRuntimeTextureFromDuiHandle(txd, textreplace, dui);

    AddReplaceTexture(dictName, textname, dictReplace, textreplace);
}, false)