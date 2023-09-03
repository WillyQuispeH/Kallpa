import pool from "../utils/database";

const create: any = async (
  amount: string,
  registrationdate: string,
  months: string,
  enddate: string,
  returnpercentage: string,
  interests: string,
  monthpay: string,
  retention: string,
  subtotal: string,
  total: string,
  state: string,
  proyect: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.investment
      ( amount, registrationdate, months, enddate, returnpercentage, interests, monthpay, retention, subtotal, total, state, proyect)
      VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)  RETURNING *;`,
      [
        amount,
        registrationdate,
        months,
        enddate,
        returnpercentage,
        interests,
        monthpay,
        retention,
        subtotal,
        total,
        state,
        proyect,
      ]
    );
    return { success: true, data: result.rows[0] || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};
const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT app.fn_get_all_investment()::jsonb AS "data";`
    );
    return { success: true, data: result.rows[0].data || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT app.get_by_id_investment($1)::jsonb AS "data";`,
      [id]
    );
    return { success: true, data: result.rows[0].data || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, getById };
