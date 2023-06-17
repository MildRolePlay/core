import './classe';
import './events/index';
import './functions/setRoutingBucket';

import { Players } from './classe';

global.exports('GetPlayerObject', (source: number) => Players.find(source));