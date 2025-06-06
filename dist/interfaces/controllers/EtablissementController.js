"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtablissementController = void 0;
const Etablissement_1 = require("../../domain/entities/Etablissement");
class EtablissementController {
    insertUseCase;
    getAllUseCase;
    updateUseCase;
    constructor(insertUseCase, getAllUseCase, updateUseCase) {
        this.insertUseCase = insertUseCase;
        this.getAllUseCase = getAllUseCase;
        this.updateUseCase = updateUseCase;
    }
    insert = async (req, res) => {
        try {
            const { name, address, phone, website, email, siret, siren } = req.body;
            const etablissement = new Etablissement_1.Etablissement(name, address, phone, website, email, siret, siren);
            await this.insertUseCase.execute(etablissement);
            res.status(201).json({ message: 'Etablissement inséré' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'insertion' });
        }
    };
    getAll = async (req, res) => {
        try {
            const etablissements = await this.getAllUseCase.execute();
            res.json(etablissements);
        }
        catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération' });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, address, phone, website, email, siret, siren } = req.body;
            const etablissement = new Etablissement_1.Etablissement(name, address, phone, website, email, siret, siren);
            await this.updateUseCase.execute(etablissement, id);
            res.status(201).json({ message: 'Etablissement mis à jour' });
        }
        catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'insertion' });
        }
    };
}
exports.EtablissementController = EtablissementController;
