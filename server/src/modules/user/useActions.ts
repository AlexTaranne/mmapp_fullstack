import axios from "axios";
import dotenv from "dotenv";
import type { RequestHandler } from "express";

import useRepository from "./useRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await useRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await useRepository.read(userId);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number(req.params.id),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashedPassword: req.body.hashed_password,
      role: req.body.role,
      picture: req.body.picture,
    };
    const affectedRows = await useRepository.update(user);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashedPassword: req.body.hashed_password,
      role: req.body.role,
      picture: req.body.picture,
    };
    const insertId = await useRepository.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    await useRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const sendSuccessStatus: RequestHandler = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy, sendSuccessStatus };
