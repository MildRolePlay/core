import { generateEventName } from "../../../modules/utils/events";
import EVENTS from '../events';

onNet(EVENTS.showAuthPanel, () => {    
    emitNet(generateEventName('auth:request', true), source);
});