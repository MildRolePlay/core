import { generateEventName } from "../../modules/utils/events";

export default {
    notFound: generateEventName('character:empty'),
    found: generateEventName('character:found'),
    playerInitialize: generateEventName('character:init', true),

    create: generateEventName('character:create'),
    spawn: generateEventName('character:spawn'),
    spawned: generateEventName('character:spawned', true),
}