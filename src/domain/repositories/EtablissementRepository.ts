import { Etablissement } from '../entities/Etablissement';

export interface EtablissementRepository {
  insert(etablissement: Etablissement): Promise<void>;
  getAll(): Promise<Etablissement[]>;
  update(etablissement: Etablissement, id: string): Promise<void>;
}