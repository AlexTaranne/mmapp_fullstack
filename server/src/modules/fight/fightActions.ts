import type { RequestHandler } from "express";
import fightRepository from "./fightRepository";
const browse: RequestHandler = async (req, res, next) => {
  try {
    const fight = await fightRepository.readAll();
    res.json(fight);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const fight = await fightRepository.readAll;

    if (!fight) {
      res.sendStatus(404);
    } else {
      res.json(fight);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const insertId = await fightRepository.create(req.body);
    res.status(201).json({ message: "Fight add with sucess", id: insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const fightId = Number(req.params.id);
    await fightRepository.delete(fightId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const fight = {
      id: Number(req.params.id),
      title: req.body.title,
      link: req.body.link,
      genre: req.body.genre,
    };
    const affectedRows = await fightRepository.update(fight);
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
