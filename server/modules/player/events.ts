import { generateEventName } from "../../modules/utils/events";

export default {
    showAuthPanel: `server:${GetCurrentResourceName()}:loadingscreen:passed`,
    auth: {
        request: 'auth:request',
        login: 'auth:login',
        signin: 'auth:signin', 
        loginResponse: 'auth:login:response',
        signinResponse: 'auth:signin:response'
    },
    bucket: {
        updateBucket: generateEventName('bucket:update', true),
    }
};