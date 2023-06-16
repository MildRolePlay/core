import { Delay } from "../../utils";

export const requestModel = async (model: string|number, onLoaded: (model: number) => void): Promise<void> => {
    if(typeof model == "string") model = GetHashKey(model);
    if(!IsModelValid(model) || !IsModelInCdimage(model)) {
        return;
    }

    RequestModel(model);

    while(!HasModelLoaded(model)) {
        await Delay(100);
    }

    onLoaded(model);

    SetModelAsNoLongerNeeded(model);
    console.log('model unloaded')
    return;
}