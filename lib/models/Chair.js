import pool from '../utils/pool';

export default class Chair {
  id;
  name;
  color;
  design;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.design = row.design;
  }

  static async insert({ name, color, design }) {

    const { rows } = await pool.query(
      `INSERT INTO chairs (name, color, design)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, color, design]
    );

    return new Chair(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM chairs WHERE id = $1',
      [id]
    );
    return new Chair(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM chairs',

    );
    return rows.map(row => new Chair(row));
  }

  static async update(chair, id) {
    const { rows } = await pool.query(
      `UPDATE chairs 
      SET name = $1,
          color = $2,
          design = $3
      WHERE id = $4
      REUTRNING *`,
      [chair.name, chair.color, chair.design, id]
    );
    return new Chair(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM chairs
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Chair(rows[0]);
  }
}
