import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
type User = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  hashedPassword: string;
  role: string;
  picture: string;
};

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstName, lastName, email, hashed_password, picture) values (?, ?, ?, ?, ?)",
      [
        user.firstName,
        user.lastName,
        user.email,
        user.hashedPassword,
        user.picture,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");
    return rows as User[];
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0];
  }

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "update user set  lastName = ?, firstName = ?,picture = ? where id = ?",
      [user.lastName, user.firstName, user.picture, user.id],
    );
    return result.affectedRows;
  }
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from user where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
