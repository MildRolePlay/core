class NUIEvent {
    private events: {[K: string]: (data: any) => void} = {};

    constructor() {
        window.addEventListener('message', (event) => {

            if(!event.data.type && this.checkEventListener(event.data.type)) {
                return;
            }

            const eventName = event.data.type;
            const data = {...event.data};
            delete data.type;

            this.onEvent(eventName, data);
        });


    }

    private checkEventListener(eventName: string): boolean {
        return this.events[eventName] ? true : false;
    }

    private onEvent(event: string, data: any) {

        const listener = this.events[event];

        if(!listener) {
            return;
        }

        listener(data);
    }

    public addEventListener<T extends Object>(event: string, callback: (data: T) => void): boolean {
        if(this.checkEventListener(event) && this.events[event] === callback) {
            return false;
        }

        this.events[event] = callback;
        return true;
    }

    public removeEventListener(event: string, callback?: (data: any) => void): boolean {
        if(!this.checkEventListener(event)) {
            return false;
        }

        if(callback && this.events[event] !== callback) {
            return false;
        }

        delete this.events[event];
        return true;
    }
}

export const NUIEventManager = new NUIEvent();