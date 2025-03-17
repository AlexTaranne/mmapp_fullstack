import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
type Fighter = {
  id: number;
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
      "insert into fighter (lastName, firstName, nationality, photo, wins, losses, nickname) values (?, ?, ?, ?, ?, ?, ?)",
      [
        fighter.lastName,
        fighter.firstName,
        fighter.nationality,
        fighter.photo,
        fighter.wins,
        fighter.losses,
        fighter.nickname,
      ],
    );
    return result.insertId;
  }

  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "delete from fighter where id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async update(fighter: Fighter): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE fighter SET lastname = ?, firstname = ?, nationality = ?, photo = ?, category_id = ?, wins = ?, losses = ?, nickname = ? WHERE id = ?",
      [
        fighter.lastName,
        fighter.firstName,
        fighter.nationality,
        fighter.photo,
        fighter.category_id,
        fighter.wins,
        fighter.losses,
        fighter.nickname,
        fighter.id,
      ],
    );
    return result.affectedRows;
  }
}
export default new fighterRepository();
