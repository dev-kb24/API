import { Etablissement } from '../entities/Etablissement';

export interface BatchScraper {
  scrape(keyword: string, city: string): Promise<Etablissement[]>;
}