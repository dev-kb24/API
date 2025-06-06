"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etablissement = void 0;
class Etablissement {
    name;
    address;
    phone;
    website;
    email;
    siret;
    siren;
    constructor(name, address, phone, website, email, siret, siren) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.email = email;
        this.siret = siret;
        this.siren = siren;
    }
}
exports.Etablissement = Etablissement;
