import type { RequestHandler } from "express";
import fighterRepository from "./fighterRepository";
const browse: RequestHandler = async (req, res, next) => {
    try {
        const fighter = await fighterRepository.readAll();
        res.json(fighter);
    } catch (err) {
        next(err);
    }
}

const add: RequestHandler = async (req, res, next) => {
    try {
        console.log("Body reçu :", req.body); // Vérifier les données envoyées
        const insertId = await fighterRepository.create(req.body);
        res.status(201).json({ message: "Fighter ajouté avec succès", id: insertId });
    } catch (error) {
        next(error);
    }
};
export default {browse, add};