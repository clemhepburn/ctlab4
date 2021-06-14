import pool from '../utils/pool';

export default class Tea {
  id;
  name;
  type;
  origin;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.origin = row.origin;
  }

  static async insert({ name, type, origin }) {

    const { rows } = await pool.query(
      `INSERT INTO teas (name, type, origin)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, type, origin]
    );

    return new Tea(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM teas WHERE id = $1',
      [id]
    );
    return new Tea(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM teas',

    );
    return rows.map(row => new Tea(row));
  }

  static async update(tea, id) {
    const { rows } = await pool.query(
      `UPDATE teas 
      SET name = $1,
          type = $2,
          origin = $3
      WHERE id = $4
      REUTRNING *`,
      [tea.name, tea.type, tea.origin, id]
    );
    return new Tea(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM teas
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Tea(rows[0]);
  }
}
