"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEtablissementUseCase = void 0;
class UpdateEtablissementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(etablissement, id) {
        await this.repo.update(etablissement, id);
    }
}
exports.UpdateEtablissementUseCase = UpdateEtablissementUseCase;
