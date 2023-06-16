import { AccountRepository } from "../../../modules/database/account";
import { generateEventName } from "../../../modules/utils/events";
import { login } from "../functions/login";
import * as bcrypt from 'bcryptjs';
import EVENTS from '../events';

onNet(generateEventName(EVENTS.auth.signin), async ([pseudo, password, cgu, confirm]: [string, string, boolean, string]) => {
    const src = source;

    if(await AccountRepository.findByPseudo(pseudo)) {
        emitNet(generateEventName(EVENTS.auth.signinResponse, true), src, [false, 'Se pseudo est déjà utilisé par vous ou un autre joueur.']);
        return true;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const account = await AccountRepository.create({pseudo, password: hashPassword});
    emitNet(generateEventName(EVENTS.auth.signinResponse, true), src, [true]);

    login(src, account);
});