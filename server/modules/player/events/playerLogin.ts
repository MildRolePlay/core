import { AccountRepository } from "../../../modules/database/account";
import { generateEventName } from "../../../modules/utils/events";
import { login } from "../functions/login";
import * as bcrypt from 'bcryptjs';
import EVENTS from '../events';

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