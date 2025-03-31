import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
type Fight = {
  id: number;
  title: string;
  link: string;
  genre: string;
};
class fightRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from fights");
    return rows;
  }

  async create(fight: Omit<Fight, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into fights (title, link, genre) values (?, ?, ?)",
      [fight.title, fight.link, fight.genre],
    );
    return result.insertId;
  }

  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "delete from fights where id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async update(fight: Fight): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE fights SET title = ?, link = ?, genre = ? WHERE id = ?",
      [fight.title, fight.link, fight.genre, fight.id],
    );
    return result.affectedRows;
  }
}
export default new fightRepository();
