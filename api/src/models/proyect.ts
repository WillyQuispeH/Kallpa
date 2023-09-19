import pool from "../utils/database";

const create: any = async (name: string, code: string, date: string) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.proyect
      ( "name", code, "date")
      VALUES($1, $2, $3) RETURNING *;`,
      [name, code, date]
    );
    return { success: true, data: result.rows[0] || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT id, "name", code, "date" FROM app.proyect; `
    );
    return { success: true, data: result.rows || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const remove = async (id: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.proyect
      WHERE id=$1;`,
      [id]
    );
    return { success: true, data: result.rows || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const update = async (id: string, name: string, code: string, date: string) => {
  try {
    const result = await pool.query(
      `UPDATE app.proyect
      SET "name"=$2, code=$3, "date"=$4
      WHERE id=$1; `,
      [id, name, code, date]
    );
    return { success: true, data: result.rows || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, update, remove };
