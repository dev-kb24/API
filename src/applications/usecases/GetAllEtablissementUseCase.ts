import { EtablissementRepository } from '../../domain/repositories/EtablissementRepository';
import { Etablissement } from '../../domain/entities/Etablissement';

export class GetAllEtablissementsUseCase {
  constructor(private repo: EtablissementRepository) {}

  async execute(): Promise<Etablissement[]> {
    return this.repo.getAll();
  }
}