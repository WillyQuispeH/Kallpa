import pool from "../utils/database";

const create: any = async (
  dni: string,
  name: string,
  paternallastname: string,
  maternallastname: string,
  address: string,
  email: string,
  phone: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.person 
      (dni, "name", "paternallastname", "maternallastname", address, email, phone)
      VALUES ($1, $2 ,$3 , $4, $5, $6, $7)
      ON CONFLICT (dni) DO UPDATE
        SET "name" = EXCLUDED."name",
          "paternallastname" = EXCLUDED."paternallastname",
          "maternallastname" = EXCLUDED."maternallastname",
          address = EXCLUDED.address,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone  RETURNING *;`,
      [dni, name, paternallastname, maternallastname, address, email, phone]
    );
    return { success: true, data: result.rows[0] || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByDni: any = async (dni: string) => {
  try {
    const result = await pool.query(
      `SELECT id, dni, "name", "paternallastname", "maternallastname", address, email, phone
      FROM app.person WHERE dni= $1;`,
      [dni]
    );
    return { success: true, data: result.rows[0] || null, error: false };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByEmail: any = async (email: string) => {
  try {
    const result = await pool.query(
      `SELECT id, dni, "name", "paternallastname", "maternallastname",address, email, phone
      FROM app.person WHERE email = $1; `,
      [email]
    );
    return {
      success: true,
      data: result.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (person_id: string) => {
  try {
    const result = await pool.query(
      `SELECT id, dni, "name", "paternallastname", "maternallastname",address, email, phone
      FROM app.person WHERE id = $1; `,
      [person_id]
    );
    return {
      success: true,
      data: result.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getByDni, getByEmail, getById };
