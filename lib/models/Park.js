import pool from '../utils/pool';

export default class Park {
  id;
  name;
  location;
  acreage;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
    this.acreage = row.acreage;
  }

  static async insert({ name, location, acreage }) {

    const { rows } = await pool.query(
      `INSERT INTO parks (name, location, acreage)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, location, acreage]
    );

    return new Park(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM parks WHERE id = $1',
      [id]
    );
    return new Park(rows[0]);
  }
}
