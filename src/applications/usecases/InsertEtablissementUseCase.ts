import { EtablissementRepository } from '../../domain/repositories/EtablissementRepository';
import { Etablissement } from '../../domain/entities/Etablissement';

export class InsertEtablissementUseCase {
  constructor(private repo: EtablissementRepository) {}

  async execute(etablissement: Etablissement): Promise<void> {
    await this.repo.insert(etablissement);
  }
}