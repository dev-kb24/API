import { BatchScraper } from '../../domain/services/BatchScraper';
import { EtablissementRepository } from '../../domain/repositories/EtablissementRepository';
import { Etablissement } from '../../domain/entities/Etablissement';

export class RunBatchUseCase {
  constructor(
    private scraper: BatchScraper,
    private repo: EtablissementRepository
  ) {}

  async execute(keyword: string, city: string): Promise<Etablissement[]> {
    return await this.scraper.scrape(keyword, city);
  }
}