import pool from "../utils/database";

const create: any = async (person_id: string, investment_id: string) => {
  try {
    const result = await pool.query(
      `INSERT INTO app."personInvestment"
      ( person_id, investment_id)
      VALUES( $1, $2) RETURNING *;`,
      [person_id, investment_id]
    );
    return { success: true, data: result.rows[0] || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
