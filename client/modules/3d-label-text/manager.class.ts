import { DrawText3D } from ".";

type TextLabel = {
    x: number,
    y: number,
    z: number,
    vw: number,
    text: string,
    range: number,
    uid: string
}

class _TextLabelManager {
    private labels: TextLabel[] = [];

    constructor() {
        this.labels.push({
            x: -1087.5032958984375,
            y: -2728.589111328125,
            z: -7.4190673828125,
            vw: -1,
            text: "Bienvenue sur ~g~Mild~r~Roleplay~w~.",
            uid: 'WELLCOME_LABEL',
            range: 10
        });

        setTick(() => {this.tick()});
        console.log(this.labels);
    }

    public find(uid: string): TextLabel|undefined {
        const label = this.labels.find((l) => l.uid == uid);
        return label;
    }

    public addTextLabel(uid: string, x: number, y: number, z: number, range: number, vw: number, text: string): string {

        if(this.find(uid)) {
            return '';
        }

        this.labels.push({
            uid,x,y,z,vw,text,range
        });

        return uid;
    }

    public removeTextLabel(uid: string): boolean {
        const index = this.labels.findIndex((l) => l.uid == uid);
        
        if(index == -1) {
            return false;
        }

        this.labels.splice(index, 1);
        return true;
    }

    public updateText(uid: string, text: string): boolean {
        const label = this.find(uid);

        if(!label) {
            return false;
        }

        label.text = text;
    }

    private tick() {
        const [x, y, z] = GetEntityCoords(GetPlayerPed(-1), true);
        
        this.labels.forEach((l) => {
            const dist = GetDistanceBetweenCoords(x, y, z, l.x, l.y, l.z, true);
            if(dist < l.range) {
                if(l.vw == -1 || Entity(PlayerPedId()).state.vw == l.vw) {
                    DrawText3D(l.x, l.y, l.z, l.text);
                }
            }
        })
    }
}

export const TextLabelManager = new _TextLabelManager();

globalThis.exports('Create3DTextLabel', TextLabelManager.addTextLabel);
globalThis.exports('Destroy3DTextLabel', TextLabelManager.removeTextLabel);
globalThis.exports('Update3DTextLabel', TextLabelManager.removeTextLabel);

