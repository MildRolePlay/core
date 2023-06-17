import { Delay } from "../../utils";

export const requestAnimSet = async (name: string) => {
    if(HasAnimSetLoaded(name)) {
        return name;
    }

    RequestAnimSet(name);

    while(!HasAnimSetLoaded(name)) {
        await Delay(100)
    }

    return name;
}