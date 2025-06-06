"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchController = void 0;
class BatchController {
    runBatchUseCase;
    insertEtablissementUseCase;
    constructor(runBatchUseCase, insertEtablissementUseCase) {
        this.runBatchUseCase = runBatchUseCase;
        this.insertEtablissementUseCase = insertEtablissementUseCase;
    }
    run = async (req, res) => {
        const { keyword, city } = req.query;
        try {
            const etablissements = await this.runBatchUseCase.execute(String(keyword), String(city));
            for (let etablissement of etablissements) {
                await this.insertEtablissementUseCase.execute(etablissement);
            }
            res.status(200).json({ message: 'Batch terminé avec succès' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erreur lors du batch' });
        }
    };
}
exports.BatchController = BatchController;
