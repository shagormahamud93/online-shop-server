import { db } from "../../../db/connection";

export const BrandService = {
  createBrandIntoDB: async (data: any) => {
    const { name } = data;

    const [result] = await db.query(
      "INSERT INTO brands (name) VALUES (?)",
      [name]
    );

    return { id: (result as any).insertId, name };
  },

  getAllBrandsFromDB: async () => {
    const [rows] = await db.query("SELECT * FROM brands");
    return rows;
  },

  getSingleBrandFromDB: async (id: string) => {
    const [rows] = await db.query("SELECT * FROM brands WHERE id = ?", [id]);
    return (rows as any[])[0];
  },

  updateBrandIntoDB: async (id: string, data: any) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    values.push(id);
    const sql = `UPDATE brands SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(sql, values);

    return { id, ...data };
  },

  deleteBrandFromDB: async (id: string) => {
    await db.query("DELETE FROM brands WHERE id = ?", [id]);
    return { id };
  },
};
