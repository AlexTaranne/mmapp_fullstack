import axios from "axios";
import dotenv from "dotenv";
import type { RequestHandler } from "express";
import userRepository from "./useRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
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
    };
    const insertId = await userRepository.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
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

export default { browse, read, add, destroy, sendSuccessStatus };
