import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
type Fighter = {
  lastName: string;
  firstName: string;
  nationality: string;
  photo: string;
  category_id: number;
  wins: number;
  losses: number;
  nickname: string;
};
class fighterRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from fighter_view",
    );
    return rows;
  }

  async readByName(
    firstName: string,
    lastName: string,
  ): Promise<Fighter | null> {
    const [rows] = await databaseClient.query<(Fighter & RowDataPacket)[]>(
      `SELECT id, lastName, firstName, nationality, photo, category_id, wins, losses, nickname 
       FROM fighter 
       WHERE firstName = ? AND lastName = ?`,
      [firstName, lastName],
    );

    return rows.length > 0 ? rows[0] : null;
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
