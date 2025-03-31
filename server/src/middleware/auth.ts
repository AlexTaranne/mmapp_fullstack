import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../modules/user/useRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.readByEmailWithPassword(email);

    if (!user) {
      res.sendStatus(422);
    }

    const verified = await argon2.verify(user.hashed_password, password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        picture: user.picture,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", token);
      res.json({
        id: user.id,
        role: user.role,
        lastName: user.lastName,
        firstName: user.firstName,
        picture: user.picture,
      });
    }
  } catch (error) {
    next(error);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP_SECRET dans le .env");
  }
  try {
    const { auth } = req.cookies;
    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayLoad = jwt.verify(auth, process.env.APP_SECRET);
    if (typeof resultPayLoad !== "object") {
      throw new Error("Token invalide");
    }

    req.user = {
      id: resultPayLoad.id,
      email: resultPayLoad.email,
      role: resultPayLoad.role,
      picture: resultPayLoad.picture,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const checkIfAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.role === "administrateur") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const checkIfAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.role === "administrateur" || req.user.role === "utilisateur") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("auth").send("Disconnected");
  } catch (error) {
    next(error);
  }
};

export default {
  hashPassword,
  login,
  verify,
  checkIfAdmin,
  logout,
  checkIfAdminOrUser,
};
