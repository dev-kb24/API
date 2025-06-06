import express from 'express';
import 'dotenv/config';
import {EtablissementRouter} from '../interfaces/routes/EtablissementRoutes';
import { BatchRouter } from '../interfaces/routes/BatchRoutes';
import { MysqlEtablissementRepository } from '../infrastructure/database/MysqlEtablissementRepository';
import { dbConfig } from '../config/database';

export class Bootstrap {
    startApp = async () => {
        const app = express();
        const PORT = process.env.PORT || 3000;
        const repo = new MysqlEtablissementRepository(dbConfig);
        await repo.initEstablishement();
        const etablissementRouter = new EtablissementRouter(repo);
        const batchRouter = new BatchRouter(repo);
        app.use(express.json());
        app.use('/', etablissementRouter.getRoutes());
        app.use('/', batchRouter.getRoutes());
        
        app.listen(PORT, () => {
          console.log(`Serveur lancé sur http://localhost:${PORT}`);
        });
    }
}