"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunBatchUseCase = void 0;
class RunBatchUseCase {
    scraper;
    repo;
    constructor(scraper, repo) {
        this.scraper = scraper;
        this.repo = repo;
    }
    async execute(keyword, city) {
        return await this.scraper.scrape(keyword, city);
    }
}
exports.RunBatchUseCase = RunBatchUseCase;
