import { EtablissementRepository } from '../../domain/repositories/EtablissementRepository';
import { Etablissement } from '../../domain/entities/Etablissement';

export class UpdateEtablissementUseCase {
  constructor(private repo: EtablissementRepository) {}

  async execute(etablissement: Etablissement, id: string): Promise<void> {
    await this.repo.update(etablissement, id);
  }
}