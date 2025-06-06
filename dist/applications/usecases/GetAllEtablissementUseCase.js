"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllEtablissementsUseCase = void 0;
class GetAllEtablissementsUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        return this.repo.getAll();
    }
}
exports.GetAllEtablissementsUseCase = GetAllEtablissementsUseCase;
