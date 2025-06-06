"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchRouter = void 0;
const express_1 = require("express");
const BatchController_1 = require("../controllers/BatchController");
const RunBatchUseCase_1 = require("../../applications/usecases/RunBatchUseCase");
const PageJaunesScraper_1 = require("../../infrastructure/scrapping/PageJaunesScraper");
const InsertEtablissementUseCase_1 = require("../../applications/usecases/InsertEtablissementUseCase");
const BatchMiddleware_1 = require("../../infrastructure/middleware/BatchMiddleware");
class BatchRouter {
    router;
    controller;
    batchMiddleware;
    constructor(repo) {
        const pagesJaunesScraper = new PageJaunesScraper_1.PagesJaunesScraper();
        const batchUseCase = new RunBatchUseCase_1.RunBatchUseCase(pagesJaunesScraper, repo);
        const insertUseCase = new InsertEtablissementUseCase_1.InsertEtablissementUseCase(repo);
        this.batchMiddleware = new BatchMiddleware_1.BatchMiddleware();
        this.controller = new BatchController_1.BatchController(batchUseCase, insertUseCase);
        this.router = (0, express_1.Router)();
    }
    getRoutes() {
        this.router.get('/batch', this.batchMiddleware.validateBatch, this.controller.run);
        return this.router;
    }
}
exports.BatchRouter = BatchRouter;
