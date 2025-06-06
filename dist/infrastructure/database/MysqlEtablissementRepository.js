"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlEtablissementRepository = void 0;
const sequelize_1 = require("sequelize");
const Etablissement_1 = require("../../domain/entities/Etablissement");
class EtablissementModel extends sequelize_1.Model {
}
class MysqlEtablissementRepository {
    sequelize;
    EtablissementModel;
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize(config?.database || process.env.DB_NAME, config?.user || process.env.DB_USER, config?.password || process.env.DB_PASSWORD, {
            host: config?.host || process.env.DB_SERVER,
            dialect: 'mysql',
            logging: true,
        });
        this.EtablissementModel = EtablissementModel.init({
            id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: sequelize_1.DataTypes.STRING },
            address: { type: sequelize_1.DataTypes.STRING },
            phone: { type: sequelize_1.DataTypes.STRING },
            website: { type: sequelize_1.DataTypes.STRING },
            email: { type: sequelize_1.DataTypes.STRING },
            siret: { type: sequelize_1.DataTypes.STRING },
            siren: { type: sequelize_1.DataTypes.STRING }
        }, {
            sequelize: this.sequelize,
            tableName: 'etablissements',
            timestamps: false,
        });
    }
    async initEstablishement() {
        await this.EtablissementModel.sync();
    }
    async insert(etablissement) {
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
    async update(etablissement, id) {
        await this.EtablissementModel.update(etablissement, { where: { id } });
    }
    async getAll() {
        const rows = await this.EtablissementModel.findAll();
        return rows.map(row => new Etablissement_1.Etablissement(row.get('name'), row.get('address'), row.get('phone'), row.get('website'), row.get('email'), row.get('siret'), row.get('siret')));
    }
}
exports.MysqlEtablissementRepository = MysqlEtablissementRepository;
