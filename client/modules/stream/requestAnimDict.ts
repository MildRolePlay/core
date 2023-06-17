import { Delay } from "../../utils";

export const requestAnimDict = async (dict: string) => {
    if(HasAnimDictLoaded(dict)) {
        return dict;
    }

    RequestAnimDict(dict);

    while(!HasAnimDictLoaded(dict)) {
        await Delay(100);
    }

    return dict;
}