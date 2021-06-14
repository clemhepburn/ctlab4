import pool from '../utils/pool';

export default class Bag {
  id;
  name;
  size;
  material;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.size = row.size;
    this.material = row.material;
  }

  static async insert({ name, size, material }) {

    const { rows } = await pool.query(
      `INSERT INTO bags (name, size, material)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, size, material]
    );

    return new Bag(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM bags WHERE id = $1',
      [id]
    );
    return new Bag(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM bags',

    );
    return rows.map(row => new Bag(row));
  }

  static async update(bag, id) {
    const { rows } = await pool.query(
      `UPDATE bags 
      SET name = $1,
          size = $2,
          material = $3
      WHERE id = $4
      REUTRNING *`,
      [bag.name, bag.size, bag.material, id]
    );
    return new Bag(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM bags
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Bag(rows[0]);
  }
}
