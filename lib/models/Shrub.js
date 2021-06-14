import pool from '../utils/pool';

export default class Shrub {
  id;
  name;
  size;
  climate;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.size = row.size;
    this.climate = row.climate;
  }

  static async insert({ name, size, climate }) {

    const { rows } = await pool.query(
      `INSERT INTO shrubs (name, size, climate)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, size, climate]
    );

    return new Shrub(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM shrubs WHERE id = $1',
      [id]
    );
    return new Shrub(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM shrubs',

    );
    return rows.map(row => new Shrub(row));
  }

  static async update(shrub, id) {
    const { rows } = await pool.query(
      `UPDATE shrubs 
      SET name = $1,
          size = $2,
          climate = $3
      WHERE id = $4
      REUTRNING *`,
      [shrub.name, shrub.size, shrub.climate, id]
    );
    return new Shrub(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM shrubs
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Shrub(rows[0]);
  }
}
