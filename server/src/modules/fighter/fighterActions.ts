import type { RequestHandler } from "express";
import fighterRepository from "./fighterRepository";
const browse: RequestHandler = async (req, res, next) => {
  try {
    const fighter = await fighterRepository.readAll();
    res.json(fighter);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.params;
    const fighter = await fighterRepository.readByName(firstName, lastName);

    if (!fighter) {
      res.sendStatus(404);
    } else {
      res.json(fighter);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const insertId = await fighterRepository.create(req.body);
    res
      .status(201)
      .json({ message: "Fighter ajouté avec succès", id: insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const fighterId = Number(req.params.id);
    await fighterRepository.delete(fighterId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const fighter = {
      id: Number(req.params.id),
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      nationality: req.body.nationality,
      photo: req.body.photo,
      category_name: req.body.category_name,
      category_id: req.body.category_id,
      wins: req.body.wins,
      losses: req.body.losses,
      nickname: req.body.nickname,
    };
    const affectedRows = await fighterRepository.update(fighter);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
export default { browse, add, read, destroy, edit };
