"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const EtablissementRoutes_1 = require("../interfaces/routes/EtablissementRoutes");
const BatchRoutes_1 = require("../interfaces/routes/BatchRoutes");
const MysqlEtablissementRepository_1 = require("../infrastructure/database/MysqlEtablissementRepository");
const database_1 = require("../config/database");
class Bootstrap {
    startApp = async () => {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 3000;
        const repo = new MysqlEtablissementRepository_1.MysqlEtablissementRepository(database_1.dbConfig);
        await repo.initEstablishement();
        const etablissementRouter = new EtablissementRoutes_1.EtablissementRouter(repo);
        const batchRouter = new BatchRoutes_1.BatchRouter(repo);
        app.use(express_1.default.json());
        app.use('/', etablissementRouter.getRoutes());
        app.use('/', batchRouter.getRoutes());
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur http://localhost:${PORT}`);
        });
    };
}
exports.Bootstrap = Bootstrap;
