import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export class EtablissementMiddleware{
    etablissementSchema = yup.object({
        nom: yup.string(),
        adresse: yup.string(),
        phone: yup.string(),
        website: yup.string(),
        email: yup.string(),
        siret: yup.string(),
        siren: yup.string()
    });

    validateEtablissement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.etablissementSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (err: any) {
            res.status(400).json({ errors: err.errors });
        }
    }
}