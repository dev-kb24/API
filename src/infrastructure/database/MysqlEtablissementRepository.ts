import { Sequelize, DataTypes, Model } from 'sequelize';
import { EtablissementRepository } from '../../domain/repositories/EtablissementRepository';
import { Etablissement } from '../../domain/entities/Etablissement';

class EtablissementModel extends Model {}

export class MysqlEtablissementRepository implements EtablissementRepository {
  private sequelize: Sequelize;
  private EtablissementModel: typeof EtablissementModel;

  constructor(config?: any) {
    this.sequelize = new Sequelize(
      config?.database || process.env.DB_NAME!,
      config?.user || process.env.DB_USER!,
      config?.password || process.env.DB_PASSWORD!,
      {
        host: config?.host || process.env.DB_SERVER!,
        port: config?.port || process.env.PORT,
        dialect: 'mysql',
        logging: true,
      }
    );

    this.EtablissementModel = EtablissementModel.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        website: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        siret: { type: DataTypes.STRING},
        siren: { type: DataTypes.STRING}
      },
      {
        sequelize: this.sequelize,
        tableName: 'etablissements',
        timestamps: false,
      }
    );
  }

  async initEstablishement() {
    await this.EtablissementModel.sync();
  }

  async insert(etablissement: Etablissement): Promise<void> {
    await this.EtablissementModel.create({
      name: etablissement.name,
      address: etablissement.address,
      phone: etablissement.phone,
      website: etablissement.website,
      email: etablissement.email || null,
      siret: etablissement.siret || null,
      siren: etablissement.siren || null
    });
  }

  async update(etablissement: Etablissement, id: string): Promise<void> {
    await this.EtablissementModel.update(etablissement, {where:{id}});
  }

  async getAll(): Promise<Etablissement[]> {
    const rows = await this.EtablissementModel.findAll();
    return rows.map(row =>
      new Etablissement(
        row.get('name') as string,
        row.get('address') as string,
        row.get('phone') as string,
        row.get('website') as string,
        row.get('email') as string,
        row.get('siret') as string,
        row.get('siret') as string
      )
    );
  }
}