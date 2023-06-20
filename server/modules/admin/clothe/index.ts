import './events';
import './commands';
import { ClotheRepository } from '../../../modules/database/clothing/class';

onNet('client:core:admin:clothe:created', (clothe: string) => {
    ClotheRepository.create(JSON.parse(clothe));
});