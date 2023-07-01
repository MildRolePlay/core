import { CharacterDTO, CharacterInsertDB, CharacterRepository } from "../../../modules/database/character";

export const createCharacter = async (data: CharacterInsertDB): Promise<CharacterDTO> => {
    await CharacterRepository.create(data);
    return await CharacterRepository.findByAccountId(data.accountId);
}