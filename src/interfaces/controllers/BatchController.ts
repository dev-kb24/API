import { Request, Response } from 'express';
import { RunBatchUseCase } from '../../applications/usecases/RunBatchUseCase';
import { InsertEtablissementUseCase } from '../../applications/usecases/InsertEtablissementUseCase';
import { Etablissement } from '../../domain/entities/Etablissement';

export class BatchController {
  constructor(private runBatchUseCase: RunBatchUseCase, private insertEtablissementUseCase: InsertEtablissementUseCase) {}

  run = async (req: Request, res: Response) => {
    const { keyword, city } = req.query;
    try {
      const etablissements: Etablissement[] = await this.runBatchUseCase.execute(String(keyword), String(city));
      for (let etablissement of etablissements){
        await this.insertEtablissementUseCase.execute(etablissement);
      }
      res.status(200).json({ message: 'Batch terminé avec succès' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erreur lors du batch' });
    }
  };
}