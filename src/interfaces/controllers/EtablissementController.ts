import { Request, Response } from 'express';
import { InsertEtablissementUseCase } from '../../applications/usecases/InsertEtablissementUseCase';
import { GetAllEtablissementsUseCase } from '../../applications/usecases/GetAllEtablissementUseCase';
import { Etablissement } from '../../domain/entities/Etablissement';
import { UpdateEtablissementUseCase } from '../../applications/usecases/UpdateEtablissementUseCase';

export class EtablissementController {
  constructor(
    private insertUseCase: InsertEtablissementUseCase,
    private getAllUseCase: GetAllEtablissementsUseCase,
    private updateUseCase: UpdateEtablissementUseCase
  ) {}

  insert = async (req: Request, res: Response) => {
    try {
      const { name, address, phone, website, email, siret, siren } = req.body;
      const etablissement = new Etablissement(name, address, phone, website, email, siret, siren);
      await this.insertUseCase.execute(etablissement);
      res.status(201).json({ message: 'Etablissement inséré' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'insertion' });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const etablissements = await this.getAllUseCase.execute();
      res.json(etablissements);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, address, phone, website, email, siret, siren } = req.body;
      const etablissement = new Etablissement(name, address, phone, website, email, siret, siren);
      await this.updateUseCase.execute(etablissement, id);
      res.status(201).json({ message: 'Etablissement mis à jour' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'insertion' });
    }
  }
}