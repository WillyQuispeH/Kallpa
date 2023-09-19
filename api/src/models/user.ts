import pool from "../utils/database";
import bcrypt from "bcrypt";

const create = async (
  person_id: string,
  password: string,
  photo: string,
  status: string
) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const resultDatabase = await pool.query(
      `INSERT INTO app."user"
        (hash, person_id, photo, status)
        VALUES( $1, $2 , $3, $4)RETURNING *; `,
      [hash, person_id, photo, status]
    );
    console.log(resultDatabase);
    return {
      success: true,
      data: resultDatabase || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const validate: any = async (person_id: string, password: string) => {
  try {
    const resultDatabase = await pool.query(
      `SELECT hash, photo, status FROM app."user" WHERE person_id = $1;`,
      [person_id]
    );
    if (resultDatabase.rowCount === 0) {
      return {
        success: true,
        data: { isMatch: false },
        error: null,
      };
    }
    const { hash, photo, status } = resultDatabase.rows[0];
    const isMatch = await bcrypt.compare(password, hash);

    return {
      success: true,
      data: { isMatch, photo, status },
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll = async () => {
  try {
    const resultDatabase = await pool.query(
      `select p.id ,
      p."name",
      p.paternallastname,
      p.dni, p.maternallastname,
      p.address,
      p.email,
      p.phone,
      u.id,
      u.photo,
      u.status  ,
      u.id as "userId"
      from app."user" u 
       inner join app.person p on u.person_id = p.id ;`
    );

    return {
      success: true,
      data: resultDatabase.rows,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (person_id: string) => {
  try {
    const resultDatabase = await pool.query(
      `SELECT id, hash, person_id
        FROM app."user" WHERE person_id = $1; `,
      [person_id]
    );

    return {
      success: true,
      data: resultDatabase.rows[0] || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const remove: any = async (person_id: string) => {
  try {
    const resultDatabase = await pool.query(
      `DELETE FROM app."user"
       WHERE  person_id = $1; `,
      [person_id]
    );

    return {
      success: true,
      data: resultDatabase.rows || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateState = async (userId: string, state: string) => {
  try {
    const resultDatabase = await pool.query(
      `UPDATE app."user"
      SET status=$2
      WHERE id= $1;`,
      [userId, state]
    );

    return {
      success: true,
      data: resultDatabase.rows[0] || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getById, validate, remove, getAll, updateState };
