import { Router } from 'express';
import { BatchController } from '../controllers/BatchController';
import { MysqlEtablissementRepository } from '../../infrastructure/database/MysqlEtablissementRepository';
import { RunBatchUseCase } from '../../applications/usecases/RunBatchUseCase';
import { PagesJaunesScraper } from '../../infrastructure/scrapping/PageJaunesScraper';
import { InsertEtablissementUseCase } from '../../applications/usecases/InsertEtablissementUseCase';
import { BatchMiddleware } from '../../infrastructure/middleware/BatchMiddleware';

export class BatchRouter {
    private router;
    private controller;
    private batchMiddleware;

     constructor(repo: MysqlEtablissementRepository) {
        const pagesJaunesScraper = new PagesJaunesScraper();
        const batchUseCase = new RunBatchUseCase(pagesJaunesScraper, repo);
        const insertUseCase = new InsertEtablissementUseCase(repo);
        this.batchMiddleware = new BatchMiddleware();
        this.controller = new BatchController(batchUseCase, insertUseCase);
        this.router = Router();
     }
    
     getRoutes(){
        this.router.get('/batch', this.batchMiddleware.validateBatch, this.controller.run);
        return this.router;
     }
}