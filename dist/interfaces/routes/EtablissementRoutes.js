"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtablissementRouter = void 0;
const express_1 = require("express");
const EtablissementController_1 = require("../controllers/EtablissementController");
const InsertEtablissementUseCase_1 = require("../../applications/usecases/InsertEtablissementUseCase");
const GetAllEtablissementUseCase_1 = require("../../applications/usecases/GetAllEtablissementUseCase");
const UpdateEtablissementUseCase_1 = require("../../applications/usecases/UpdateEtablissementUseCase");
const EtablissementMiddleware_1 = require("../../infrastructure/middleware/EtablissementMiddleware");
class EtablissementRouter {
    router;
    controller;
    middleware;
    constructor(repo) {
        const insertUC = new InsertEtablissementUseCase_1.InsertEtablissementUseCase(repo);
        const getAllUC = new GetAllEtablissementUseCase_1.GetAllEtablissementsUseCase(repo);
        const updateUC = new UpdateEtablissementUseCase_1.UpdateEtablissementUseCase(repo);
        this.controller = new EtablissementController_1.EtablissementController(insertUC, getAllUC, updateUC);
        this.middleware = new EtablissementMiddleware_1.EtablissementMiddleware();
        this.router = (0, express_1.Router)();
    }
    getRoutes() {
        this.router.post('/etablissements', this.middleware.validateEtablissement, this.controller.insert);
        this.router.get('/etablissements', this.controller.getAll);
        this.router.put('/etablissements/:id', this.controller.update);
        return this.router;
    }
}
exports.EtablissementRouter = EtablissementRouter;
