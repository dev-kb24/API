export class Etablissement {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public website: string,
    public email?: string,
    public siret?: string,
    public siren?: string,
  ) {}
}