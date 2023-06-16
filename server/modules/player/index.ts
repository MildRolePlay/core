import EVENTS from './events';
import { generateEventName } from '../../modules/utils/events';
import { AccountRepository } from '../../modules/database/account';
import { login } from './functions/login';
import * as bcrypt from 'bcryptjs';

onNet(EVENTS.showAuthPanel, () => {    
    emitNet(generateEventName('auth:request', true), source);
});

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

onNet(generateEventName(EVENTS.auth.login), async ([pseudo, password]: [string, string]) => {
    const src = source;

    const account = await AccountRepository.findByPseudo(pseudo);
    if(!account || !await bcrypt.compare(password, account.password)) {
        emitNet(generateEventName(EVENTS.auth.loginResponse, true), src, [false, 'error', 'Pseudo et/ou mot de passe invalide !']);
        return;
    }

    emitNet(generateEventName(EVENTS.auth.loginResponse, true), src, [true]);

    login(src, account);
})