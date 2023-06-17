import EVENT from '../events';

export const setRoutingBucket = (source: number, bucket: number, enableTraffic: boolean = true, enableCiv: boolean = true): void => {
    SetPlayerRoutingBucket(source.toString(), bucket);
    emitNet(EVENT.bucket.updateBucket, source, enableTraffic, enableCiv);
    return;
}

global.exports('setRoutingBucket', setRoutingBucket);