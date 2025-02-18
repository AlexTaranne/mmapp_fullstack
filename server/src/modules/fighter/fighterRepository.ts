import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";


class fighterRepository {
    async readAll() {
        const [rows] = await databaseClient.query<Rows>("select * from fighter");
        return rows;
    }

    async create(fighter) {
        const [result] = await databaseClient.query<Result>("insert into fighter (lastName, firstName, nationality, photo) values (?, ?, ?, ?)",
            [fighter.lastName, fighter.firstName, fighter.nationality, fighter.photo],);
            return result.insertId;
}}
export default new fighterRepository();