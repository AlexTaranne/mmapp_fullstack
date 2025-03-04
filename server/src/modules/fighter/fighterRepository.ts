import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
type Fighter = {
  lastName: string;
  firstName: string;
  nationality: string;
  photo: string;
};
class fighterRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from fighter_view",
    );
    return rows;
  }

  async create(fighter: Omit<Fighter, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into fighter (lastName, firstName, nationality, photo) values (?, ?, ?, ?)",
      [fighter.lastName, fighter.firstName, fighter.nationality, fighter.photo],
    );
    return result.insertId;
  }
}
export default new fighterRepository();
