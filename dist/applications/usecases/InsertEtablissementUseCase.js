"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertEtablissementUseCase = void 0;
class InsertEtablissementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(etablissement) {
        await this.repo.insert(etablissement);
    }
}
exports.InsertEtablissementUseCase = InsertEtablissementUseCase;
